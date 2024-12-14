import nodemailer from "nodemailer";
import { emailTamplet } from "./emailTamplet";
export async function sendVirfiyEmail(option:any) {
    const transporter = nodemailer.createTransport({ 
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "mohameddahy111@gmail.com",
        pass: "zqnltzguakncgejo",
      },
    });
  
    const info = await transporter.sendMail({
      from: '"Complete System" <mohameddahy111@gmail.com>', // sender address
      to:option.email, // list of receivers
      subject: "Verify yor email", // Subject line
      // text: "Hello world?", // plain text body
      html: emailTamplet(option.url) // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
  }