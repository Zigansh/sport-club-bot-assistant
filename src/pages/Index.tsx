
import React from "react";
import { useApp } from "@/contexts/AppContext";
import ClassCard from "@/components/ClassCard";
import ActivityCard from "@/components/ActivityCard";
import Header from "@/components/Header";
import { Dumbbell, Music, Sword, CalendarCheck2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const { classes, currentUser } = useApp();
  const navigate = useNavigate();
  
  const upcomingClasses = classes
    .filter(c => new Date(c.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
    
  const enrolledClasses = classes
    .filter(c => currentUser.enrolledClasses.includes(c.id))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const activityCounts = {
    volleyball: classes.filter(c => c.activityType === 'volleyball').length,
    dance: classes.filter(c => c.activityType === 'dance').length,
    karate: classes.filter(c => c.activityType === 'karate').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Секции и занятия</h1>
            <p className="text-muted-foreground">
              Выберите интересующую секцию или занятие
            </p>
          </div>
          
          <Card className="w-full md:w-auto mt-4 md:mt-0">
            <CardContent className="flex items-center gap-2 p-3">
              <CalendarCheck2 className="text-green-500" />
              <div>
                <div className="text-sm font-medium">Вы записаны</div>
                <div className="text-xl font-bold">{enrolledClasses.length} занятий</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Доступные секции</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ActivityCard 
            type="volleyball"
            title="Волейбол"
            description="Командная игра с мячом через сетку, улучшает координацию и выносливость"
            icon={<Dumbbell className="w-5 h-5" />}
            count={activityCounts.volleyball}
          />
          <ActivityCard 
            type="dance"
            title="Танцы"
            description="Современная хореография, хип-хоп и другие танцевальные направления"
            icon={<Music className="w-5 h-5" />}
            count={activityCounts.dance}
          />
          <ActivityCard 
            type="karate"
            title="Карате"
            description="Японское боевое искусство, развивающее дисциплину и физическую форму"
            icon={<Sword className="w-5 h-5" />}
            count={activityCounts.karate}
          />
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Ближайшие занятия</TabsTrigger>
            <TabsTrigger value="enrolled">Мои записи</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map(classItem => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Нет доступных занятий в ближайшее время
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="enrolled" className="space-y-6">
            {enrolledClasses.length > 0 ? (
              enrolledClasses.map(classItem => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Вы пока не записаны ни на одно занятие
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
