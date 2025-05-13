
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Star, StarHalf } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface ReviewFormProps {
  classId: string;
  onSubmit: (classId: string, rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ classId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    onSubmit(classId, rating, comment);
    setRating(0);
    setComment("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-medium">Оставьте отзыв о занятии</h3>
      
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `${rating} из 5` : "Выберите оценку"}
        </span>
      </div>
      
      <Textarea
        placeholder="Расскажите о своем опыте (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="resize-none"
      />
      
      <Button type="submit" disabled={rating === 0}>
        Отправить отзыв
      </Button>
    </form>
  );
};

export default ReviewForm;
