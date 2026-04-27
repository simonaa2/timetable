import React, { useState, useEffect } from 'react';
import { type ScheduleEvent, DAYS_OF_WEEK } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: ScheduleEvent) => void;
  onDelete?: (eventId: string) => void;
  initialData?: Partial<ScheduleEvent> | null;
}

const COLORS = ['indigo', 'purple', 'pink', 'emerald', 'cyan', 'amber'];

const ScheduleModal: React.FC<Props> = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState<Partial<ScheduleEvent>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        color: 'indigo'
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startTime || !formData.endTime) return;
    
    // Add fake ID if new
    const id = formData.id || Math.random().toString(36).substr(2, 9);
    onSave({ ...formData, id } as ScheduleEvent);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>{initialData?.id ? 'Edit Event' : 'New Event'}</h2>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label>Title</label>
            <input 
              name="title" 
              className="input-field" 
              value={formData.title || ''} 
              onChange={handleChange}
              placeholder="e.g. Physics 101"
              required 
            />
          </div>

          <div className="form-group two-col">
            <div>
              <label>Day</label>
              <select name="day" className="input-field" value={formData.day} onChange={handleChange}>
                {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label>Location</label>
              <input 
                name="location" 
                className="input-field" 
                value={formData.location || ''} 
                onChange={handleChange}
                placeholder="Room 402"
              />
            </div>
          </div>

          <div className="form-group two-col">
            <div>
              <label>Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                className="input-field" 
                value={formData.startTime || ''} 
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label>End Time</label>
              <input 
                type="time" 
                name="endTime" 
                className="input-field" 
                value={formData.endTime || ''} 
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <div 
                  key={c}
                  className={`color-swatch ${c} ${formData.color === c ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, color: c })}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            {initialData?.id && onDelete && (
              <button type="button" className="btn-danger" onClick={() => onDelete(initialData.id!)}>Delete</button>
            )}
            <div className="spacer" />
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
