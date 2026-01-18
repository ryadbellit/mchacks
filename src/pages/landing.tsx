import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/pages/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleStartPracticing = () => {
    if (isAuthenticated) {
    // Get the problem id randomly after, using a mock rn
    const min = 1;
    const max = 2000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
    navigate(`/dashboard/${randomNumber}`);
  } else {
    loginWithRedirect();
  }
  };

  const handleBrowseProblems = () => {
    isAuthenticated ?
      navigate("/problems")
    : 
      loginWithRedirect();
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        {/* Badge */}
        <div className="ai-badge">
          <Sparkles size={20} />
          <span>AI-Powered Technical Interviews</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Practice Coding Interviews<br />
          with AI Interviewers
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Get real-time feedback, personalized hints, and detailed explanations from
          our AI interviewer. Master technical interviews at your own pace.
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="btn-primary" onClick={handleStartPracticing}>
            Start Practicing Interview
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary" onClick={handleBrowseProblems}>
            Browse Problems
          </button>
        </div>

        {/* Features */}
        <div className="features-list">
          <div className="feature-item">
            <CheckCircle size={20} className="check-icon" />
            <span>2000+ LeetCode Problems</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={20} className="check-icon" />
            <span>AI-Powered Hints</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={20} className="check-icon" />
            <span>Real Interview Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}