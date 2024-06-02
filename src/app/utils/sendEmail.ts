import { transporter } from "./nodemailer";
import { getRandomMessageFromCategory } from "./selectMessage";

export const sendEmail = async (contact: any) => {
    try {
        const randomMessage = await getRandomMessageFromCategory(contact.category);
        console.log(`Mensaje aleatorio seleccionado: ${randomMessage}`);
        const mailOptions = {
            from: process.env.GMAIL_APP_USERNAME,
            to: contact.email,
            subject: "Mensaje programado",
            text: randomMessage,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};
