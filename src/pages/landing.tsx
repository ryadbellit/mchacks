import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import "../css/pages/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStartPracticing = () => {
    navigate("/dashboard");
  };

  const handleBrowseProblems = () => {
    navigate("/problems");
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
            Start Practicing Free
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
            <span>500+ Problems</span>
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