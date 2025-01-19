import "./Challenge.css";
import AnswerPanel from "./AnswerPanel";
import ButtonHeader from "./ButtonHeader.jsx";
import "./ButtonHeader.css";
const challenges = ["Ask somebody for their favourite colour", "Take a picture of a unique tree", 
    "Ask someone about their day"];

function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

export default function Challenge() {
    const challenge = challenges[genRandomInt(2)];
    return (
        <div>
        <ButtonHeader></ButtonHeader>
        <div>
            <div id = "answerDiv">
                <h1 className = "dailyChallenge">Todays challenge is...</h1>
                <div id = "challenge">
                    <h1 className = "dailyChallenge">{challenge}</h1>
                </div>
            </div>
            <AnswerPanel/>
        </div>
        </div>
    ); 
}