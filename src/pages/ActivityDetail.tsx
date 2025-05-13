
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import { ArrowLeft, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActivityDetail: React.FC = () => {
  const { activityType } = useParams<{ activityType: string }>();
  const navigate = useNavigate();
  const { classes, trainers } = useApp();
  
  if (!activityType || !["volleyball", "dance", "karate"].includes(activityType)) {
    navigate("/");
    return null;
  }
  
  const activityClasses = classes.filter(
    (c) => c.activityType === activityType
  );
  
  const activityTrainers = trainers.filter(
    (t) => t.activity === activityType
  );
  
  let activityTitle = "";
  let activityIcon = null;
  
  switch (activityType) {
    case "volleyball":
      activityTitle = "Волейбол";
      activityIcon = (
        <div className="bg-activity-volleyball/10 text-activity-volleyball p-3 rounded-lg">
          <Users className="w-6 h-6" />
        </div>
      );
      break;
    case "dance":
      activityTitle = "Танцы";
      activityIcon = (
        <div className="bg-activity-dance/10 text-activity-dance p-3 rounded-lg">
          <Clock className="w-6 h-6" />
        </div>
      );
      break;
    case "karate":
      activityTitle = "Карате";
      activityIcon = (
        <div className="bg-activity-karate/10 text-activity-karate p-3 rounded-lg">
          <Users className="w-6 h-6" />
        </div>
      );
      break;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          {activityIcon}
          <h1 className="text-3xl font-bold">{activityTitle}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Доступные занятия</h2>
            <div className="space-y-6">
              {activityClasses.length > 0 ? (
                activityClasses.map((classItem) => (
                  <ClassCard key={classItem.id} classItem={classItem} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">Нет доступных занятий</h3>
                  <p className="text-muted-foreground">
                    В данный момент нет занятий по этому направлению
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Тренеры</h2>
            <div className="space-y-4">
              {activityTrainers.map((trainer) => (
                <div key={trainer.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <img
                      src={trainer.photo}
                      alt={trainer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{trainer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {trainer.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityDetail;
