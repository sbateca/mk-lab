import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import {CookiesProvider} from "./Context/Cookie/CookieContext";
import AdminPage from "./Components/Pages/AdminPage/AdminPage";
import LoginPage from "./Components/Pages/Login/Login";
import "./App.css";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
