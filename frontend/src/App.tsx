import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LogInPage from './pages/LogIn/LogIn';
import Challenges from './pages/Challenge/ChallengesList/Challenges';
import ChallengeDetailPage from './pages/Challenge/ChallengeDetails/ChallengeDetail';
import ChallengeCompletion from './pages/Challenge/ChallengeCompletion/ChallengeCompletion';
import './App.css'
import SignUpPage from "./pages/LogIn/SignUp";
import { AnimatePresence } from "motion/react";

function App() {
  return (
      <BrowserRouter basename="/">
        <div className="App min-h-screen">
          <AnimatePresence mode="sync">
            <Routes>
              <Route index element={<LogInPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:challengeId" element={<ChallengeDetailPage />} />
              <Route path="/congratulations" element={<CongratulationsWrapper />} />
              {/* <Route path="/daily" element={<Challenge />} /> */}
            </Routes>
          </AnimatePresence>
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
