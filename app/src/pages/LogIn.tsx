import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// import "./LogIn.css";


function LogInPage() {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/challenges");
  };

  return (
    <div id="logInDiv">
      <h1 id = "title">Connect Quest</h1>
      <Input type="email" placeholder="Email"/>
      <Input type="password" placeholder="Password"/>
      <Button onClick={handleLogInClick} >Log in</Button>
      {/* <Button >Sign up</Button> */}
    </div>
  );
}

export default LogInPage;