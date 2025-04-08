import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() && !isSending) {
            setIsSending(true);
            await onSendMessage(message);
            setMessage('');
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
                    placeholder="Type a message..."
                    disabled={isSending}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center"
                    disabled={!message.trim() || isSending}
                >
                    <FiSend size={18} />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;