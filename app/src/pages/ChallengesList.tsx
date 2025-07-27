import React, { useEffect, useState } from "react";
// import "./ChallengeList.css";
// import ButtonHeader from "./ButtonHeader.jsx";
// import "./ButtonHeader.css";
import ChallengesList from "@/components/ChallengesList";


const Challenges = () => {
  return (
    <div>
      <h1 id = "page-title">Challenge List</h1>
      <ChallengesList />
    </div>
  );
};

export default Challenges;
