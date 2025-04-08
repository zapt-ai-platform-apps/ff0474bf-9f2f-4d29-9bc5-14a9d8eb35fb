import React from 'react';
import Chatbot from './components/chatbot/Chatbot';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Product Assistant</h1>
                <Chatbot />
                <div className="text-xs text-center mt-4">
                    <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Made on ZAPT
                    </a>
                </div>
            </div>
        </div>
    );
}