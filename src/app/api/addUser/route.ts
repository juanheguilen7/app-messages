import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";
import { transporter } from "@/app/utils/nodemailer";
import schedule from 'node-schedule';

// Función para seleccionar un mensaje aleatorio de una categoría
const getRandomMessageFromCategory = async (category: string) => {
    if (!category) {
        throw new Error("La categoría es indefinida");
    }
    console.log(`Buscando mensajes en la categoría: ${category}`);
    const q = query(collection(db, "menssages"), where("category", "==", `${category}`));

    const querySnapshot = await getDocs(q);
    const messages: any = [];

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        messages.push(doc.data().menssage);
    });

    if (messages.length === 0) {
        throw new Error("No hay mensajes disponibles en esta categoría");
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    console.log(`Mensaje seleccionado: ${messages[randomIndex]}`);

    return messages[randomIndex];
};



export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { uid, contact } = data; // Asegúrate de que el JSON contiene uid y contact

    if (!uid || !contact || !contact.email || !contact.category || !contact.time) {
        return NextResponse.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
    }

    try {
        const docRef = doc(db, 'users', uid);

        // Verifica si el documento del usuario existe
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Agrega el contacto al campo 'contacts' del usuario
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
