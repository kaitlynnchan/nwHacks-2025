import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { fetchUser } from "@/services/api/userRoute";
import { useUser } from "@/contexts/UserContext";

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

function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {setUser} = useUser();

  const handleLogInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user: User = await fetchUser(email);
      console.log(user)
      setUser(user.id, user.points);
      navigate("/challenges");
    } catch (err) {
      alert('Email or password is incorrect');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form 
      className={cn("flex flex-col gap-6", className)} {...props} 
      onSubmit={handleLogInSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="gradient-box p-4 rounded-2xl shadow-lg">
            <Users size={32} className="text-white" />
          </div>
        </div>
        
        {/* App Name */}
        <h2 className="text-2xl gradient-text mb-2">
          Connect Quest
        </h2>

        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
        
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            className="bg-white" 
            id="email" 
            type="email" 
            placeholder="m@email.com" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input 
            className="bg-white" 
            id="password" 
            type="password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <Button type="submit" className="w-full gradient-box hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] h-12">
          Let's Get Started
        </Button>        
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}

export default LoginForm;