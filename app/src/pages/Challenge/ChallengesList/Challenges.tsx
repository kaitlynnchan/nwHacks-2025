import ChallengesList from "@/pages/Challenge/ChallengesList/ChallengesList";
import TopNavBar from "@/components/TopNavBar";
import { useLocation } from "react-router-dom";

interface LocationState {
  userId: string;
  userPoints: number;
}

const Challenges = () => {
  const location = useLocation();
  const { userId, userPoints } = location.state as LocationState;

  return (
    <div>
      <TopNavBar userPoints={userPoints} />
      <div className="p-4">
        <h1 className="text-3xl md:text-4xl gradient-text mb-2">Challenge List</h1>
        <ChallengesList userId={userId} userPoints={userPoints} />
      </div>
    </div>
  );
};

export default Challenges;
