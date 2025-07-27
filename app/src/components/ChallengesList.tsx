import { useEffect, useState } from "react";
// import "./ChallengeList.css";
// import ButtonHeader from "./ButtonHeader.jsx";
// import "./ButtonHeader.css";
import { fetchChallenges } from "../services/api/challengeRoutes";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      {challenges.map((challenge: Challenge) => (
        <Card onClick={() => handleClick(challenge)}>
          <CardHeader>
            <CardTitle>{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
            <CardAction>+{challenge.points} pts</CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ChallengesList;
