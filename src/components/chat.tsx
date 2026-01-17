// Chat.tsx
import { Mic, Send } from "lucide-react";
import { useState } from "react";
import "../css/components/chat.css";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "bot",
    text: "Great! I've loaded a problem for you. Take a moment to read through it, and feel free to ask me any clarifying questions before you start coding.",
    time: "10:31 AM"
  },
  {
    id: 2,
    sender: "user",
    text: "Can I use a hash map for this problem?",
    time: "10:33 AM"
  },
  {
    id: 3,
    sender: "bot",
    text: "Yes, absolutely! A hash map would be an excellent choice for this problem. It can help you achieve O(n) time complexity. Go ahead and implement your solution.",
    time: "10:33 AM"
  },
  {
    id: 4,
    sender: "bot",
    text: "Great! I've loaded a problem for you. Take a moment to read through it, and feel free to ask me any clarifying questions before you start coding.",
    time: "10:31 AM"
  },
  {
    id: 4,
    sender: "bot",
    text: "Great! I've loaded a problem for you. Take a moment to read through it, and feel free to ask me any clarifying questions before you start coding.",
    time: "10:31 AM"
  },
  {
    id: 5,
    sender: "user",
    text: "Can I use a hash map for this problem?",
    time: "10:33 AM"
  },
  {
    id: 6,
    sender: "bot",
    text: "Yes, absolutely! A hash map would be an excellent choice for this problem. It can help you achieve O(n) time complexity. Go ahead and implement your solution.",
    time: "10:33 AM"
  },
  {
    id: 7,
    sender: "user",
    text: "Should I return the indices or the actual values?",
    time: "10:34 AM"
  },
  {
    id: 8,
    sender: "bot",
    text: "Great question! You should return the **indices** of the two numbers that add up to the target. The problem assumes exactly one valid solution exists.",
    time: "10:34 AM"
  },
  {
    id: 9,
    sender: "user",
    text: "Got it, starting now!",
    time: "10:35 AM"
  }
];

export default function Chat() {
    const [activeTab, setActiveTab] = useState<"chat" | "problem">("chat");

    return (
        <div id="chat-container">
            {/* Tabs */}
            <div id="chat-tabs">
                <div 
                    className={`tab ${activeTab === "chat" ? "active" : ""}`}
                    onClick={() => setActiveTab("chat")}
                >
                    AI Interviewer
                </div>
                <div 
                    className={`tab ${activeTab === "problem" ? "active" : ""}`}
                    onClick={() => setActiveTab("problem")}
                >
                    Problem Description
                </div>
            </div>


            {/* Chat View */}
            {activeTab === "chat" && (
                <>
                    {/* Messages */}
                    <div id="chat-messages">
                        {/* Header */}
                        <div id="chat-header">
                            <div id="avatar">🤖</div>
                            <div>
                                <div id="chat-title">AI Interviewer</div>
                                <div id="chat-status">● Active</div>
                            </div>
                        </div>

                        {
                            mockMessages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <p>{msg.text}</p>
                                    <span className="time">{msg.time}</span>
                                </div>
                            ))
                        }
                    </div>

                    {/* Input */}
                    <div id="chat-input">
                        <button id="mic-btn"><Mic size={20} /></button>
                        <input placeholder="Type your message or ask a question" />
                        <button id="send-btn"><Send size={20} /></button>
                    </div>
                </>
            )}

            {/* Problem Description View */}
            {activeTab === "problem" && (
                <div id="problem-description">
                    <h2>1. Two Sum</h2>
                    
                    <div className="difficulty easy">Easy</div>
                    
                    <div className="problem-section">
                        <p>
                            Given an array of integers <code>nums</code> and an integer <code>target</code>, 
                            return <em>indices of the two numbers such that they add up to <code>target</code></em>.
                        </p>
                        <p>
                            You may assume that each input would have <strong>exactly one solution</strong>, 
                            and you may not use the same element twice.
                        </p>
                        <p>You can return the answer in any order.</p>
                    </div>

                    <div className="problem-section">
                        <h3>Example 1:</h3>
                        <div className="example">
                            <div><strong>Input:</strong> nums = [2,7,11,15], target = 9</div>
                            <div><strong>Output:</strong> [0,1]</div>
                            <div><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                        </div>
                    </div>

                    <div className="problem-section">
                        <h3>Example 2:</h3>
                        <div className="example">
                            <div><strong>Input:</strong> nums = [3,2,4], target = 6</div>
                            <div><strong>Output:</strong> [1,2]</div>
                        </div>
                    </div>

                    <div className="problem-section">
                        <h3>Example 3:</h3>
                        <div className="example">
                            <div><strong>Input:</strong> nums = [3,3], target = 6</div>
                            <div><strong>Output:</strong> [0,1]</div>
                        </div>
                    </div>

                    <div className="problem-section">
                        <h3>Constraints:</h3>
                        <ul>
                            <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                            <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                            <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                            <li><strong>Only one valid answer exists.</strong></li>
                        </ul>
                    </div>

                    <div className="problem-section">
                        <h3>Follow-up:</h3>
                        <p>Can you come up with an algorithm that is less than O(n<sup>2</sup>) time complexity?</p>
                    </div>
                </div>
            )}
        </div>
    );
}