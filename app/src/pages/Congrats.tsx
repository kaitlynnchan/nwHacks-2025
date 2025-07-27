import { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';

interface CongratulationsProps {
  challengeTitle: string;
  pointsEarned: number;
  previousPoints: number;
  onContinue: () => void;
  onViewProfile: () => void;
}

// Confetti animation component
// const Confetti = () => {
//   const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
//     id: i,
//     left: Math.random() * 100,
//     animationDelay: Math.random() * 3,
//     color: ['bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400', 'bg-purple-400'][Math.floor(Math.random() * 5)]
//   }));

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {confettiPieces.map((piece) => (
//         <div
//           key={piece.id}
//           className={`absolute w-2 h-2 ${piece.color} animate-bounce`}
//           style={{
//             left: `${piece.left}%`,
//             animationDelay: `${piece.animationDelay}s`,
//             animationDuration: '3s',
//             top: '-10px'
//           }}
//         />
//       ))}
//     </div>
//   );
// };

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

export default function CongratulationsPage({ 
  challengeTitle = "Challenge",
  pointsEarned = 10,
  previousPoints = 0,
  onContinue,
  onViewProfile
}: CongratulationsProps) {
  const [showContent, setShowContent] = useState(false);
  const newPoints = previousPoints + pointsEarned;
//   const confettiRef = useRef<ConfettiRef>(null);

  const handleContinue = () => {
    onContinue();
  };

  return (
    <div className="min-h-screen flex-center p-6">
      {/* <Confetti /> */}
      {/* <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      /> */}
      
      <div className={`max-w-md w-full space-y-8 text-center`}>
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Congratulations Text */}
        <div className="space-y-2">
          <h1 className="text-3xl gradient-text">
            Congratulations! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            You successfully completed
          </p>
          <p className="text-xl font-semibold text-primary">
            "{challengeTitle}"
          </p>
        </div>

        {/* Animated Points */}
        <AnimatedPoints 
          previousPoints={previousPoints}
          newPoints={newPoints}
          pointsEarned={pointsEarned}
        />

        {/* Action Buttons */}
        <Button onClick={handleContinue}
        className='w-full gradient-box hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] text-lg'>
            Continue Challenges <ChevronRightIcon />
        </Button>

        {/* Progress Hint */}
        <div className="text-sm text-gray-500">
          Keep completing challenges to earn more points and unlock achievements!
        </div>
      </div>

    </div>
  );
}