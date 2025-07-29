import { useUser } from "@/contexts/UserContext";
import LoginForm from "@/pages/LogIn/LoginForm";
import { createUser } from "@/services/api/userRoute";
import { useNavigate } from "react-router-dom";

interface UserChallenge {
  id: string;
  challengeId: string;
  completed: boolean;
  notes: string;
  document: string;
  completedAtTs: Date;
}

interface User {
  id: string;
  email: string;
  points: number;
  challenges: [UserChallenge]
}

function SignUpPage() {
  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleSignUpSubmit = async (email: string) => {
    try {
      const user: User = await createUser(email);
      setUser(user.id, user.points);
      navigate("/challenges");
    } catch (err) {
      alert('User already exists');
    }
  };
  
  return (
    <div className="min-h-screen flex-center p-6">
      <LoginForm mode="signup" onSubmitHandler={handleSignUpSubmit}/>
    </div>
  );
}

export default SignUpPage;