import { addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/utils/firebase';
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
    try {
        const dataUser = await req.json();

        if (dataUser && dataUser.user) {
            const newUser = {
                uid: dataUser.user.uid,
                email: dataUser.user.email,
                name: dataUser.user.displayName,
                image: dataUser.user.photoURL
            };

            const docRef = doc(db, 'users', newUser.uid);
            const userExist = await getDoc(docRef);

            const token = dataUser.user.stsTokenManager.accessToken;
            
            const responseCookies = cookies();

            if (userExist.exists()) {
                responseCookies.set('authToken', token, { httpOnly: true, secure: true, path: '/' });
                return new NextResponse('El usuario ya existe, sesión iniciada', { status: 200 });
            } else {
                await setDoc(docRef, newUser);
                responseCookies.set('authToken', token, { httpOnly: true, secure: true, path: '/' });
                return new NextResponse('Usuario creado, y sesión iniciada', { status: 200 });
            }
        } else {
            return new NextResponse('User data missing', { status: 400 });
        }
    } catch (error) {
        console.error("Error adding document: ", error);
        return new NextResponse('Error al añadir el usuario, credenciales de Google incorrectas', { status: 500 });
    }
};
