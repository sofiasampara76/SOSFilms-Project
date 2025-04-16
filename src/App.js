import logo from "./logo.svg";
import "./App.css";
// import Greet from "./components/Greet";
// import Hello from "./components/Hello";
// import Message from "./components/Message";
// import MyButton from "./components/Button";
import MainPage from "./components/MainPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <MainPage />
    // </div>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<MainPage />} />
       {/* <Route path="/details/:title" element={<DetailsPage />} /> */}
     </Routes>
   </BrowserRouter>
  );
}

export default App;
