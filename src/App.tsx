import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import {CookiesProvider} from "./context/Cookie/CookieContext";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import LoginPage from "./components/pages/Login/Login";
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
