
import React, { useState } from "react";
import { Bell, LogIn, UserPlus, LogOut } from "lucide-react";
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
} from "@/components/ui/dialog";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header: React.FC = () => {
  const { getClassNotifications, dismissNotification, currentUser, isLoggedIn, logout } = useApp();
  const navigate = useNavigate();
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  
  const notifications = getClassNotifications();
  
  return (
    <header className="sticky top-0 z-10 bg-[#1E94D2] text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            TG Bot
          </span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Button variant="link" className="text-white" onClick={() => navigate("/")}>
            Главная
          </Button>
          <Button variant="link" className="text-white" onClick={() => navigate("/schedule")}>
            Расписание
          </Button>
          <Button variant="link" className="text-white" onClick={() => navigate("/trainers")}>
            Тренеры
          </Button>
          <Button variant="link" className="text-white" onClick={() => navigate("/analytics")}>
            Аналитика
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 bg-transparent border-white text-white hover:bg-white/20"
                onClick={() => setSignupDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Регистрация</span>
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2 bg-white text-[#1E94D2] hover:bg-white/90"
                onClick={() => setLoginDialogOpen(true)}
              >
                <LogIn className="h-4 w-4" />
                <span>Вход</span>
              </Button>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative bg-transparent border-white text-white hover:bg-white/20">
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

          {isLoggedIn && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-white hover:bg-white/20"
                >
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs text-white font-medium">
                    {currentUser.name.split(' ').map(part => part[0]).join('')}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Выход из аккаунта</AlertDialogTitle>
                  <AlertDialogDescription>
                    Вы действительно хотите выйти из аккаунта?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      
      {/* Registration Dialog */}
      <Dialog open={signupDialogOpen} onOpenChange={setSignupDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
            <DialogDescription>
              Создайте учетную запись для доступа к секциям и занятиям
            </DialogDescription>
          </DialogHeader>
          <SignupForm onSuccess={() => setSignupDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Вход</DialogTitle>
            <DialogDescription>
              Войдите в свою учетную запись
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={() => setLoginDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
