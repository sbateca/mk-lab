import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import {CookiesProvider} from "./Context/Cookie/CookieContext";
import Admin from "./Components/Pages/Admin/Admin";
import LoginPage from "./Components/Pages/Login/Login";
import "./App.css";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
