
import React from "react";
import Header from "@/components/Header";
import { useApp } from "@/contexts/AppContext";
import TrainerCard from "@/components/TrainerCard";

const Trainers: React.FC = () => {
  const { trainers } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Наши тренеры</h1>
        <p className="text-muted-foreground mb-8">
          Познакомьтесь с нашей командой профессиональных тренеров
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Trainers;
