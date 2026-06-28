import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";
import Api from "../../Api";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Bot, Plane } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! 👋 I'm your Destinova travel assistant. Ask me anything about destinations, packages, or trip planning!" }
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post(Api.FETCH_CHATBOT, { text: userText }, { timeout: 20000 });
      const reply = res.data.reply || "No response 🤖";
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      const errorMsg = err.code === "ECONNABORTED"
        ? "Server is a bit slow ⏳ — please try again."
        : "Something went wrong 😢 — please try again.";
      setMessages(prev => [...prev, { sender: "bot", text: errorMsg }]);
    } finally {
      setTyping(false);
    }
  };

  const QUICK = ["Top destinations", "Budget packages", "Best time to visit", "Kerala packages"];

  return (
    <>
      {/* Float toggle button */}
      {!isOpen && (
        <button className="cb-toggle" onClick={() => setIsOpen(true)} aria-label="Open chat">
          <MessageCircle size={22} />
          <span className="cb-toggle__dot" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="cb-window">

          {/* Header */}
          <div className="cb-header">
            <div className="cb-header__left">
              <div className="cb-avatar"><Plane size={16} /></div>
              <div>
                <p className="cb-header__name">Destinova Assistant</p>
                <p className="cb-header__status"><span className="cb-online" /> Online</p>
              </div>
            </div>
            <button className="cb-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-body">
            {messages.map((msg, i) => (
              <div key={i} className={`cb-msg cb-msg--${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="cb-msg__avatar"><Bot size={13} /></div>
                )}
                <div className="cb-msg__bubble">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="cb-msg cb-msg--bot">
                <div className="cb-msg__avatar"><Bot size={13} /></div>
                <div className="cb-msg__bubble cb-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="cb-quick">
              {QUICK.map((q, i) => (
                <button key={i} className="cb-quick__btn"
                  onClick={() => { setInput(q); }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="cb-input">
            <input
              type="text"
              placeholder="Ask about travel…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button className="cb-send" onClick={sendMessage} disabled={!input.trim()} aria-label="Send">
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;