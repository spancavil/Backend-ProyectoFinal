const config = require('../cfg/config');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Users = require('../models/Users');
const bCrypt = require('bcrypt')
const {loggerConsole, loggerError, loggerWarn} = require ('../libs/loggerWinston')

const FacebookStrategy = require('passport-facebook').Strategy;

// Ingresamos credenciales por consola o usamos nuestras credenciales por defecto del archivo .env
const FACEBOOK_CLIENT_ID = config.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = config.FACEBOOK_CLIENT_SECRET;

// Facebook strategy para login
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/login-facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
    }, function (accessToken, refreshToken, profile, done) {
    // console.log(profile);
    let userProfile = profile;
    return done(null, userProfile);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});
  
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//LocalStrategy con usuario y contraseña
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req,username, password, done) {
        Users.findOne({'username': username}, 
            function (err, user) {
                loggerConsole.log("debug", "enter the Login!")
                if (err) return done(err);
                if (!user) {
                    loggerWarn.log('warn', 'User not found with that username: ', username);
                    return done(null, false,
                        loggerConsole.log('message', 'Invalid username/password.')
                        )
                }
                if (!isValidPassword(user, password)){
                    loggerWarn.log('warn', 'Invalid password');
                    return done (null, false, 
                            loggerConsole.log('message', 'Invalid username/password.')
                        )
                }
                return done(null, user);
            }
        )
    }
))

//Creación de usuario
passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    function (req, username, password, done) {
        findOrCreateUser = function () {
            Users.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    loggerWarn.log('warn', 'Error in SignUp: ', err);
                    return done(err);
                }
                if (user) {
                    loggerConsole.log('debug', 'User already exists at signup');
                    return done(null, false, loggerConsole.log('message', 'User Already Exists'));
                }
                loggerConsole.log('debug', "Pasó las pruebas!")
                var newUser = new Users();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.fullName = req.body.fullName;
                newUser.lastName = req.body.lastName;
                newUser.email = req.body.email;
                newUser.telefono = req.body.telefono;

                //este es el path que me devuelve multer a través de file
                newUser.foto = req.file.path.substr(6);

                newUser.save((err) => {
                    if (err) {
                        loggerConsole.log('debug', 'Error saving new user: ', err);
                        loggerError.log('error', "Error saving new user");
                        throw new Error;
                    }
                    loggerConsole.log('debug', 'User registered sucessfully!');
                    return done(null, newUser);
                })
            })
        }
        process.nextTick(findOrCreateUser);
    }
));

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});


module.exports = passport;