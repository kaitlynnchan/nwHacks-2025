import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChallenge } from '@/services/api/challengeRoutes';
// import { Badge } from '@/components/ui/badge';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChallengeDetail1 {
  id: string;
  title: string;
  description: string;
  points: number;
//   longDescription: string;
//   difficulty: string;
//   imageUrl?: string;
//   requirements: string[];
//   submissionGuidelines: string;
//   deadline?: string;
}

// function ChallengeDetail() {
//   const { challengeId } = useParams<{ challengeId: string }>();
//   const [challenge, setChallenge] = useState<ChallengeDetail>();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [userPoints, setUserPoints] = useState(85); // Current user points

//   useEffect(() => {
//     const getChallenge = async () => {
//       try {
//         setLoading(true);
//         const response = await fetchChallenge(challengeId!);
//         console.log(response)
//         // if (response instanceof ChallengeDetail){
//         setChallenge(response);
//         console.log(challenge)
//         // }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load challenge');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (challengeId) {
//       getChallenge();
//     }
//   }, [challengeId]);

//   const handleSubmit = async (challengeId: string, pointsEarned: number) => {
//     try {
//       // Submit challenge completion to your API

//       // Navigate to congratulations page with data
//       if (challenge){
//         navigate('/congratulations', {
//           state: {
//             challengeTitle: challenge.title,
//             pointsEarned: challenge.points,
//             previousPoints: userPoints
//           }
//         });
//       }
      
      
//       // Update user points locally
//       setUserPoints(prev => prev + pointsEarned);
      
//     } catch (error) {
//       console.error('Failed to submit challenge:', error);
//     }
//   };

//   if (loading) return <div>Loading challenge...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!challenge) return <div>Challenge not found</div>;

//   return (
//     <div>
//       <Flag size="48px" />
//       <h1>{challenge.title}</h1>
//       <p>{challenge.description}</p>
//       <Badge>+{challenge.points} pts</Badge>
//       <div className="grid w-full max-w-sm items-center gap-3">
//         <Label htmlFor="email">Notes</Label>
//         <Textarea placeholder="Add your notes of what you accomplished." />
//       </div>
//       <Button onClick={() => handleSubmit(challenge.id, challenge.points)}>Submit</Button>
//         {/* <section>
//           <h2>Requirements</h2>
//           <ul>
//             {challenge.requirements.map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </section> */}
        
//         {/* <section>
//           <h2>Submission Guidelines</h2>
//           <p>{challenge.submissionGuidelines}</p>
//         </section>
        
//         {challenge.deadline && (
//           <section>
//             <h2>Deadline</h2>
//             <p>{new Date(challenge.deadline).toLocaleDateString()}</p>
//           </section>
//         )} */}
//     </div>
//   );
// };

// export default ChallengeDetail;

import { 
  Flag, 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import TopNavBar from '@/components/TopNavBar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  estimatedTime?: string;
  participants?: number;
  requirements?: string[];
  tips?: string[];
}

interface ChallengeDetailsProps {
  challenge: Challenge;
  onBack?: () => void;
  onSubmit?: (challengeId: string, points: number, notes: string) => void;
}

export default function ChallengeDetail({ 
  // challenge = {
  //   id: "1",
  //   title: "Join a study group",
  //   description: "Participate in a study group to enhance your learning experience and connect with fellow students.",
  //   points: 10,
  //   difficulty: "easy",
  //   category: "Social",
  //   estimatedTime: "30-60 minutes",
  //   participants: 1247,
  //   requirements: [
  //     "Find or create a study group with at least 2 other students",
  //     "Participate actively in the discussion",
  //     "Share your notes or ask questions"
  //   ],
  //   tips: [
  //     "Check your campus bulletin boards for existing study groups",
  //     "Use social media or student apps to find groups",
  //     "Don't be shy - everyone is there to learn!"
  //   ]
  // },
  // onBack = () => console.log('Back clicked'),
  // onSubmit = (id, points, notes) => console.log('Submit:', { id, points, notes })
}: ChallengeDetailsProps) {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(85); // Current user points
  const [loading, setLoading] = useState(true);
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<ChallengeDetail1>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChallenge = async () => {
      try {
        setLoading(true);
        const response = await fetchChallenge(challengeId!);
        console.log(response)
        // if (response instanceof ChallengeDetail){
        setChallenge(response);
        console.log(challenge)
        // }
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
      // Submit challenge completion to your API

      // Navigate to congratulations page with data
      if (challenge){
        navigate('/congratulations', {
          state: {
            challengeTitle: challenge.title,
            pointsEarned: challenge.points,
            previousPoints: userPoints
          }
        });
      }
      
      
      // Update user points locally
      setUserPoints(prev => prev + pointsEarned);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!challenge) return <div>Challenge not found</div>;
  
  return (
    <div>
      <TopNavBar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-4 space-y-4">
        
        {/* Main Content */}
        <div>
          <Card className="shadow-lg border-0 backdrop-blur-sm">
            <CardHeader>
              {/* <div className="bg-gradient-to-br from-orange-400 to-yellow-400 p-2 rounded-2xl shadow-lg">
                <Flag size={32} className="text-white" />
              </div>
              <CardAction>
                <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 font-bold shadow-md">
                  +{challenge.points} pts
                </Badge>
              </CardAction> */}
              <div className="flex items-center justify-between">
                <div className="bg-gradient-to-br from-orange-400 to-yellow-400 p-2 rounded-2xl shadow-lg">
                  <Flag size={32} className="text-white" />
                </div>
                <div className="text-right">
                  <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 font-bold shadow-md">
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
            {/* {challenge.requirements && challenge.requirements.length > 0 && (
              <Card className="shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-blue-600" />
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
            )} */}
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
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {/* <CheckCircle className="mr-2 h-5 w-5" /> */}
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
}