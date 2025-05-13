
import React, { createContext, useContext, useState } from "react";
import { Activity, Class, Review, User, Trainer } from "../data/types";
import { classes as initialClasses, reviews as initialReviews, currentUser as initialUser, trainers as initialTrainers } from "../data/mockData";
import { toast } from "../components/ui/sonner";

interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AppContextType {
  classes: Class[];
  reviews: Review[];
  currentUser: User;
  trainers: Trainer[];
  isLoggedIn: boolean;
  addReview: (classId: string, rating: number, comment: string) => void;
  enrollInClass: (classId: string) => void;
  cancelEnrollment: (classId: string) => void;
  getClassNotifications: () => Class[];
  dismissNotification: (classId: string) => void;
  registerUser: (userData: RegisterUserData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [trainers] = useState<Trainer[]>(initialTrainers);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([initialUser]);
  
  const addReview = (classId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      classId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, newReview]);
    toast("Отзыв добавлен", {
      description: "Спасибо за ваш отзыв!",
    });
  };
  
  const enrollInClass = (classId: string) => {
    if (currentUser.enrolledClasses.includes(classId)) {
      toast("Вы уже записаны на это занятие", {
        description: "Проверьте свое расписание",
      });
      return;
    }
    
    setCurrentUser({
      ...currentUser,
      enrolledClasses: [...currentUser.enrolledClasses, classId]
    });
    
    setClasses(classes.map(c => 
      c.id === classId 
        ? { ...c, currentParticipants: c.currentParticipants + 1 } 
        : c
    ));
    
    toast("Успешная запись", {
      description: "Вы успешно записаны на занятие",
    });
  };
  
  const cancelEnrollment = (classId: string) => {
    if (!currentUser.enrolledClasses.includes(classId)) {
      toast("Вы не записаны на это занятие", {
        description: "Проверьте свое расписание",
      });
      return;
    }
    
    setCurrentUser({
      ...currentUser,
      enrolledClasses: currentUser.enrolledClasses.filter(id => id !== classId)
    });
    
    setClasses(classes.map(c => 
      c.id === classId 
        ? { ...c, currentParticipants: c.currentParticipants - 1 } 
        : c
    ));
    
    toast("Запись отменена", {
      description: "Вы отменили запись на занятие",
    });
  };
  
  const getClassNotifications = () => {
    return classes.filter(c => c.isChanged);
  };
  
  const dismissNotification = (classId: string) => {
    setClasses(classes.map(c => 
      c.id === classId 
        ? { ...c, isChanged: false } 
        : c
    ));
  };
  
  const registerUser = async (userData: RegisterUserData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Check if email already exists
          const emailExists = users.some(user => user.email === userData.email);
          if (emailExists) {
            reject(new Error("Пользователь с таким email уже существует"));
            return;
          }

          // Create new user
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            enrolledClasses: [],
          };

          // Add to users array
          setUsers([...users, newUser]);
          
          // Auto login
          setCurrentUser(newUser);
          setIsLoggedIn(true);
          
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simulate network delay
    });
  };

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find user by email
        const user = users.find(u => u.email === email);
        
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error("Неверный email или пароль"));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <AppContext.Provider value={{ 
      classes, 
      reviews, 
      currentUser, 
      trainers,
      isLoggedIn,
      addReview, 
      enrollInClass, 
      cancelEnrollment,
      getClassNotifications,
      dismissNotification,
      registerUser,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
