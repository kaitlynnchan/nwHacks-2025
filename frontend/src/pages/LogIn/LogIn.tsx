import { useUser } from "@/contexts/UserContext";
import LoginForm from "@/pages/LogIn/LoginForm";
import { fetchUser } from "@/services/api/userRoute";
import { useState } from "react";
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

function LogInPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const { setUser } = useUser();
  const navigate = useNavigate();


  const handleLogInSubmit = async (email: string) => {
    try {
      setError("");
      setLoading(true);
      const user: User = await fetchUser(email);
      setUser(user.id, user.points);
      navigate("/challenges");
    } catch (err) {
      setError('Email or password is incorrect');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex-center p-6">
      <LoginForm 
        mode="login" 
        onSubmitHandler={handleLogInSubmit}
        error={error}
        loading={loading} 
      />
    </div>
  );
}

export default LogInPage;