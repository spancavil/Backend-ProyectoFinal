const nodemailer = require('nodemailer');
const config = require('../cfg/config');
const { loggerError, loggerConsole } = require('./loggerWinston');

function sendMailGmailwithOptions(mailOptions) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.USERGMAIL,
            pass: config.PASSGMAIL
        }
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.log("error", err)
            return err
        }
        loggerConsole.log("debug", info)
    });
}

/**
 * 
 * @param buyer El que realiza la compra
 * @param textoCompra El texto incluido en la compra 
 * @param phone El teléfono del comprador (en caso de existir) 
 * @param email El email del comprador. 
 */
function sendGmailOrder(buyer, textoCompra, phone, email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.USERGMAIL,
            pass: config.PASSGMAIL
        }
    });

    const mailOptions = {
        from: 'The backend burger',
        to: config.ADMINEMAIL,
        subject: `Nuevo pedido entrante!`,
        html: `<h4 style="color: blue;">Nuevo pedido del username: ${buyer}, email: ${email}, teléfono: ${phone}.<br>
        ${textoCompra} <br>
        Fecha: ${new Date().toLocaleString()}</h4>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.log("error", err)
            return err
        }
        loggerConsole.log("debug", info)
    });

}

module.exports = {sendMailGmailwithOptions, sendGmailOrder};
