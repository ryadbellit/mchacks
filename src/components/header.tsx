import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Send, LogIn, UserPlus } from "lucide-react";
import RunButton from '../components/RunButton'
import "../css/components/header.css";
import logo from '../../logo.png';

export default function Header() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToMenu = () => {
        navigate("/");
    }

    const isDashboard = location.pathname.includes("/dashboard/");

    return (
        <header id="app-header">
            {/* Left */}
            <div id="header-left" onClick={navigateToMenu}>
                <img src={logo} alt="Logo" id="logo-img"/>
                <span id="title">PrepCode</span>
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
                {isAuthenticated ? (
                    <>
                        <span className="username">{user?.nickname || user?.email}</span>
                        <button className="menu-btn btn" aria-label="Menu" onClick={()=>logout({ 
                            logoutParams: {
                                returnTo: window.location.origin 
                            }
                        })}
                        > 
                            <LogIn size={20} />
                        </button>
                    </> 
                ) : ( 
                    <div className="auth-buttons">
                        <button className="signup-btn btn" onClick={()=>loginWithRedirect()}>
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}