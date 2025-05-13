
export type Activity = 'volleyball' | 'dance' | 'karate';

export interface Trainer {
  id: string;
  name: string;
  phone: string;
  activity: Activity;
  photo: string;
  bio: string;
}

export interface Class {
  id: string;
  activityType: Activity;
  title: string;
  description: string;
  trainer: Trainer;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  isChanged: boolean; // For notification feature
}

export interface Review {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AttendanceRecord {
  activityType: Activity;
  count: number;
  dates: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledClasses: string[];
  attendanceRecords: Record<string, AttendanceRecord>;
}
