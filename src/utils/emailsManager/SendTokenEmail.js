import { transporter } from "./emailConnection.js";
export const SendTokenEmail = async (email, nombre, codigo) => {

    const info = await transporter.sendMail({
      from: '"Restablecimiento de contraseña ICFES Simulacros App" <senalearns@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `Hola ${nombre} ✔`, // Subject line
      text: "correo enviado desde ICFES Simulacros App", // plain text body
      html: `<div class="container-sm ">
      
      <p>
        <strong> Por favor verifica tu correo electrónico:</strong>
        Para completar el proceso de restablecimiento de contraseña, necesitamos verificar tu identidad. Por favor, sigue estos pasos:
      </p>
  
      <ul>
        <li>Ingresa el siguiente código:${codigo} </li>
        <li>Haz clic en "Verificar" o "Confirmar" para completar el proceso de verificación</li>
      </ul>
  
      <p>Una vez que hayas verificado tu dirección de correo electrónico, podras acceder con tu nueva contraseña</p>
  
        Atentamente,
        
        El Equipo de ICFES Simulacros App</p>
    </div>`, // html body
    });

    return info.response

}