import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Flag } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { fetchChallenges } from "../../../services/api/challengeRoutes";
import { fetchUserChallenges } from "@/services/api/userRoute";
import { useUser } from "@/contexts/UserContext";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

interface UserChallenge {
  challengeId: string;
  completed: boolean;
}

const ChallengesList = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userId } = useUser();

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const allChallenges: Challenge[] = await fetchChallenges();
        const userChallenges: UserChallenge[] = await fetchUserChallenges(userId!);
        
        // Create a Set of completed challenge IDs
        const completedSet = new Set(
          userChallenges
            .filter((uc: UserChallenge) => uc.completed)
            .map((uc: UserChallenge) => uc.challengeId)
        );

        // Mark challenges as completed if in userChallenges
        const updatedChallenges = allChallenges.map((ch: Challenge) => ({
          ...ch,
          completed: completedSet.has(ch.id),
        }));

        setChallenges(updatedChallenges);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getChallenges();
  }, []);

  const handleClick = (challenge: Challenge) => {
    navigate(`/challenges/${challenge.id}`);
  };

  
  if (loading) {
    return (
      <div>
        <div className="min-h-screen flex-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen flex-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!challenges) {
    return (
      <div>
        <div className="min-h-screen flex-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Hold on there, currently there are no challenges!</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge: Challenge) => (
        <Card 
          key={`challenge-${challenge.id}`}
          onClick={() => handleClick(challenge)} 
          className={`py-2 bg-white/80 border-white/20 shadow-lg transition-all duration-200 cursor-pointer
            ${challenge.completed 
                ? 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 hover:from-green-100/90 hover:to-emerald-100/90 border-green-200/50' 
                : 'bg-white/80 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }
          `}
        >
          <CardHeader className="p-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-xl shadow-md flex-shrink-0 
                  ${challenge.completed 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                    : 'gradient-box'
                  }
                `}>
                  {challenge.completed ? (
                    <CheckCircle size={20} className="text-white" />
                  ) : (
                    <Flag size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <Badge className={`px-3 py-1 text-sm font-bold shadow-md 
                  ${challenge.completed 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' 
                    : 'gradient-box'
                  }
                `}>
                  {challenge.completed ? '✓' : '+'}{challenge.points}
                </Badge>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ChallengesList;
