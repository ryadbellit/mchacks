import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Send, LogIn, UserPlus } from "lucide-react";
import RunButton from '../components/RunButton'
import "../css/components/header.css";

export default function Header() {
    const isConnected = false; // TODO: replace with actual auth logic
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToMenu = () => {
        navigate("/");
    }

    const isDashboard = location.pathname === "/dashboard";

    return (
        <header id="app-header">
            {/* Left */}
            <div id="header-left" onClick={navigateToMenu}>
                <div id="logo">AI</div>
                <span id="title">AI Interview Platform</span>
            </div>

            {/* Center */}
            <div id="header-center">
                {isDashboard ? (
                    <div className="action-buttons">
                        <RunButton/>
                        <button className="submit-btn btn">
                            <Send size={16} /> Submit
                        </button>
                    </div>
                ) : (
                    <h2 className="header-tagline">Practice for your next interview!</h2>
                )}
            </div>

            {/* Right */}
            <div id="header-right">
                {isConnected ? (
                    <>
                        <span className="username">username</span>
                        <button className="menu-btn btn" aria-label="Menu"> 
                            <Menu size={20} />
                        </button>
                    </> 
                ) : ( 
                    <div className="auth-buttons">
                        <button className="signin-btn btn">
                            <LogIn size={18} />
                            <span>Sign In</span>
                        </button>
                        <button className="signup-btn btn">
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}