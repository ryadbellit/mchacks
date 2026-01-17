// Header.tsx
import { Play, Send } from "lucide-react";
import "../css/components/header.css";


export default function Header() {
    return (
        <header id="app-header">
            {/* Left */}
            <div id="header-left">
                <div id="logo">AI</div>
                <span id="title">AI Interview Platform</span>
            </div>


            {/* Center */}
            <div id="header-center">
                <button id="run-btn">
                    <Play size={16} /> Run
                </button>
                <button id="submit-btn">
                    <Send size={16} /> Submit
                </button>
            </div>


            {/* Right */}
            <div id="header-right">
                <button id="signin-btn">Sign in</button>
                <button id="signup-btn">Sign up</button>
            </div>
        </header>
    );
}




