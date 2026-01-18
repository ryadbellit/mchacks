import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import ProblemsPage from './pages/problems';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:problemId" element={<Dashboard />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App