import schedule from 'node-schedule';
import { DateTime } from 'luxon';
import { sendEmail } from "./sendEmail";
import { db } from "@/app/utils/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const updateEmailStatus = async (uid: any, contact: any, date: any, status: string) => {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
        emailStatus: arrayUnion({
            email: contact.email,
            date,
            status
        })
    });
};

export const scheduleEmail = (uid: string, contact: { timezone: any; time: string; }) => {
    const userTimezone = contact.timezone;
    const baseTime = DateTime.fromFormat(contact.time, 'HH:mm', { zone: userTimezone });

    for (let i = 0; i < 7; i++) {
        const scheduleTime = baseTime.plus({ days: i });

        // Convertir la hora programada a la hora local del servidor para node-schedule
        const localTime = scheduleTime.setZone('local');

        // Programar la tarea diaria
        schedule.scheduleJob(localTime.toJSDate(), async function () {
            try {
                await sendEmail(contact);
                await updateEmailStatus(uid, contact, scheduleTime.toISODate(), 'sent');
            } catch (error) {
                await updateEmailStatus(uid, contact, scheduleTime.toISODate(), 'failed');
            }
        });
    }
};
