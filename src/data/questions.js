import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export async function fetchQuestions() {
  const snapshot = await getDocs(collection(db, 'questions'));
  return snapshot.docs.map(doc => doc.data());
}