import { useEffect, useState } from "react";
// import "./ChallengeList.css";
// import ButtonHeader from "./ButtonHeader.jsx";
// import "./ButtonHeader.css";
import { fetchChallenges } from "../services/api/challengeRoutes";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Flag } from "lucide-react";
import { Badge } from "./ui/badge";

interface Challenge {
  id: string
  title: string
  description: string
  points: number
}

const ChallengesList = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | unknown>(null);
  const [loading, setLoading] = useState(true);

  // Fetch challenges using the API utility
  useEffect(() => {
    const getChallenges = async () => {
      try {
        const data = await fetchChallenges();

        // updates challenges with new data
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

  // TODO: update to take in challenge paramaters (title, description, pointsReward (int),isActive (bool),endDate (Date),challengeId (string)
  const handleClick = (challenge: Challenge) => {
    navigate(`/challenges/${challenge.id}`);
  };

  return (
    <div className="space-y-4">
      {challenges.map((challenge: Challenge) => (
        <Card onClick={() => handleClick(challenge)} 
            className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
          <CardHeader  className="p-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-gradient-to-br from-orange-400 to-yellow-400 p-2 rounded-xl shadow-md flex-shrink-0">
                  <Flag size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
              </div>
          {/* <CardAction>+{challenge.points} pts</CardAction> */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 text-sm font-bold shadow-md">
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
