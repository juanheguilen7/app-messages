import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { uid, contact } = data; // Asegúrate de que el JSON contiene uid y contact
    try {
        const docRef = doc(db, 'users', uid);

        // Verifica si el documento del usuario existe
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Agrega el contacto al campo 'contacts' del usuario
            await updateDoc(docRef, {
                contacts: arrayUnion(contact)
            });
            return NextResponse.json({ success: true, message: 'Contacto agregado exitosamente' });
        } else {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error al agregar contacto' });
    }
};
