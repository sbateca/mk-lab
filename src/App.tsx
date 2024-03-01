import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import AdminPage from "./components/pages/AdminPage/AdminPage"
import Login from "./components/pages/Login/Login"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      
    </Router>
  )
}

export default App
