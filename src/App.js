import logo from "./logo.svg";
import "./App.css";
// import Greet from "./components/Greet";
// import Hello from "./components/Hello";
// import Message from "./components/Message";
// import MyButton from "./components/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Review from "./components/Review";
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
