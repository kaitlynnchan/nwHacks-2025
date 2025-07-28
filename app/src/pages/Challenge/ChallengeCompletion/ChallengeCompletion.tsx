import { useState } from 'react';
import { CheckCircle, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedPoints from './AnimatedPoints';
import { useNavigate } from 'react-router-dom';
// import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';

interface CongratulationsProps {
  userId: string
  challengeTitle: string;
  pointsEarned: number;
  previousPoints: number;
}

function ChallengeCompletion({
  userId,
  challengeTitle = "Challenge",
  pointsEarned = 10,
  previousPoints = 0
}: CongratulationsProps) {
  const [showContent, setShowContent] = useState(false);
  const newPoints = previousPoints + pointsEarned;
  const navigator = useNavigate();
//   const confettiRef = useRef<ConfettiRef>(null);

  const handleContinue = () => {
    navigator('/challenges', {
      state: {
        userId: userId,
        userPoints: newPoints
      }
    })
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

export default ChallengeCompletion;