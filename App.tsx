
import React, { useState, useRef, useEffect } from 'react';
import { Role, Message } from './types';
import { geminiService } from './geminiService';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import MapView from './components/MapView'; // Import the new MapView component

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      text: "Namaste. I am your guide to the Ramayana Trail—a spiritual journey tracing the footsteps of Lord Rama across India, Nepal, and Sri Lanka. How can I assist you on your pilgrimage today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapView, setIsMapView] = useState(false); // New state for map view toggle
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && !isMapView) { // Only scroll when in chat view
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMapView]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: Role.USER, text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Initial model message for streaming
    const placeholderMsg: Message = { role: Role.MODEL, text: '' };
    setMessages(prev => [...prev, placeholderMsg]);

    try {
      let fullResponse = '';
      const stream = geminiService.sendMessageStream(messages, text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: Role.MODEL, 
            text: fullResponse 
          };
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: Role.MODEL, 
          text: "I apologize, but I encountered an error while retrieving that information. Please try again." 
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    if (isSidebarOpen) setIsSidebarOpen(false);
    if (isMapView) setIsMapView(false); // Switch to chat view if action from map
    handleSendMessage(text);
  };

  return (
    <div className="flex h-screen w-full bg-[#fdfaf6] text-gray-900 overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onSelectStop={handleQuickAction} />
      </aside>

      {/* Main Content Area (Chat or Map) */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-amber-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-amber-50 rounded-lg text-amber-800"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🏹</span>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-amber-900 tracking-tight">Ramayana Trail Explorer</h1>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest hidden md:block">Divine Journey AI Assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-bold">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              GEMINI PRO POWERED
            </div>
            {/* Map/Chat Toggle Button */}
            <button
              onClick={() => setIsMapView(!isMapView)}
              className="p-2 ml-2 hover:bg-amber-50 rounded-lg text-amber-800 flex items-center gap-2"
              aria-label={isMapView ? "Switch to chat view" : "Switch to map view"}
            >
              {isMapView ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.76-1.39A7.995 7.995 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm6 0h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Chat</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Map</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Conditional rendering for Chat or Map */}
        {isMapView ? (
          <div className="flex-1 w-full h-full relative">
            <MapView onSelectStop={handleQuickAction} />
          </div>
        ) : (
          <>
            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 custom-scrollbar"
            >
              <div className="max-w-4xl mx-auto">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg} />
                ))}
                {isLoading && messages[messages.length-1].text === '' && (
                  <div className="flex justify-start mb-6">
                    <div className="flex items-center gap-2 text-amber-700 italic text-sm">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span>Recalling the Epic...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t border-amber-100">
              <div className="max-w-4xl mx-auto relative">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                  className="flex items-center gap-3"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about Ayodhya, Kishkindha, or Rameswaram..."
                      className="w-full pl-5 pr-12 py-4 bg-amber-50 border border-amber-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm shadow-inner"
                      disabled={isLoading}
                      aria-label="Chat input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-4 saffron-gradient text-white rounded-2xl shadow-lg hover:shadow-orange-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    aria-label="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </form>
                <p className="text-[10px] text-center text-amber-700 mt-3 opacity-60">
                  Explore the 15 primary destinations and 248 identified sites of the Ram Van Gaman Path.
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default App;
