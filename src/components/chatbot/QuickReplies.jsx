import React from 'react';

const QuickReplies = ({ replies, onReplyClick }) => {
    return (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
                {replies.map((reply, index) => (
                    <button
                        key={index}
                        onClick={() => onReplyClick(reply)}
                        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        {reply}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickReplies;