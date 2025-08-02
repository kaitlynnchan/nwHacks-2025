import { CheckCircle, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedPoints from './AnimatedPoints';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import Confetti from 'react-confetti';

interface CongratulationsProps {
  challengeTitle: string;
  pointsEarned: number;
  previousPoints: number;
}

function ChallengeCompletion({
  challengeTitle = "Challenge",
  pointsEarned = 0,
  previousPoints = 0
}: CongratulationsProps) {
  const [isExiting, setExtiting] = useState(false)
  const newPoints = previousPoints + pointsEarned;
  const navigator = useNavigate();

  const handleContinue = () => {
    setExtiting(true);
    setTimeout(() => {
        navigator("/challenges");
      }, 300);
  };

  return (
    <motion.div 
      className="min-h-screen flex-center p-6"
      initial={{ x: 0 }}
      animate={{ x: isExiting ? -window.innerWidth : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight}
        recycle={false}
      />
      
      <div className={`max-w-md w-full space-y-8 text-center`}>
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 gradient-green-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12" />
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
        <Button 
          onClick={handleContinue}
          className='w-full gradient-orange hover:from-orange-500 hover:to-yellow-500 font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] text-lg'>
            Continue Challenges <ChevronRightIcon />
        </Button>

        {/* Progress Hint */}
        <div className="text-sm text-gray-500">
          Keep completing challenges to earn more points and unlock achievements!
        </div>
      </div>

    </motion.div>
  );
}

export default ChallengeCompletion;