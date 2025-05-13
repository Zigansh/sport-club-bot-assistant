
import React from "react";
import Header from "@/components/Header";
import { useApp } from "@/contexts/AppContext";
import AttendanceChart from "@/components/AttendanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/data/types";

const Analytics: React.FC = () => {
  const { currentUser, classes } = useApp();
  
  // Calculate attendance by activity type
  const attendanceByActivity: Record<Activity, number> = {
    volleyball: 0,
    dance: 0,
    karate: 0
  };
  
  Object.values(currentUser.attendanceRecords).forEach(record => {
    attendanceByActivity[record.activityType] = record.count;
  });
  
  // Calculate most popular classes
  const classCounts = classes.reduce((acc, classItem) => {
    const key = classItem.activityType;
    acc[key] = (acc[key] || 0) + classItem.currentParticipants;
    return acc;
  }, {} as Record<Activity, number>);
  
  const totalAttendance = Object.values(attendanceByActivity).reduce((sum, count) => sum + count, 0);
  const mostFrequentActivity = Object.entries(attendanceByActivity).reduce(
    (max, [activity, count]) => count > max.count ? { activity, count } : max,
    { activity: '', count: -1 }
  ).activity;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Аналитика посещений</h1>
        <p className="text-muted-foreground mb-8">
          Статистика ваших занятий и посещений
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Всего посещений
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalAttendance}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Любимый вид занятий
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize">
                {mostFrequentActivity === 'volleyball' ? 'Волейбол' : 
                 mostFrequentActivity === 'dance' ? 'Танцы' : 'Карате'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Записи на занятия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {currentUser.enrolledClasses.length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Посещения по видам занятий</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={currentUser.attendanceRecords} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
