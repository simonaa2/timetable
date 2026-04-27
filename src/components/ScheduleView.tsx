import React, { useState } from 'react';
import { ScheduleEvent } from '../types';
import TimetableGrid from './TimetableGrid';
import ScheduleModal from './ScheduleModal';
import { useAuth } from '../context/AuthContext';

const ScheduleView: React.FC = () => {
  const { userData } = useAuth();
  
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Advanced Mathematics',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      color: 'indigo',
      location: 'Room 304'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<ScheduleEvent> | null>(null);

  const handleOpenNewEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSlotClick = (day: string, hour: number) => {
    const formattedHour = hour.toString().padStart(2, '0');
    const endHour = (hour + 1).toString().padStart(2, '0');
    
    setSelectedEvent({
      day,
      startTime: `${formattedHour}:00`,
      endTime: `${endHour}:00`,
      color: 'indigo'
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (savedEvent: ScheduleEvent) => {
    setEvents(prev => {
      const exists = prev.find(e => e.id === savedEvent.id);
      if (exists) {
        return prev.map(e => e.id === savedEvent.id ? savedEvent : e);
      }
      return [...prev, savedEvent];
    });
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setIsModalOpen(false);
  };

  return (
    <div className="view-container">
      <div className="header-section" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="gradient-text">Master Schedule</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and arrange all classes.</p>
        </div>
        {userData?.role === 'manager' && (
          <button className="btn-primary" onClick={handleOpenNewEvent}>
            + New Event
          </button>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '0', minHeight: '600px' }}>
        <TimetableGrid 
          events={events} 
          onEventClick={handleEventClick}
          onSlotClick={handleSlotClick}
        />
      </div>

      <ScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        initialData={selectedEvent}
      />
    </div>
  );
};

export default ScheduleView;
