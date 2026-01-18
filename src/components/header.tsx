import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Play, Send, LogIn, UserPlus } from "lucide-react";
import "../css/components/header.css";


export default function Header() {

    const isConnected = false; // TODO: replace with actual auth logic
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToMenu = () => {
        navigate("/");
    }

    return (
        <header id="app-header">
            {/* Left */}
            <div id="header-left" onClick={navigateToMenu}>
                <div id="logo">AI</div>
                <span id="title">AI Interview Platform</span>
            </div>


            {/* Center */}
            <div id="header-center">
                { location.pathname === "/dashboard" ? (
                    <>  
                        <button className="run-btn btn">
                            <Play size={16} /> Run
                        </button>
                        <button className="submit-btn btn">
                            <Send size={16} /> Submit
                        </button> 
                    </>) : ( <h2>Practice for your next interview !</h2> )
                }
                
            </div>


            {/* Right */}
            <div id="header-right">
                {isConnected ? (
                    <>
                        <span>username</span>
                        <button className="menu-btn btn"> 
                            <Menu size={16} />
                        </button>
                    </> 
                )
                : ( 
                    <>
                        <button className="signin-btn btn">
                            <LogIn size={18} />
                            <span>Sign In</span>
                        </button>

                        <button className="signup-btn btn">
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}




