
import React from 'react';
import { Role, Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${isUser ? 'ml-3 bg-orange-600' : 'mr-3 bg-amber-700'}`}>
          {isUser ? 'U' : 'R'}
        </div>
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser 
            ? 'bg-orange-600 text-white rounded-tr-none' 
            : 'bg-white text-gray-800 border border-amber-100 rounded-tl-none'
        }`}>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
