import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Flag } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { fetchChallenges } from "../../../services/api/challengeRoutes";
import { fetchUserChallenges } from "@/services/api/userRoute";
import { useUser } from "@/contexts/UserContext";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error";
import type { Challenge, UserChallenge } from "@/types/types";

const ChallengesList = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userId, userAccessToken } = useUser();

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const allChallenges = await fetchChallenges();
        const userChallenges = await fetchUserChallenges(userId!, userAccessToken!);
        
        const completedSet = new Set(
          userChallenges
            .filter((uc: UserChallenge) => uc.completed)
            .map((uc: UserChallenge) => uc.challengeId)
        );

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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage title={"Error"} description={error} />;
  if (!challenges) return (
    <ErrorMessage 
      title={"Hold on there, currently there are no challenges!"} 
      description={null} 
    />
  );

  return (
    <div className="space-y-4">
      {challenges.map((challenge: Challenge) => (
        <Card 
          key={`challenge-${challenge.id}`}
          onClick={() => handleClick(challenge)} 
          className={`py-2 bg-white/80 border-white/20 shadow-lg transition-all duration-200 cursor-pointer
            ${challenge.completed 
                ? 'gradient-green-50 hover:from-green-100/90 hover:to-emerald-100/90 border-green-200/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-white/80 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }
          `}
        >
          <CardHeader className="p-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-xl shadow-md flex-shrink-0 
                  ${challenge.completed 
                    ? 'gradient-green-400' 
                    : 'gradient-orange'
                  }
                `}>
                  {challenge.completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Flag size={20} />
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
                    ? 'gradient-green-400' 
                    : 'gradient-orange'
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
