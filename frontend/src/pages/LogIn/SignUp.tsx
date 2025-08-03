import { useUser } from "@/contexts/UserContext";
import LoginForm from "@/pages/LogIn/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/services/api/userRoute";

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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSignUpSubmit = async (email: string, password: string) => {
    try {
      setError("");
      setLoading(true);
      const user: User = await createUser(email, password);
      setUser(user.id, user.points);
      navigate("/challenges");
    } catch (err) {
      setError('Whoops, that email is already taken');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex-center p-6">
      <LoginForm 
        mode="signup" 
        onSubmitHandler={handleSignUpSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default SignUpPage;