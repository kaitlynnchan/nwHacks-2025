import LoginForm from "@/pages/LogIn/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/services/api/userRoute";

function SignUpPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUpSubmit = async (email: string, password: string) => {
    try {
      setError("");
      setLoading(true);
      await createUser(email, password);
      navigate("/login");
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