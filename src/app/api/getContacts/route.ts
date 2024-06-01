import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export const POST = async (req: NextRequest) => {
    try {
        const { uid } = await req.json();
        if (!uid) {
            return NextResponse.json({ success: false, message: 'UID no proporcionado' }, { status: 400 });
        }

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' }, { status: 404 });
        }

        const userData = docSnap.data();
        const contacts = userData.contacts || [];

        return NextResponse.json({ success: true, contacts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error al obtener los contactos' }, { status: 500 });
    }
};
