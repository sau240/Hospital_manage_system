import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { text: data.reply || data.error || "No response", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Server Offline", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  // Inline Style Objects
  const styles = {
    container: {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif'
    },
    button: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#2563eb',
      border: 'none',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    },
    window: {
      position: 'absolute',
      bottom: '80px',
      right: '0',
      width: '350px',
      height: '450px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    header: {
      padding: '15px',
      backgroundColor: '#2563eb',
      color: 'white',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    messageArea: {
      flex: 1,
      padding: '15px',
      overflowY: 'auto',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '15px 15px 0 15px',
      fontSize: '14px',
      maxWidth: '80%'
    },
    botBubble: {
      alignSelf: 'flex-start',
      backgroundColor: '#e5e7eb',
      color: '#1f2937',
      padding: '8px 12px',
      borderRadius: '15px 15px 15px 0',
      fontSize: '14px',
      maxWidth: '80%'
    },
    inputArea: {
      padding: '10px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '8px'
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '20px',
      border: '1px solid #d1d5db',
      outline: 'none'
    },
    sendBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.window}>
          <div style={styles.header}>
            <span>MedSync AI</span>
            <button onClick={toggleChat} style={{background:'none', border:'none', color:'white', cursor:'pointer', fontSize:'18px'}}>✕</button>
          </div>
          
          <div style={styles.messageArea}>
            {messages.length === 0 && <div style={{textAlign:'center', color:'#9ca3af', fontSize:'12px', marginTop:'20px'}}>How can I help you today?</div>}
            {messages.map((msg, i) => (
              <div key={i} style={msg.sender === "user" ? styles.userBubble : styles.botBubble}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={styles.botBubble}>...</div>}
          </div>

          <form onSubmit={sendMessage} style={styles.inputArea}>
            <input
              style={styles.input}
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" style={styles.sendBtn}>Send</button>
          </form>
        </div>
      )}

      <button onClick={toggleChat} style={styles.button}>
        {/* Simple Text Icon instead of Image */}
        {isOpen ? "↓" : "💬"}
      </button>
    </div>
  );
};

export default Chatbot;