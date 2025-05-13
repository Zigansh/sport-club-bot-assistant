
import React, { useState } from "react";
import { Bell, LogIn, UserPlus } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupForm from "./SignupForm";

const Header: React.FC = () => {
  const { getClassNotifications, dismissNotification, currentUser, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  
  const notifications = getClassNotifications();
  
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            Бета
          </span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Button variant="link" onClick={() => navigate("/")}>
            Главная
          </Button>
          <Button variant="link" onClick={() => navigate("/schedule")}>
            Расписание
          </Button>
          <Button variant="link" onClick={() => navigate("/trainers")}>
            Тренеры
          </Button>
          <Button variant="link" onClick={() => navigate("/analytics")}>
            Аналитика
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Нет новых уведомлений
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-3 cursor-default border-b last:border-0"
                  >
                    <div className="flex justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Изменение в расписании!
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-1"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      Отметить как прочитанное
                    </Button>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2"
              onClick={() => navigate("/profile")}
            >
              <span>{currentUser.name.split(' ')[0]}</span>
              <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs text-primary font-medium">
                {currentUser.name.split(' ').map(part => part[0]).join('')}
              </span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Регистрация</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogDescription>
                      Создайте учетную запись для доступа к секциям и занятиям
                    </DialogDescription>
                  </DialogHeader>
                  <SignupForm onSuccess={() => setSignupOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <Button variant="default" size="sm" className="hidden md:flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Вход</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
