import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Admin from "./components/pages/Admin/Admin";
import LoginPage from "./components/pages/Login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
