import LogIn from "./Components/LogIn.jsx";
import logo from "./assets/connect-logo.png"
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <img id = "logo" src={logo} alt="app logo" />
      <h1 id = "title">Connect Quest</h1>
      <LogIn/>
    </div>
  );
}

