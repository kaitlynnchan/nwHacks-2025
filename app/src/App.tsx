import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import LogInPage from './pages/LogIn/LogIn';
import Challenges from './pages/Challenge/ChallengesList/Challenges';
import ChallengeDetail from './pages/Challenge/ChallengeDetails/ChallengeDetail';
import ChallengeCompletion from './pages/Challenge/ChallengeCompletion/ChallengeCompletion';
import './App.css'

function App() {
  return (
      <BrowserRouter>
        <div className="App min-h-screen">
            <Routes>
              <Route index element={<LogInPage />} />
              <Route path="/login" element={<LogInPage />} />
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
  const location = useLocation();
  const state = location.state as {
    challengeTitle: string;
    pointsEarned: number;
    previousPoints: number;
  };

  return (
    <ChallengeCompletion
      challengeTitle={state?.challengeTitle || "Challenge"}
      pointsEarned={state?.pointsEarned || 10}
      previousPoints={state?.previousPoints || 0}
    />
  );
}
export default App;
