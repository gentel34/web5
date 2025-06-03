import { useState, useEffect } from 'react';
import TimelineItem from '../components/TimelineItem';
import TimelineFilter from '../components/TimelineFilter';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import './Timeline.css';

function Timeline() {
  const [filter, setFilter] = useState('all');
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        setLoading(true);
        setError(null);
        const snapshot = await getDocs(collection(db, 'Timeline')); // <-- велика літера!
        const data = snapshot.docs.map(doc => doc.data());
        console.log('Timeline data:', data); // Додайте для дебагу
        setTimelineEvents(data);
      } catch (err) {
        setError('Не вдалося завантажити хронологію');
      } finally {
        setLoading(false);
      }
    }
    fetchTimeline();
  }, []);

  const filteredEvents = timelineEvents.filter(event => {
    if (filter === 'all') return true;
    return event.period === filter;
  });

  if (loading) {
    return <div className="loading-container"><p>Завантаження хронології...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  return (
    <div className="timeline-page">
      <h1>Хронологія історичних подій</h1>
      <TimelineFilter currentFilter={filter} onFilterChange={setFilter} />
      
      <div className="timeline-container">
        <div className="timeline-scroll">
          {filteredEvents.map(event => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;