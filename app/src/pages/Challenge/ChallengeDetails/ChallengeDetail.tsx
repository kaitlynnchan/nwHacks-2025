import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChallenge } from '@/services/api/challengeRoutes';
import { CheckCircle, Flag, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import TopNavBar from '@/components/TopNavBar';
import { fetchUserChallenge, linkChallengeToUser } from '@/services/api/userRoute';
import { useUser } from '@/contexts/UserContext';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/Error';
import { motion } from 'motion/react';
import { useNavBar } from '@/contexts/NavBarContext';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty?: string;
  category?: string;
  estimatedTime?: string;
  requirements: string[];
}

interface UserChallenge {
  id: string;
  challengeId: string;
  completed: boolean;
  notes: string;
  completedAt: string;
}

function ChallengeDetail() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { userId, userPoints, setUserPoints } = useUser();
  
  const [challenge, setChallenge] = useState<Challenge>();
  const [userChallenge, setUserChallenge] = useState<UserChallenge | null>(null);
  const [notes, setNotes] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const getChallenge = async () => {
      try {
        setLoading(true);

        const challenge: Challenge = await fetchChallenge(challengeId!);
        setChallenge(challenge);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        getUserChallenge();
        setLoading(false);
      }
    };

    const getUserChallenge = async () => {
      try {
        const userChallengeResult: UserChallenge = await fetchUserChallenge(userId!, challengeId!);
        setUserChallenge(userChallengeResult);

        if (userChallengeResult) {
          setNotes(userChallengeResult.notes);
          setCompleted(true);
          console.log(userChallenge);
        }
      } catch (err) {
        setCompleted(false);
      }
    };

    if (challengeId) {
      getChallenge();
    }
  }, [challengeId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (challenge){
        await linkChallengeToUser(userId!, challenge.id, notes, '');
        // update user points
        setUserPoints(userPoints! + challenge.points);

        navigate('/congratulations', {
          state: {
            challengeTitle: challenge.title,
            pointsEarned: challenge.points,
            previousPoints: userPoints
          }
        });
      }
    } catch (err) {
      alert(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage title={"Error"} description={error} />;
  if (!challenge) return (
    <ErrorMessage 
      title={"Challenge not found"} 
      description={"The requested challenge could not be found."} 
    />
  );

  return (
    <motion.div className="p-4 space-y-4"
      initial={{ x: window.innerWidth }}
      animate={{ x: 0 }}
      exit={{ x: -window.innerWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Completion Status Banner */}
      {isCompleted && (
        <Card className="gradient-green-100 backdrop-blur-sm border-green-200/50 shadow-lg">
          <CardContent>
            <CardTitle className='font-bold flex items-center'>Challenge Completed!</CardTitle>
            {/* <CardAction>Completed on {new Date(userChallenge.completedAt).toLocaleDateString()}</CardAction> */}
          </CardContent>
        </Card>
      )}
      
      {/* Main Content */}
      <div>
        <Card className={`shadow-lg border-0 backdrop-blur-sm gap-1 py-4
          ${isCompleted 
              ? 'gradient-green-50 border-green-200/50' 
              : 'bg-white/80'
            }
        `}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-2xl shadow-lg flex-shrink-0 
                ${isCompleted 
                  ? 'gradient-green-400' 
                  : 'gradient-orange'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle size={20} />
                ) : (
                  <Flag size={20} />
                )}
              </div>
              <div className="text-right">
                <Badge className={`px-4 py-2 font-bold shadow-md 
                  ${isCompleted 
                    ? 'gradient-green-400' 
                    : 'gradient-orange'
                  }
                `} >
                  {isCompleted ? '✓' : '+'}{challenge.points} pts
                </Badge>
              </div>
            </div>
            
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {challenge.title}
            </CardTitle>
            <CardDescription className="text-md text-gray-600 leading-relaxed mb-6">
              {challenge.description}
            </CardDescription>
          </CardContent>
        </Card>          
      </div>

      {/* Challenge Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
          {/* <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Reward</p>
                  <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                    +{challenge.points} pts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        {/* </div> */}

      {/* Requirements */}
      <div>
        {challenge.requirements && challenge.requirements.length > 0 && (
          <Card className="shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Submission Panel */}
      <div>
        <Card className="shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isCompleted ? 'Your Submission:' : 'Submit Challenge'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                {isCompleted ? 'What you accomplished:' : 'What did you accomplish? *'}
              </Label>
              <Textarea
                id="notes"
                placeholder={isCompleted 
                  ? "Your submission has been recorded" 
                  : "Describe what you did to complete this challenge. Be specific about your experience!"
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
                disabled={isCompleted}
              />
            </div>

            {isCompleted ? (
              <div className="gradient-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} />
                  <span className="font-semibold">Challenge Complete!</span>
                </div>
                <p className="text-sm text-green-700">
                  You've successfully completed this challenge and earned {challenge.points} points! 
                  Keep exploring more challenges to continue your social quest.
                </p>
              </div>
            ) : (
              <Button 
                onClick={() => handleSubmit()}
                disabled={isSubmitting || !notes.trim()}
                className="w-full py-6 text-lg font-semibold gradient-orange shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Challenge
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function ChallengeDetailPage(){
  const { setConfig } = useNavBar();

  useEffect(() => {
    setConfig({
      showBack: true,
      backPath: '/challenges'
    });
  }, [setConfig]);

  return (
    <div>
      <TopNavBar />
      <ChallengeDetail />
    </div>
  );
}

export default ChallengeDetailPage;