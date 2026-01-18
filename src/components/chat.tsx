// Chat.tsx
import { Mic, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "../css/components/chat.css";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    time: string;
}

export default function Chat() {
    const [activeTab, setActiveTab] = useState<"chat" | "problem">("chat");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "bot",
            text: "Great! I've loaded a problem for you. Take a moment to read through it, and feel free to ask me any clarifying questions before you start coding.",
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: "user",
            time: getCurrentTime()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/scribe-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputValue }),
            });
            const data = await response.json();

            // Add bot message
            const botMessage: Message = {
                id: Date.now() + 1,
                text: data.response,
                sender: "bot",
                time: getCurrentTime()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);

            // Fallback message
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I apologize, but I'm having trouble responding right now. Please try again.",
                sender: "bot",
                time: getCurrentTime()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

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

                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                <span className="time">{msg.time}</span>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message bot">
                                <p>Thinking...</p>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div id="chat-input">
                        <button id="mic-btn" disabled={isLoading}>
                            <Mic size={20} />
                        </button>
                        <input
                            placeholder="Type your message or ask a question"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button
                            id="send-btn"
                            onClick={sendMessage}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            <Send size={20} />
                        </button>
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