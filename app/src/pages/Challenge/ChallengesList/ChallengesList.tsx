import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Flag } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { fetchChallenges } from "../../../services/api/challengeRoutes";

interface Challenge {
  id: string
  title: string
  description: string
  points: number
}

const ChallengesList = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | unknown>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const data = await fetchChallenges();
        setChallenges(data);
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

  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>Error: error</div>;
  if (!challenges) return <div>Hold on there, currently there are no challenges!</div>;

  return (
    <div className="space-y-4">
      {challenges.map((challenge: Challenge) => (
        <Card 
          key={`challenge-${challenge.id}`}
          onClick={() => handleClick(challenge)} 
          className="py-2 bg-white/80 border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <CardHeader className="p-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="gradient-box p-2 rounded-xl shadow-md flex-shrink-0">
                  <Flag size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <Badge className="gradient-box px-3 py-1 text-sm font-bold shadow-md">
                  +{challenge.points}
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
