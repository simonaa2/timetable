import { useState } from 'react';
import './App.css';
import { ScheduleEvent } from './types';
import TimetableGrid from './components/TimetableGrid';
import ScheduleModal from './components/ScheduleModal';

function App() {
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Advanced Mathematics',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      color: 'indigo',
      location: 'Room 304'
    },
    {
      id: '2',
      title: 'Computer Science',
      day: 'Wednesday',
      startTime: '13:00',
      endTime: '15:00',
      color: 'emerald',
      location: 'Lab 1'
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
    <div className="app-container">
      <header className="header-section">
        <div>
          <h1 className="gradient-text">Weekly Scheduler</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organize your activities with a premium timetable module.</p>
        </div>
        <button className="btn-primary" onClick={handleOpenNewEvent}>
          + New Event
        </button>
      </header>

      <main>
        <TimetableGrid 
          events={events} 
          onEventClick={handleEventClick}
          onSlotClick={handleSlotClick}
        />
      </main>

      <ScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        initialData={selectedEvent}
      />
    </div>
  );
}

export default App;
