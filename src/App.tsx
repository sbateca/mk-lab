import { BrowserRouter as Router } from "react-router-dom"

import MainPage from "./components/pages/MainPage/MainPage"
import "./App.css"

function App() {
  return (
    <Router>
      <MainPage />
    </Router>
  )
}

export default App
