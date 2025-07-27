import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, ArrowRight, CheckCircle, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';

interface CongratulationsProps {
  challengeTitle: string;
  pointsEarned: number;
  previousPoints: number;
  onContinue: () => void;
  onViewProfile: () => void;
}

// Animation hook for counting up numbers
const useCountUp = (end: number, start: number = 0, duration: number = 2000) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (start === end) return;
    
    setIsAnimating(true);
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (end - start) * easeOutCubic);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return { count, isAnimating };
};

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
  const [showIncrease, setShowIncrease] = useState(false);
  const { count } = useCountUp(newPoints, previousPoints, 2000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIncrease(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
        <CardHeader>
            <Badge>+{pointsEarned}</Badge>
            <CardTitle>{count.toLocaleString()}</CardTitle>
            <CardDescription>Total Points</CardDescription>
        </CardHeader>
    </Card>
    // <div className="text-center space-y-4">
    //   <div className="relative">
    //     <div className="text-6xl font-bold text-primary mb-2">
    //       {count.toLocaleString()}
    //     </div>
    //     <div className="text-lg text-muted-foreground">Total Points</div>
        
    //     {showIncrease && (
    //       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-fadeInUp">
    //         <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
    //           <Star className="h-3 w-3" />
    //           +{pointsEarned}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
//   return (
//     <div className="text-center space-y-4">
//       <div className="relative">
//         <div className="text-6xl font-bold text-primary mb-2">
//           {count.toLocaleString()}
//         </div>
//         <div className="text-lg text-muted-foreground">Total Points</div>
        
//         {showIncrease && (
//           <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-fadeInUp">
//             <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
//               <Star className="h-3 w-3" />
//               +{pointsEarned}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
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

  useEffect(() => {
    // Show content with a slight delay for better UX
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
    
  }, []);

  const handleContinue = () => {
    onContinue();
  };

  const handleViewProfile = () => {
    onViewProfile();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
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
          <h1 className="text-3xl font-bold text-gray-900">
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
        {/* <div className="bg-white rounded-lg p-8 shadow-lg border"> */}
          <AnimatedPoints 
            previousPoints={previousPoints}
            newPoints={newPoints}
            pointsEarned={pointsEarned}
          />
        {/* </div> */}

        {/* Achievement Badge */}
        {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5" />
            <span className="font-semibold">Points Earned!</span>
          </div>
          <div className="text-2xl font-bold">
            +{pointsEarned} Points
          </div>
        </div> */}

        {/* Action Buttons */}
        <Button onClick={handleContinue}>Continue Challenges <ChevronRightIcon /></Button>
        {/* <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Continue Challenges
            <ArrowRight className="h-4 w-4" />
          </button>
          
        </div> */}

        {/* Progress Hint */}
        <div className="text-sm text-gray-500">
          Keep completing challenges to earn more points and unlock achievements!
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style> */}
    </div>
  );
}