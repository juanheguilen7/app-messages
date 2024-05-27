import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/utils/firebase';

//funcionaaa paaa
export const POST = async (req: NextRequest, res: NextResponse) => {
    const dataUser = await req.json();
    try {
        // Aquí puedes usar Firestore, por ejemplo:
        const setUser = await addDoc(
            collection(db, 'users'), dataUser
        )
        return new Response(`'User añadido', id: ${setUser.id}`, { status: 200 });
    } catch (error) {
        console.error("Error adding document: ", error);
        return new Response('Error al añadir el usuario', { status: 500 });
    }
}

