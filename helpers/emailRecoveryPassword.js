import nodemailer from 'nodemailer';

const emailRecoveryPassword = async (datos) => {

  const { name, email, token } = datos;
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER, // generated ethereal user
      pass: EMAIL_PASS, // generated ethereal password
    },
  });

  try {

    var info = await transporter.sendMail({
      from: "App Administrador de Veterinarias",
      to: email,
      subject: "Restablece tu contraseña",
      text: "Restablece tu contraseña",
      html: `<p>Hola ${name}, has solicitado restrablecer tu contraseña  
      sigue el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${process.env.FRONTEND_URL}/resetpassword/${token}" >Cambiar contraseña</a>`

    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log('ERROR_REGISTER', error);
  }

}

export default emailRecoveryPassword;