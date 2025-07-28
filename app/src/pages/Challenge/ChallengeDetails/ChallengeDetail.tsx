import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChallenge } from '@/services/api/challengeRoutes';
import { CheckCircle, Flag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import TopNavBar from '@/components/TopNavBar';
import { linkChallengeToUser } from '@/services/api/userRoute';
import { useUser } from '@/contexts/UserContext';

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

function ChallengeDetail() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { userId, userPoints, setUserPoints } = useUser();
  
  const [challenge, setChallenge] = useState<Challenge>();
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getChallenge = async () => {
      try {
        setLoading(true);
        const response = await fetchChallenge(challengeId!);
        setChallenge(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      getChallenge();
    }
  }, [challengeId]);

  const handleSubmit = async (challengeId: string, pointsEarned: number) => {
    if (!notes.trim()) {
      alert('Please add some notes about what you accomplished!');
      return;
    }

    setIsSubmitting(true);
    try {
      if (challenge){
        await linkChallengeToUser(userId!, challengeId, notes, '');
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

  if (!challenge) return <div>Challenge not found</div>;
  
  return (
    <div>
      <TopNavBar />
      <div className="p-4 space-y-4">
        
        {/* Main Content */}
        <div>
          <Card className="shadow-lg border-0 backdrop-blur-sm gap-1 py-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="gradient-box p-2 rounded-2xl shadow-lg">
                  <Flag size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <Badge className="gradient-box px-4 py-2 font-bold shadow-md">
                    +{challenge.points} pts
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
                Submit Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  What did you accomplish? *
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Describe what you did to complete this challenge. Be specific about your experience!"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={() => handleSubmit(challenge.id, challenge.points)}
                disabled={isSubmitting || !notes.trim()}
                className="w-full py-6 text-lg font-semibold gradient-box shadow-lg hover:shadow-xl transition-all duration-200"
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;