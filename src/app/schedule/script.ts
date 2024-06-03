import { db } from '@/app/utils/firebase';
import { getDocs, collection } from 'firebase/firestore';
import schedule from 'node-schedule';
import { DateTime } from 'luxon';
import { scheduleEmail } from '@/app/utils/programSendEmail';

const scheduleEmailsForNextWeek = async () => {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const uid = userDoc.id;

            (userData.contacts || []).forEach((contact: { timezone: string; time: string; category: string; email: string }) => {
                const userTimezone = contact.timezone;
                const now = DateTime.now().setZone(userTimezone);

                for (let i = 0; i < 7; i++) {
                    const scheduleTime = now.plus({ days: i }).set({
                        hour: parseInt(contact.time.split(':')[0]),
                        minute: parseInt(contact.time.split(':')[1])
                    });

                    schedule.scheduleJob(scheduleTime.toJSDate(), async function () {
                        scheduleEmail(uid, contact);
                    });
                }
            });
        });

        console.log('Scheduled emails for the next week.');
    } catch (error) {
        console.error('Error scheduling emails:', error);
    }
};

scheduleEmailsForNextWeek();
