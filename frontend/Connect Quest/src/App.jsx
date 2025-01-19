import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn.jsx";
import logo from "./assets/connect-logo.png"
import "./index.css";
import ChallengeList from "./Components/ChallengeList.jsx";
import Challenge from "./Components/Challenge.jsx";

export default function App() {
  return (
    <Router>
      <div className="App">
      <img id = "logo" src={logo} alt="app logo" />
      <h1 id = "title">Connect Quest</h1>
          <Routes>
            <Route index element={<LogIn />} />
            <Route path="/home" element={<LogIn />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/daily" element={<Challenge />} />
          </Routes>
      </div>
    </Router>
  );
}
