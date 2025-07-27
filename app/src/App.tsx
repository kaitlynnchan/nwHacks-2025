import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LogInPage from './pages/LogIn';
import Challenges from './pages/ChallengesList';
import './App.css'
import ChallengeDetail from './pages/ChallengeDetail';
import CongratulationsPage from './pages/Congrats';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route index element={<LogInPage />} />
              <Route path="/home" element={<LogInPage />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
              <Route path="/congratulations" element={<CongratulationsWrapper />} />
              {/* <Route path="/daily" element={<Challenge />} /> */}
            </Routes>
        </div>
      </BrowserRouter>
  )
}

function CongratulationsWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    challengeTitle: string;
    pointsEarned: number;
    previousPoints: number;
  };

  return (
    <CongratulationsPage
      challengeTitle={state?.challengeTitle || "Challenge"}
      pointsEarned={state?.pointsEarned || 10}
      previousPoints={state?.previousPoints || 0}
      onContinue={() => navigate('/challenges')}
      onViewProfile={() => navigate('/profile')}
    />
  );
}
export default App;
