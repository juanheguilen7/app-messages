import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Función para seleccionar un mensaje aleatorio de una categoría
export const getRandomMessageFromCategory = async (category: string) => {
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