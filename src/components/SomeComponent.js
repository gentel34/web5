import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../data/events';

function SomeComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  // ...рендеринг подій...
}
