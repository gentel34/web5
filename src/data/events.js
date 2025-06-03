import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export async function fetchEvents() {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map(doc => doc.data());
}

// Додаємо default export для сумісності:
export default fetchEvents;