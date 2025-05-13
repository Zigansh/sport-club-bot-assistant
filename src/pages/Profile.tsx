
import React from "react";
import { useApp } from "@/contexts/AppContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Profile: React.FC = () => {
  const { currentUser, logout, isLoggedIn } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Профиль</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#1E94D2]" />
                Личная информация
              </CardTitle>
              <CardDescription>
                Ваши личные данные и настройки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ФИО</h3>
                  <p className="text-lg">{currentUser.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{currentUser.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Телефон</h3>
                  <p className="text-lg">{currentUser.phone || "Не указан"}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Выйти из аккаунта
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Активность</CardTitle>
              <CardDescription>
                Ваша статистика
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Записано занятий</h3>
                  <p className="text-2xl font-bold">{currentUser.enrolledClasses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
