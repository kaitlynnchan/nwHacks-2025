import "./AnswerPanel.css";
import { useState } from "react";

export default function AnswerPanel() {
    const [isEditing, setIsEditing] = useState(false);
    const [points, setPoints] = useState(0); 
    const [popupVisible, setPopupVisible] = useState(false);
    function handleClick() {
        setIsEditing(true); 
      }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            setPoints((prevPoints) => prevPoints + 10);
            setIsEditing(false); 

            setPopupVisible(true);

            setTimeout(() => setPopupVisible(false), 3000);
        }
    }

    return(
        <div id = "answerspace">
        <div id = "answerButtons">
            <button className = "answerButton" onClick = {handleClick}>Enter your answer</button>
            <button className = "answerButton">Snap a pic!</button>
        </div>
        {popupVisible && (
                <div className="popup">
                    <p id = "popupMessage">Congratulations! <br></br>You have completed todays connect quest challenge.</p>
                </div>
            )}
            {isEditing && <input type = "text" onKeyDown={handleKeyDown} />}
            <div id = "pointsDisplay">
                <h1 className = "points">Total points</h1>
                <h1 className = "points">{points}</h1>
            </div>
        </div>
    )
}