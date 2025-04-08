import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';
import { getInitialMessage, getBotResponse } from '../../utils/chatbotUtils';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [quickReplies, setQuickReplies] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize chat with welcome message
    useEffect(() => {
        const initialResponse = getInitialMessage();
        setMessages([initialResponse.message]);
        setQuickReplies(initialResponse.quickReplies);
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;
        
        // Add user message to chat
        const newMessages = [...messages, { text, isUser: true }];
        setMessages(newMessages);
        setQuickReplies([]); // Clear quick replies when user sends a message
        
        // Simulate bot thinking
        setIsTyping(true);
        
        setTimeout(async () => {
            // Get bot response
            const response = await getBotResponse(text, messages);
            
            // Add bot response to chat
            setMessages([...newMessages, response.message]);
            setQuickReplies(response.quickReplies || []);
            setIsTyping(false);
        }, 1000); // Simulate typing delay
    };

    const handleQuickReplyClick = (reply) => {
        handleSendMessage(reply);
    };

    return (
        <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 chat-container">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
                {isTyping && (
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm">🤖</span>
                        </div>
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            {quickReplies.length > 0 && (
                <QuickReplies replies={quickReplies} onReplyClick={handleQuickReplyClick} />
            )}
            
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chatbot;