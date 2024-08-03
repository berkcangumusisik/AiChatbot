import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ChatUI.css';

const BASE_URL = "http://localhost:3002";

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = { role: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/generate`, { prompt: inputValue });
      const assistantMessage: Message = { role: 'assistant', content: response.data.message };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const style = {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 10 + 5}s`,
      };
      particles.push(<div className="particle" style={style} key={i}></div>);
    }
    return particles;
  };

  return (
    <div className="chat-interface">
      <div className="background-animation"></div>
      {createParticles()}
      <header className="chat-header">
        <Link to="/" className="logo">AI Asistan</Link>
        <h1>AI Asistan ile Sohbet</h1>
        <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
      </header>

      <main className="chat-main">
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`message ${message.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {message.content}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div className="message assistant loading">
                <div className="loading-dots">
                  <div></div><div></div><div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="chat-footer">
        <div className="input-area">
          <input
            type="text"
            className="prompt-input"
            placeholder="Mesajınızı yazın..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <motion.button
            className="send-button"
            onClick={handleSendMessage}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gönder
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default ChatUI;
