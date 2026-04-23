import React from 'react';
import { ScheduleEvent, DAYS_OF_WEEK } from '../types';
import EventCard from './EventCard';

interface Props {
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
  onSlotClick: (day: string, hour: number) => void;
}

const START_HOUR = 8; // 8 AM
const END_HOUR = 20;  // 8 PM
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

const TimetableGrid: React.FC<Props> = ({ events, onEventClick, onSlotClick }) => {
  
  // Helper to calculate position and height for absolute layout inside a column
  const getEventStyle = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const startMinutesInDay = (startH - START_HOUR) * 60 + startM;
    const durationMinutes = (endH - startH) * 60 + (endM - startM);
    
    // Each minute is 1px for example (so 1 hour = 60px height)
    // We'll calculate percentages based on hours total
    const totalMinutes = (END_HOUR - START_HOUR) * 60;
    
    return {
      top: `${(startMinutesInDay / totalMinutes) * 100}%`,
      height: `${(durationMinutes / totalMinutes) * 100}%`,
      left: '4px',
      right: '4px',
      position: 'absolute' as const,
      zIndex: 10
    };
  };

  return (
    <div className="timetable-container glass-panel">
      {/* Header Row (Days) */}
      <div className="timetable-header">
        <div className="time-axis-header">GMT+10</div>
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
      </div>

      {/* Grid Content */}
      <div className="timetable-body">
        {/* Time Axis Column */}
        <div className="time-axis">
          {HOURS.map(hour => (
            <div key={`time-${hour}`} className="time-slot-label">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {DAYS_OF_WEEK.map(day => (
          <div key={`col-${day}`} className="day-column">
            {/* Background Grid Lines & Clickable Slots */}
            {HOURS.map(hour => (
              <div 
                key={`slot-${day}-${hour}`} 
                className="hour-cell"
                onClick={() => onSlotClick(day, hour)}
              />
            ))}
            
            {/* Render Events for this day */}
            {events.filter(e => e.day === day).map(event => (
              <div 
                key={event.id} 
                style={getEventStyle(event.startTime, event.endTime)}
              >
                <EventCard event={event} onClick={() => onEventClick(event)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableGrid;
