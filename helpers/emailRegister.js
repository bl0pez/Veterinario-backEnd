import nodemailer from 'nodemailer';

const emailRegister = async (datos) => {

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
      subject: "Compruébate tu cuenta en APV",
      text: `Hello ✔`,
      html: `<p>Hola ${name}</p> Comprueba tu cuenta en APV: <a href="${process.env.FRONTEND_URL}/confirmEmail/${token}" >Verificar Email</a>`

    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log('ERROR_REGISTER', error);
  }

}

export default emailRegister;