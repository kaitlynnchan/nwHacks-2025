import ChallengesList from "@/pages/Challenge/ChallengesList/ChallengesList";
import TopNavBar from "@/components/TopNavBar";
import { useNavBar } from "@/contexts/NavBarContext";
import { useEffect } from "react";

const Challenges = () => {
  const { setConfig } = useNavBar();
  
  useEffect(() => {
    setConfig({
      showBack: false
    });
  }, [setConfig]);

  return (
    <div>
      <TopNavBar />
      <div className="p-4">
        <h1 className="text-3xl md:text-4xl gradient-text mb-2">Challenge List</h1>
        <ChallengesList />
      </div>
    </div>
  );
};

export default Challenges;
