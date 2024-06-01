import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { transporter } from "@/app/utils/nodemailer";
import schedule from 'node-schedule';

//funcion para devolver mensaje random
import { getRandomMessageFromCategory } from "@/app/utils/selectMessage";

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { uid, contact } = data;

    if (!uid || !contact || !contact.email || !contact.category || !contact.time) {
        return NextResponse.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
    }

    try {
        const docRef = doc(db, 'users', uid);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const contacts = userData.contacts || [];

            const contactExists = contacts.some((existingContact: { email: string; }) => existingContact.email === contact.email);

            if (contactExists) {
                return NextResponse.json({ success: false, message: 'El contacto ya existe' }, { status: 400 });
            }

            await updateDoc(docRef, {
                contacts: arrayUnion(contact)
            });


            // Función para enviar el correo electrónico
            const sendEmail = async () => {
                try {
                    const randomMessage = await getRandomMessageFromCategory(contact.category);
                    console.log(randomMessage)
                    const mailOptions = {
                        from: process.env.GMAIL_APP_USERNAME,
                        to: contact.email, // Usar el email del contacto
                        subject: "Mensaje programado",
                        text: randomMessage,
                    };

                    const info = await transporter.sendMail(mailOptions);
                    console.log("Message sent: %s", info.messageId);
                } catch (error) {
                    console.error("Error sending email: ", error);
                }
            };

            // Programar el envío del correo electrónico para 7 días consecutivos
            for (let i = 0; i < 7; i++) {
                const [hours, minutes] = contact.time.split(':').map(Number);
                const date = new Date();
                date.setHours(hours, minutes, 0, 0);
                date.setDate(date.getDate() + i); // Incrementar la fecha para cada día

                schedule.scheduleJob(date, sendEmail);
            }

            return NextResponse.json({ success: true, message: 'Contacto agregado exitosamente, "Emails scheduled successfully"' });
        } else {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error al agregar contacto' });
    }
};
