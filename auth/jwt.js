const jwt = require('jsonwebtoken');
const { loggerConsole, loggerError } = require('../libs/loggerWinston');
const config = require('../cfg/config');

const getJwtToken = (username, userId) => {
    try {
        const token = jwt.sign({
            userName: username,
            id: userId,
            },
                `${config.SECRET}`,
            {
                expiresIn: config.EXPIRES_IN
            });
        return token
        
    } catch (error) {
        loggerError.log('error', "Error al obtener el token de jwt: ", e.message);
        loggerConsole.log('debug', "Error al listar en productos: ", e)
        return ({error: error.message});
    }
}   

const authMiddleware = async (req, res, next) =>{
    //auth by header
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({error: 'not authenticated, there is no jwt'});
    }
    //obtain token and verify
    const token = authHeader.split(' ')[1];

    console.log(token)
    
    try {
        jwt.verify(token, config.SECRET, (err, decoded)=>{
            if (err) {
                return res.json({mensaje: "Token inválida, " + err.message})
            } else {
                req.decoded = decoded;
                next();
            }
        })

    } catch (error) {
        res.status(error.status || 500).json({error: error.name, message: error.message});
    }
}

module.exports = {getJwtToken, authMiddleware}