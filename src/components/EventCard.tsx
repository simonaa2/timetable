import React from 'react';
import type { ScheduleEvent } from '../types';

interface Props {
  event: ScheduleEvent;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  'indigo': 'linear-gradient(135deg, #6366f1, #4f46e5)',
  'purple': 'linear-gradient(135deg, #a855f7, #9333ea)',
  'pink': 'linear-gradient(135deg, #ec4899, #db2777)',
  'emerald': 'linear-gradient(135deg, #10b981, #059669)',
  'cyan': 'linear-gradient(135deg, #06b6d4, #0891b2)',
  'amber': 'linear-gradient(135deg, #f59e0b, #d97706)',
};

const EventCard: React.FC<Props> = ({ event, onClick }) => {
  const bgStyle = colorMap[event.color] || colorMap['indigo'];
  
  return (
    <div 
      className="event-card glass-card"
      style={{ background: bgStyle }}
      onClick={onClick}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-time">{event.startTime} - {event.endTime}</div>
      {event.location && <div className="event-location">📍 {event.location}</div>}
    </div>
  );
};

export default EventCard;
