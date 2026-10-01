import React, { useState, useEffect, useRef } from 'react';
import {
  matchUserQuery,
  MatchResult,
} from '../../utils/chatbotMatcher';
import {
  INITIAL_SUGGESTED_QUESTIONS,
  DDS_PHONE_DISPLAY,
} from '../../data/chatbotFaqData';
import { WhatsAppCtaButton } from './WhatsAppCtaButton';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  matchResult?: MatchResult;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: 
        '👋 **Welcome to DDS Expo!**\n\n' +
        'I am your instant AI-style virtual assistant. I can answer your questions about our **Lead Gen Ad Plans**, **Monthly SMM (₹6,500)**, **Branding Kits**, **Flyer Designs (₹300)**, **Web Development**, and **Paid Internships**.\n\n' +
        'How can I help you today?',
      timestamp: formatTime(new Date()),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when new message is added or bot starts typing
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputValue;
    const query = rawText.trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural AI-style typing delay (350-450ms)
    setTimeout(() => {
      const match = matchUserQuery(query);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: match.answerText,
        timestamp: formatTime(new Date()),
        matchResult: match,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text:
          '👋 **Conversation reset.**\n\n' +
          'How can I help you? Feel free to ask about our ad plans, design pricing, or web development packages.',
        timestamp: formatTime(new Date()),
      },
    ]);
  };

  // Helper to render bold text and bullet points cleanly
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-sm">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format bullet points
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('- ');
          const lineContent = isBullet ? line.replace(/^(\s*[•\-]\s*)/, '') : line;

          // Simple bold parser
          const parts = lineContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);

          return (
            <div
              key={idx}
              className={isBullet ? 'flex items-start gap-1.5 pl-1 text-slate-700' : 'text-slate-800'}
            >
              {isBullet && <span className="text-blue-600 font-bold shrink-0">•</span>}
              <span>
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-semibold text-slate-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  if (part.startsWith('*') && part.endsWith('*')) {
                    return (
                      <em key={pIdx} className="text-slate-600 italic">
                        {part.slice(1, -1)}
                      </em>
                    );
                  }
                  return part;
                })}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <aside aria-label="Customer Support Assistant" className="fixed z-[1045] bottom-6 right-6">
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#012970] via-[#1a3a8f] to-[#4154f1] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
        aria-label={isOpen ? 'Close DDS Expo Assistant' : 'Open DDS Expo Assistant'}
        title="Chat with DDS Expo Assistant"
      >
        {/* Soft pulse glow when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-blue-500 opacity-40 animate-ping pointer-events-none" />
        )}

        {/* Online Status Green Pip */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10" />

        {isOpen ? (
          <i className="bi bi-x-lg text-2xl transition-transform duration-200"></i>
        ) : (
          <div className="flex items-center justify-center">
            <i className="bi bi-chat-dots-fill text-2xl"></i>
          </div>
        )}

        {/* Tooltip on hover when closed */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none animate-fadeIn">
            <span>Ask DDS Expo Bot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
        )}
      </button>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[395px] max-h-[82vh] h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden z-[1045] animate-scaleUp transition-all"
          style={{
            boxShadow: '0 20px 45px -10px rgba(1, 41, 112, 0.25), 0 8px 16px -6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#012970] via-[#093582] to-[#194297] text-white flex items-center justify-between shadow-sm select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-inner">
                <i className="bi bi-robot text-lg"></i>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#012970] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide leading-tight m-0">
                    DDS Expo Assistant
                  </h3>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded-full border border-emerald-400/30">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/80 leading-none mt-0.5 mb-0">
                  Instant Verified FAQ • Zero Latency
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <i className="bi bi-arrow-counterclockwise text-sm"></i>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Minimize Chat"
                aria-label="Minimize Chat"
              >
                <i className="bi bi-dash-lg text-base"></i>
              </button>
            </div>
          </div>

          {/* Quick Info Ribbon */}
          <div className="px-3.5 py-1.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <i className="bi bi-shield-check text-blue-600"></i>
              Official verified knowledge base
            </span>
            <a
              href={`tel:${DDS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="text-blue-600 hover:underline font-medium text-decoration-none"
            >
              Call: {DDS_PHONE_DISPLAY}
            </a>
          </div>

          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
            {/* Suggested Chips Carousel at top */}
            <div className="pb-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {INITIAL_SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 px-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-200 transition-all duration-150 shadow-xs cursor-pointer active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const match = msg.matchResult;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1 animate-fadeIn`}
                >
                  <div className="flex items-end gap-2 max-w-[90%]">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mb-1 shadow-xs">
                        <i className="bi bi-robot"></i>
                      </div>
                    )}

                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm shadow-xs ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="m-0 leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>
                  </div>

                  {/* Message Timestamp */}
                  <span className={`text-[10px] text-slate-400 px-1 ${isUser ? 'mr-1' : 'ml-9'}`}>
                    {msg.timestamp}
                  </span>

                  {/* Bot Extra: WhatsApp CTA Button if flagged */}
                  {!isUser && match?.showWhatsAppButton && (
                    <div className="ml-9 mt-1.5 w-[85%] max-w-[280px]">
                      <WhatsAppCtaButton
                        message={match.whatsappMessage}
                        label={match.whatsappButtonLabel}
                      />
                    </div>
                  )}

                  {/* Follow-up question chips */}
                  {!isUser && match?.suggestedFollowUps && match.suggestedFollowUps.length > 0 && (
                    <div className="ml-9 mt-2 flex flex-wrap gap-1">
                      {match.suggestedFollowUps.map((followUp, fIdx) => (
                        <button
                          key={fIdx}
                          type="button"
                          onClick={() => handleSendMessage(followUp)}
                          className="text-[11px] bg-slate-100 text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
                        >
                          ↳ {followUp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 ml-1 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <i className="bi bi-robot"></i>
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Area */}
          <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about pricing, ad plans, jobs..."
                className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                disabled={isTyping}
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className={`p-2.5 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer ${
                  inputValue.trim() && !isTyping
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed opacity-60'
                }`}
                title="Send Message"
                aria-label="Send Message"
              >
                <i className="bi bi-send-fill text-sm"></i>
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Local FAQ Engine • No API Key required</span>
              <a
                href="https://wa.me/919966994679?text=Hi%20DDS%20Expo,%20I%20want%20to%20talk%20to%20an%20expert."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 text-decoration-none"
              >
                <i className="bi bi-whatsapp"></i>
                <span>Talk to Expert</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
