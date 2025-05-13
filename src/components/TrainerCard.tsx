
import React from "react";
import { Trainer } from "@/data/types";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  const activityName = 
    trainer.activity === 'volleyball' ? 'Волейбол' :
    trainer.activity === 'dance' ? 'Танцы' : 'Карате';
  
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 bg-activity-${trainer.activity}`} />
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <img 
            src={trainer.photo} 
            alt={trainer.name} 
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
            <div className={`inline-block text-sm px-2 py-1 rounded mb-2 bg-activity-${trainer.activity}/10 text-activity-${trainer.activity}`}>
              {activityName}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{trainer.bio}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50">
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <Phone className="w-4 h-4" />
          <span>{trainer.phone}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;
