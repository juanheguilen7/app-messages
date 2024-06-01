import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { transporter } from "@/app/utils/nodemailer";
import schedule from 'node-schedule';
import { getRandomMessageFromCategory } from "@/app/utils/selectMessage";
import { DateTime } from 'luxon';

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { uid, contact } = data;

    if (!uid || !contact || !contact.email || !contact.category || !contact.time || !contact.timezone) {
        return NextResponse.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
    }

    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const contacts = userData.contacts || [];
            const contactExists = contacts.some((existingContact: { email: any; }) => existingContact.email === contact.email);

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

            // Utiliza la zona horaria recibida del formulario
            const timeZone = contact.timezone;

            // Programar el envío del correo electrónico para 7 días consecutivos
            for (let i = 0; i < 7; i++) {
                const [hours, minutes] = contact.time.split(':').map(Number);
                const date = DateTime.now().setZone(timeZone).set({ hour: hours, minute: minutes, second: 0, millisecond: 0 }).plus({ days: i });

                schedule.scheduleJob(date.toJSDate(), sendEmail);
                console.log(`Email programado para: ${date.toISO()} en la zona horaria: ${timeZone}`);
            }

            return NextResponse.json({ success: true, message: 'Contacto agregado exitosamente, "Emails scheduled successfully"' });
        } else {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error al agregar contacto: ", error);
        return NextResponse.json({ success: false, message: 'Error al agregar contacto' });
    }
};
