import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

// Points display component with animation
const AnimatedPoints = ({ previousPoints, newPoints, pointsEarned }: {
  previousPoints: number;
  newPoints: number;
  pointsEarned: number;
}) => {
  const [currentPoints, setCurrentPoints] = useState(previousPoints);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = pointsEarned / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      if (step <= steps) {
        setCurrentPoints(Math.floor(previousPoints + (increment * step)));
      } else {
        setCurrentPoints(newPoints);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [previousPoints, newPoints, pointsEarned]);

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200 shadow-lg">
      <CardContent className="text-center">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <Star className="h-5 w-5" />
            <span className="font-semibold">Points Earned!</span>
          </div>
          <div className="text-3xl gradient-text">
            +{pointsEarned} Points
          </div>
          <div className="text-sm text-gray-600">
            Total: {currentPoints.toLocaleString()} points
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedPoints;