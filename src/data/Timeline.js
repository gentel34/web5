import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export async function fetchTimeline() {
  const snapshot = await getDocs(collection(db, 'timeline'));
  return snapshot.docs.map(doc => doc.data());
}

