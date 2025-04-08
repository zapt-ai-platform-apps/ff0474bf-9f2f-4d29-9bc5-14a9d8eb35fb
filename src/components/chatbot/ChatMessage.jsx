import React from 'react';

const ChatMessage = ({ message }) => {
    const isUser = message.isUser;
    
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 message-appear`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-sm">🤖</span>
                </div>
            )}
            <div 
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    isUser 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
                {message.text}
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2">
                    <span className="text-sm text-white">👤</span>
                </div>
            )}
        </div>
    );
};

export default ChatMessage;