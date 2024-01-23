import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Controller from "./components/Controller";
import LeaderBoard from "./components/LeaderBoard";


function App() {
  const ipaddress = "192.168.182.191";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderBoard ipaddress={ipaddress}/>} />
        <Route path="/controller/:id" element={<Controller ipaddress={ipaddress}/>} />
      </Routes>
    </Router>
  );
}

export default App;
