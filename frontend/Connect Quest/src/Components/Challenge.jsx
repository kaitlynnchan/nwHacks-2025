import "./Challenge.css";
import AnswerPanel from "./AnswerPanel";

export default function Challenge() {
    return (
        <div>
            <div id = "answerDiv">
                <h1 id = "points">For 10 points </h1>
                <h1 className = "dailyChallenge">Todays challenge is...</h1>
                <h1 className = "dailyChallenge">Ask somebody for their favourite colour</h1>
            </div>
            <AnswerPanel/>
        </div>
    ); 
}