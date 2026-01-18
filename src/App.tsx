import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard';
import LandingPage from './pages/landing';
import Home from './pages/login';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App