import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from 'react-icons/fa';
import { askGemini } from '../services/geminiService';

const Chatbot = ({ paperId, paperTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: `Welcome! I'm your research assistant. Ask me anything about "${paperTitle}".` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await askGemini(paperId, input);
      setMessages(prev => [...prev, { role: 'system', content: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setError("Failed to get a response. Please try again.");
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: "I'm sorry, I couldn't process your request at this time. Please try asking in a different way." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-500/30 transition-all z-50"
      >
        {isOpen ? <FaTimes size={18} /> : <FaRobot size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-800 border border-indigo-800/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-indigo-900/80 p-4 border-b border-indigo-800/40">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-blue-300" />
              <h3 className="text-white font-medium">Research Assistant</h3>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-900/50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  chat-message max-w-[80%] rounded-2xl py-2 px-4 
                  ${message.role === 'user' 
                    ? 'bg-blue-700 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-gray-200 rounded-tl-none'
                  }
                `}>
                  <div className="flex items-center mb-1 text-xs opacity-70">
                    {message.role === 'user' ? (
                      <>
                        <span>You</span>
                        <FaUser className="ml-1" size={10} />
                      </>
                    ) : (
                      <>
                        <FaRobot className="mr-1" size={10} />
                        <span>Assistant</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-200 max-w-[80%] rounded-2xl rounded-tl-none py-2 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-900/20 text-red-200 p-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="bg-slate-800 border-t border-indigo-800/40 p-3">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about this research..."
                className="flex-grow py-2 px-4 bg-slate-700 text-white rounded-l-lg focus:outline-none border-y border-l border-indigo-600/30"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 rounded-r-lg flex items-center justify-center transition"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
