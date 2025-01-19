import { useNavigate } from "react-router-dom";

export default function ButtonHeader() {
    const navigate = useNavigate();

    const handleChallengeClick = () => {
      navigate("/daily");
    };

    const handleListClick = () => {
        navigate("/challenges");
      };
    return(
        <div id = "headerButtons">
            <button className = "headerbutton" onClick= {handleListClick}>Challenge List</button>
            <button className = "headerbutton" onClick= {handleChallengeClick}>Today's Challenge</button>
        </div>
    )
}