import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/app/utils/firebase';

//funcionaaa paaa
export const POST = async (req: NextRequest, res: NextResponse) => {
    const menssage = await req.json();
    try {
        // Aquí puedes usar Firestore, por ejemplo:
        const setMenssage = await addDoc(
            collection(db, 'menssages'), menssage
        )
        return new Response(`'Documento añadido', id: ${setMenssage.id}`, { status: 200 });
    } catch (error) {
        console.error("Error adding document: ", error);
        return new Response('Error al añadir el documento', { status: 500 });
    }
}

