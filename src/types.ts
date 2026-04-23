export interface ScheduleEvent {
  id: string;
  title: string;
  day: string;
  startTime: string; // Format: "HH:mm" e.g., "09:00"
  endTime: string;   // Format: "HH:mm" e.g., "10:30"
  color: string;     // Theme color identifier
  location?: string;
  description?: string;
}

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
