
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";

const ClassDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { classes, reviews, addReview, enrollInClass, cancelEnrollment, currentUser } = useApp();
  
  const classItem = classes.find(c => c.id === classId);
  
  if (!classItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Занятие не найдено</h1>
            <Button onClick={() => navigate(-1)}>Назад</Button>
          </div>
        </div>
      </div>
    );
  }
  
  const isEnrolled = currentUser.enrolledClasses.includes(classItem.id);
  const isFull = classItem.currentParticipants >= classItem.maxParticipants;
  const classReviews = reviews.filter(r => r.classId === classId);
  
  const activityName = 
    classItem.activityType === 'volleyball' ? 'Волейбол' :
    classItem.activityType === 'dance' ? 'Танцы' : 'Карате';
  
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
        
        <div className={`h-2 w-24 mb-6 bg-activity-${classItem.activityType} rounded-full`} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 border mb-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className={`inline-block text-sm px-2 py-1 rounded-md mb-2 bg-activity-${classItem.activityType}/10 text-activity-${classItem.activityType}`}>
                    {activityName}
                  </span>
                  <h1 className="text-3xl font-bold mb-2">{classItem.title}</h1>
                </div>
                
                <div>
                  {isEnrolled ? (
                    <Button 
                      variant="destructive"
                      onClick={() => cancelEnrollment(classItem.id)}
                    >
                      Отменить запись
                    </Button>
                  ) : (
                    <Button 
                      disabled={isFull}
                      onClick={() => enrollInClass(classItem.id)}
                    >
                      Записаться
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg mb-6">{classItem.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Дата</div>
                      <div className="font-medium">{classItem.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Clock className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Время</div>
                      <div className="font-medium">{classItem.startTime} - {classItem.endTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <Users className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Участники</div>
                      <div className="font-medium">{classItem.currentParticipants}/{classItem.maxParticipants}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-md mb-6">
                  <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Расположение</div>
                    <div className="font-medium">{classItem.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Отзывы</h2>
                {isEnrolled && (
                  <div className="mb-6">
                    <ReviewForm classId={classItem.id} onSubmit={addReview} />
                  </div>
                )}
                <ReviewList reviews={classReviews} />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg p-6 border sticky top-24">
              <h2 className="text-xl font-semibold mb-4">О тренере</h2>
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={classItem.trainer.photo} 
                  alt={classItem.trainer.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{classItem.trainer.name}</h3>
                  <span className={`text-sm text-activity-${classItem.activityType}`}>
                    Тренер по {activityName.toLowerCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                {classItem.trainer.bio}
              </p>
              
              <Button variant="outline" className="w-full">
                Связаться: {classItem.trainer.phone}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassDetail;
