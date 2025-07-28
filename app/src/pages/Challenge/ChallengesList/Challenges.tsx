import ChallengesList from "@/pages/Challenge/ChallengesList/ChallengesList";
import TopNavBar from "@/components/TopNavBar";

const Challenges = () => {
  return (
    <div>
      <TopNavBar/>
      <div className="p-4">
        <h1 className="text-3xl md:text-4xl gradient-text mb-2">Challenge List</h1>
        <ChallengesList />
      </div>
    </div>
  );
};

export default Challenges;
