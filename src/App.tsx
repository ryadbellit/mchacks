import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard';
import LandingPage from './pages/landing';
import ProblemsPage from './pages/problems';
import Header from './components/header';
import { TestPanelProvider } from './context/TestPanelContext';

function App() {

  
  return (
    <TestPanelProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/:problemId" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Routes>
      </Router>
    </TestPanelProvider>
  );
}

export default App