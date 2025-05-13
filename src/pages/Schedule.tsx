
import React, { useState } from "react";
import Header from "@/components/Header";
import { useApp } from "@/contexts/AppContext";
import ClassCard from "@/components/ClassCard";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Schedule: React.FC = () => {
  const { classes } = useApp();
  const [selectedActivity, setSelectedActivity] = useState<string>("all");
  
  // Group classes by date
  const classesByDate = classes.reduce((acc, classItem) => {
    if (selectedActivity !== "all" && classItem.activityType !== selectedActivity) {
      return acc;
    }
    
    const date = classItem.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(classItem);
    return acc;
  }, {} as Record<string, typeof classes>);
  
  // Sort dates
  const sortedDates = Object.keys(classesByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Расписание занятий</h1>
        
        <div className="mb-8">
          <Tabs 
            defaultValue="all" 
            value={selectedActivity} 
            onValueChange={setSelectedActivity}
          >
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="volleyball">Волейбол</TabsTrigger>
              <TabsTrigger value="dance">Танцы</TabsTrigger>
              <TabsTrigger value="karate">Карате</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {sortedDates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Нет доступных занятий</h2>
            <p className="text-muted-foreground">
              Попробуйте выбрать другой тип активности
            </p>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="py-1 px-3">
                  {date}
                </Badge>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              
              <div className="space-y-4">
                {classesByDate[date].map((classItem) => (
                  <ClassCard key={classItem.id} classItem={classItem} />
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Schedule;
