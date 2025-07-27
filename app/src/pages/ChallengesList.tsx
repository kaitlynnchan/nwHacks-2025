import React, { useEffect, useState } from "react";
// import "./ChallengeList.css";
// import ButtonHeader from "./ButtonHeader.jsx";
// import "./ButtonHeader.css";
import ChallengesList from "@/components/ChallengesList";
import TopNavBar from "@/components/TopNavBar";


const Challenges = () => {
  return (
    <div>
      <TopNavBar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-pink-600 bg-clip-text text-transparent mb-2" id="page-title">Challenge List</h1>
        <ChallengesList />
      </div>
    </div>
  );
};

export default Challenges;
