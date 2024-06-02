import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { scheduleEmail } from "@/app/utils/programSendEmail";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { uid, contact } = data;

        if (!uid || !contact || !contact.email || !contact.category || !contact.time || !contact.timezone) {
            return NextResponse.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
        }

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' }, { status: 404 });
        }

        const userData = docSnap.data();
        const contacts = userData.contacts || [];
        const contactExists = contacts.some((existingContact: { email: any; }) => existingContact.email === contact.email);

        if (contactExists) {
            return NextResponse.json({ success: false, message: 'El contacto ya existe' }, { status: 400 });
        }

        await updateDoc(docRef, {
            contacts: arrayUnion(contact)
        });

        // Programar el envío automático de correos electrónicos
        scheduleEmail(uid, contact);

        return NextResponse.json({ success: true, message: 'Contacto agregado exitosamente y correos programados' });
    } catch (error) {
        console.error("Error al agregar contacto: ", error);
        return NextResponse.json({ success: false, message: 'Error al agregar contacto' });
    }
};
