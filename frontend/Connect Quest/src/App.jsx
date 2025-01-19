import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn.jsx";
import logo from "./assets/connect-logo.png"
import "./index.css";
import ChallengeList from "./Components/ChallengeList.jsx";

export default function App() {
  return (
    <Router>
      <div className="App">
        <img id = "logo" src={logo} alt="app logo" />
        <h1 id = "title">Connect Quest</h1>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/challenges" element={<ChallengeList />} />
        </Routes>
      </div>
    </Router>
>>>>>>> ddac308cacaeb8b7711eff358f1ec9e1acf2ac3e
  );
}
