import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Context } from './Context/Context.jsx';
import CandleChart from './Components/CandleChart';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

function App() {


  return (
    <div className="App h-[100vh] w-[100vw]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
