
import React from "react";
import { Class } from "@/data/types";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

interface ClassCardProps {
  classItem: Class;
  showActions?: boolean;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, showActions = true }) => {
  const { enrollInClass, cancelEnrollment, currentUser } = useApp();
  const navigate = useNavigate();
  
  const isEnrolled = currentUser.enrolledClasses.includes(classItem.id);
  const isFull = classItem.currentParticipants >= classItem.maxParticipants;
  
  return (
    <div className={`activity-card activity-card-${classItem.activityType}`}>
      {classItem.isChanged && (
        <Badge variant="destructive" className="absolute top-2 right-2">
          Изменено
        </Badge>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold">{classItem.title}</h3>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`bg-activity-${classItem.activityType}/10 text-activity-${classItem.activityType} hover:bg-activity-${classItem.activityType}/20`}>
            {classItem.activityType === 'volleyball' ? 'Волейбол' : 
             classItem.activityType === 'dance' ? 'Танцы' : 'Карате'}
          </Badge>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>{classItem.currentParticipants}/{classItem.maxParticipants}</span>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">
        {classItem.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{classItem.date}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>{classItem.startTime} - {classItem.endTime}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{classItem.location}</span>
        </div>
      </div>
      
      <div className="flex items-center border-t pt-4">
        <div className="flex items-center gap-2">
          <img
            src={classItem.trainer.photo}
            alt={classItem.trainer.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{classItem.trainer.name}</div>
            <div className="text-sm text-muted-foreground">Тренер</div>
          </div>
        </div>
        
        {showActions && (
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/class/${classItem.id}`)}
            >
              Подробнее
            </Button>
            
            {isEnrolled ? (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => cancelEnrollment(classItem.id)}
              >
                Отменить запись
              </Button>
            ) : (
              <Button 
                size="sm"
                disabled={isFull}
                onClick={() => enrollInClass(classItem.id)}
              >
                Записаться
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
