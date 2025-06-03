import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export async function fetchComments() {
  const snapshot = await getDocs(collection(db, 'comments'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}