import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/app/utils/nodemailer";
import schedule from 'node-schedule'


export const POST = async (req: NextRequest, res: NextResponse) => {
    const scheduleTime = 22;
    try {
        const mailOptions = {
            from: process.env.GMAIL_APP_USERNAME,
            to: "juanheguilen@hotmail.com    ", // The person you want your email to be sent
            subject: "que onda paa",
            text: "dale que va si esto funciona",
            // You can also add in HTML if you dont want plain text
        };


        // Programar el envío del correo
        const job = schedule.scheduleJob(scheduleTime, async function () {
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
            } catch (error) {
                console.error("Error sending email: ", error);
            }
        });

        return NextResponse.json({ message: "Email scheduled successfully" });
    } catch (error) {
        console.error("Error sending email: ", error);
        return NextResponse.json({ error: "Error sending email" }, { status: 500 });
    }
};