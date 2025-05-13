
import { Trainer, Class, Review, User } from './types';

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Алексей Смирнов',
    phone: '+7 (999) 123-45-67',
    activity: 'volleyball',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
    bio: 'Профессиональный тренер по волейболу с 10-летним опытом. Мастер спорта России.'
  },
  {
    id: '2',
    name: 'Екатерина Иванова',
    phone: '+7 (999) 234-56-78',
    activity: 'dance',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    bio: 'Хореограф с международным опытом, преподаватель современных танцев.'
  },
  {
    id: '3',
    name: 'Владимир Петров',
    phone: '+7 (999) 345-67-89',
    activity: 'karate',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop',
    bio: 'Чёрный пояс 5-дан по карате, победитель международных соревнований.'
  }
];

export const classes: Class[] = [
  {
    id: '101',
    activityType: 'volleyball',
    title: 'Волейбол для начинающих',
    description: 'Основы игры в волейбол, отработка базовых навыков подачи и приёма мяча.',
    trainer: trainers[0],
    location: 'Спортивный зал №1',
    startTime: '15:00',
    endTime: '16:30',
    date: '2025-05-15',
    maxParticipants: 12,
    currentParticipants: 8,
    isChanged: false
  },
  {
    id: '102',
    activityType: 'volleyball',
    title: 'Продвинутый волейбол',
    description: 'Тренировка для тех, кто уже знаком с основами волейбола и хочет улучшить свои навыки.',
    trainer: trainers[0],
    location: 'Спортивный зал №1',
    startTime: '17:00',
    endTime: '18:30',
    date: '2025-05-16',
    maxParticipants: 12,
    currentParticipants: 10,
    isChanged: true
  },
  {
    id: '201',
    activityType: 'dance',
    title: 'Современные танцы',
    description: 'Занятие по современной хореографии для начинающих.',
    trainer: trainers[1],
    location: 'Танцевальный класс',
    startTime: '16:00',
    endTime: '17:30',
    date: '2025-05-15',
    maxParticipants: 15,
    currentParticipants: 12,
    isChanged: false
  },
  {
    id: '202',
    activityType: 'dance',
    title: 'Хип-хоп',
    description: 'Энергичное занятие по хип-хопу для всех уровней подготовки.',
    trainer: trainers[1],
    location: 'Танцевальный класс',
    startTime: '18:00',
    endTime: '19:30',
    date: '2025-05-17',
    maxParticipants: 15,
    currentParticipants: 8,
    isChanged: true
  },
  {
    id: '301',
    activityType: 'karate',
    title: 'Карате для начинающих',
    description: 'Вводное занятие по карате для новичков. Обучение основным стойкам и ударам.',
    trainer: trainers[2],
    location: 'Додзё',
    startTime: '14:00',
    endTime: '15:30',
    date: '2025-05-16',
    maxParticipants: 10,
    currentParticipants: 6,
    isChanged: false
  },
  {
    id: '302',
    activityType: 'karate',
    title: 'Kata и Kumite',
    description: 'Изучение формальных упражнений (ката) и отработка спаррингов (кумите).',
    trainer: trainers[2],
    location: 'Додзё',
    startTime: '16:00',
    endTime: '17:30',
    date: '2025-05-18',
    maxParticipants: 10,
    currentParticipants: 9,
    isChanged: false
  }
];

export const reviews: Review[] = [
  {
    id: '1001',
    classId: '101',
    userId: 'user1',
    userName: 'Анна',
    rating: 5,
    comment: 'Отличное занятие для новичков! Тренер всё понятно объяснил.',
    date: '2025-05-10'
  },
  {
    id: '1002',
    classId: '101',
    userId: 'user2',
    userName: 'Дмитрий',
    rating: 4,
    comment: 'Хорошее занятие, но было бы здорово больше времени уделить отработке подач.',
    date: '2025-05-10'
  },
  {
    id: '1003',
    classId: '201',
    userId: 'user3',
    userName: 'Ольга',
    rating: 5,
    comment: 'Екатерина – замечательный преподаватель! Очень понравилась методика обучения.',
    date: '2025-05-11'
  },
  {
    id: '1004',
    classId: '301',
    userId: 'user4',
    userName: 'Игорь',
    rating: 5,
    comment: 'Отличное введение в карате. Тренер уделил внимание каждому ученику.',
    date: '2025-05-12'
  }
];

export const currentUser: User = {
  id: 'user1',
  name: 'Анна Соколова',
  email: 'anna@example.com',
  phone: '+7 (999) 987-65-43',
  enrolledClasses: ['101', '201'],
  attendanceRecords: {
    'volleyball': {
      activityType: 'volleyball',
      count: 5,
      dates: ['2025-05-01', '2025-05-03', '2025-05-05', '2025-05-08', '2025-05-10']
    },
    'dance': {
      activityType: 'dance',
      count: 3,
      dates: ['2025-05-02', '2025-05-07', '2025-05-09']
    },
    'karate': {
      activityType: 'karate',
      count: 2,
      dates: ['2025-05-04', '2025-05-11']
    }
  }
};
