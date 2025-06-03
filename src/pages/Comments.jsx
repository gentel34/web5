import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import CommentForm from '../components/CommentForm';
import './Comments.css';

function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Завантаження коментарів з Firestore
  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);
        const snapshot = await getDocs(collection(db, 'comments'));
        const data = snapshot.docs.map(doc => {
          const comment = { id: doc.id, ...doc.data() };
          // Перетворення Firestore Timestamp у рядок
          if (comment.date && typeof comment.date === 'object' && comment.date.seconds) {
            const d = new Date(comment.date.seconds * 1000);
            comment.date = d.toISOString().split('T')[0];
          }
          return comment;
        });
        // Сортуємо за датою (нові зверху)
        data.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        setComments(data);
      } catch (err) {
        setError('Не вдалося завантажити коментарі');
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  // Додавання нового коментаря у Firestore
  const addComment = async (newComment) => {
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        name: newComment.name,
        text: newComment.text,
        date: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      });
      setComments(prev => [
        ...prev,
        {
          id: docRef.id,
          name: newComment.name,
          text: newComment.text,
          date: new Date().toISOString().split('T')[0]
        }
      ]);
    } catch (err) {
      setError('Не вдалося додати коментар');
    }
  };

  if (loading) {
    return <div className="loading-container"><p>Завантаження коментарів...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  return (
    <div className="comments-page">
      <h1>Відгуки користувачів</h1>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
            <small>{comment.date}</small>
          </div>
        ))}
      </div>
      <CommentForm onSubmit={addComment} />
    </div>
  );
}

export default Comments;