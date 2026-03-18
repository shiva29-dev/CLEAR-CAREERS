import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Hash, Users, Menu, X } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  hubId: string;
  text: string;
  user: string;
  timestamp: number;
  isSelf?: boolean;
}

const HUBS = [
  { id: 'software-engineering', name: 'Software Engineering', members: 1240 },
  { id: 'ux-design', name: 'UX Design', members: 892 },
  { id: 'product-management', name: 'Product Management', members: 650 },
  { id: 'data-science', name: 'Data Science', members: 430 },
];

export default function Community() {
  const [activeHub, setActiveHub] = useState(HUBS[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = 'Jane Doe'; // Simulated logged-in user

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, { ...message, isSelf: message.user === currentUser }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join_hub', activeHub);
      
      // Clear messages and add a welcome message when switching hubs
      setMessages([
        {
          id: 'welcome',
          hubId: activeHub,
          text: `Welcome to the ${HUBS.find(h => h.id === activeHub)?.name} hub! Connect with others exploring this path.`,
          user: 'System',
          timestamp: Date.now(),
          isSelf: false
        }
      ]);
    }
  }, [activeHub, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    const newMessage = {
      id: Math.random().toString(36).substring(7),
      hubId: activeHub,
      text: inputText,
      user: currentUser,
      timestamp: Date.now(),
    };

    socket.emit('send_message', newMessage);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-blue-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-slate-400" />
          {HUBS.find(h => h.id === activeHub)?.name}
        </h2>
        <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-slate-600 dark:text-slate-300">
          {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Hubs Sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:relative z-20 w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 transition-transform duration-300`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 hidden md:block">
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            Career Hubs
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Connect with peers exploring the same paths.</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {HUBS.map(hub => (
            <button
              key={hub.id}
              onClick={() => {
                setActiveHub(hub.id);
                setShowSidebar(false);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeHub === hub.id 
                  ? 'bg-brand-50 dark:bg-brand-900/30 border-2 border-brand-500 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeHub === hub.id ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  <Hash className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className={`font-bold ${activeHub === hub.id ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {hub.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{hub.members} explorers</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-blue-50/50 dark:bg-slate-950/50 relative">
        {/* Chat Header (Desktop) */}
        <div className="hidden md:flex p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-slate-400" />
              {HUBS.find(h => h.id === activeHub)?.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Live discussion</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
            >
              {msg.user !== 'System' && (
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 px-1">{msg.user}</span>
              )}
              <div className={`max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl ${
                msg.user === 'System' 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-center text-center text-sm font-medium w-full'
                  : msg.isSelf 
                    ? 'bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/20' 
                    : 'bg-brand-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
              {msg.user !== 'System' && (
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full pl-4 md:pl-6 pr-14 md:pr-16 py-3 md:py-4 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-0 outline-none transition-all text-slate-900 dark:text-white text-sm md:text-base"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
            >
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
