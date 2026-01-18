import { Mic, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useScribe } from "@elevenlabs/react";
import "../css/components/chat.css";

// --- INTERFACES ---
interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    time: string;
}

interface ParsedProblem {
    main_description: string[];
    examples: {
        number: number;
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
    follow_up?: string;
}

interface ProblemData {
    question_id: string;
    title: string;
    difficulty: string;
    parsed_description: ParsedProblem;
}

interface ChatProps {
    problemData: ProblemData | null;
    problemLoading: boolean;
}

export default function Chat({problemData, problemLoading}: ChatProps) {
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

    // --- LOGIQUE ELEVENLABS SCRIBE ---
    const scribe = useScribe({
        modelId: "scribe_v2_realtime",
        onPartialTranscript: (data: { text: string }) => {
            // Optionnel : console log pour debug
            console.log("Transcription en cours:", data.text);
        },
        onCommittedTranscript: async (data: { text: string }) => {
            console.log("Transcription validée :", data.text);
            await handleProcessAI(data.text);
        },
    });

    // Auto-scroll des messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    // --- LOGIQUE D'ENVOI (BACKEND FLASK) ---
    const handleProcessAI = async (text: string) => {
        if (!text.trim() || isLoading) return;

        setIsLoading(true);
        const userMessage: Message = {
            id: Date.now(),
            text: text,
            sender: "user",
            time: getCurrentTime()
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('http://localhost:5000/process-transcript', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    transcript: text,
                    problemTitle: problemData?.title 
                }),
            });
            
            const data = await response.json();

            const botMessage: Message = {
                id: Date.now() + 1,
                text: data.response,
                sender: "bot",
                time: getCurrentTime()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error AI process:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting to the server.",
                sender: "bot",
                time: getCurrentTime()
            }]);
        } finally {
            setIsLoading(false);
            setInputValue(""); // On vide l'input après traitement
        }
    };

    const toggleMic = async () => {
        try {
            if (scribe.isConnected) {
                scribe.commit();
                setTimeout(() => scribe.disconnect(), 300);
            } else {
                const response = await fetch("http://localhost:5000/scribe-token");
                const data = await response.json();
                if (data.token) {
                    await scribe.connect({ 
                        token: data.token,
                        microphone: { echoCancellation: true, noiseSuppression: true }
                    });
                }
            }
        } catch (error) {
            console.error("Mic error:", error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleProcessAI(inputValue);
        }
    };

    return (
        <div id="chat-container">
            <div id="chat-tabs">
                <div className={`tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
                    AI Interviewer
                </div>
                <div className={`tab ${activeTab === "problem" ? "active" : ""}`} onClick={() => setActiveTab("problem")}>
                    Problem Description
                </div>
            </div>

            {activeTab === "chat" && (
                <>
                    <div id="chat-messages">
                        <div id="chat-header">
                            <div id="avatar">🤖</div>
                            <div>
                                <div id="chat-title">AI Interviewer</div>
                                <div id="chat-status">
                                    {scribe.isConnected ? "● Recording..." : isLoading ? "● Thinking..." : "● Active"}
                                </div>
                            </div>
                        </div>

                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                <span className="time">{msg.time}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div id="chat-input">
                        <button 
                            id="mic-btn" 
                            onClick={toggleMic} 
                            disabled={isLoading}
                            className={scribe.isConnected ? "active-mic" : ""}
                            style={{ color: scribe.isConnected ? "#f44336" : "inherit" }}
                        >
                            <Mic size={20} />
                        </button>
                        
                        <input 
                            placeholder={scribe.isConnected ? "Listening..." : "Type your message..."} 
                            value={scribe.isConnected ? scribe.partialTranscript : inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />

                        <button 
                            id="send-btn" 
                            onClick={() => handleProcessAI(inputValue)} 
                            disabled={isLoading || (!inputValue.trim() && !scribe.isConnected)}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </>
            )}

            {activeTab === "problem" && (
                <div id="problem-description">
                    {problemLoading ? (
                        <p>Loading problem description...</p>
                    ) : problemData ? (
                        <>
                            <h2>{problemData.question_id}. {problemData.title}</h2>
                            <div className={`difficulty ${problemData.difficulty.toLowerCase()}`}>
                                {problemData.difficulty}
                            </div>
                            <div className="problem-section">
                                {problemData.parsed_description.main_description.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                            {problemData.parsed_description.examples.map((ex, i) => (
                                <div key={i} className="problem-section">
                                    <h3>Example {ex.number}:</h3>
                                    <div className="example">
                                        <div><strong>Input:</strong> {ex.input}</div>
                                        <div><strong>Output:</strong> {ex.output}</div>
                                        {ex.explanation && <div><strong>Explanation:</strong> {ex.explanation}</div>}
                                    </div>
                                </div>
                            ))}
                            {problemData.parsed_description.constraints.length > 0 && (
                                <div className="problem-section">
                                    <h3>Constraints:</h3>
                                    <ul>
                                        {problemData.parsed_description.constraints.map((c, i) => (
                                            <li key={i} dangerouslySetInnerHTML={{ __html: `<code>${c}</code>` }} />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No problem data available.</p>
                    )}
                </div>
            )}
        </div>
    );
}