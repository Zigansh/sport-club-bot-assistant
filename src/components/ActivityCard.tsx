
import { Activity } from "@/data/types";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActivityCardProps {
  type: Activity;
  title: string;
  description: string;
  icon: JSX.Element;
  count: number;
}

const ActivityCard = ({ type, title, description, icon, count }: ActivityCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`activity-card activity-card-${type} cursor-pointer`}
      onClick={() => navigate(`/${type}`)}
    >
      <div className="flex justify-between mb-4">
        <div className={`p-2 rounded-md bg-activity-${type}/10 text-activity-${type}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {count} занятий
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center text-sm text-primary font-medium gap-1 group">
        <span>Подробнее</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default ActivityCard;
