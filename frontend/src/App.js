import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Controller from "./components/Controller";
import LeaderBoard from "./components/LeaderBoard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderBoard/>} />
        <Route path="/controller/:id" element={<Controller/>} />
      </Routes>
    </Router>
  );
}

export default App;
