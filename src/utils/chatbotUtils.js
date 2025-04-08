import * as Sentry from '@sentry/browser';

// Sample product information for the chatbot
const productInfo = {
    pricing: "Our product starts at $19/month for the basic plan. We also offer Premium ($49/month) and Enterprise (custom pricing) plans.",
    features: "Our main features include AI-powered analytics, real-time reporting, team collaboration tools, and unlimited storage.",
    support: "We offer 24/7 email support for all plans, and phone support for Premium and Enterprise customers.",
    trial: "Yes, we offer a 14-day free trial with no credit card required!",
    installation: "Our product is cloud-based, so there's no installation needed. Just sign up and you can access it from any browser.",
    integrations: "We integrate with popular tools like Slack, Gmail, Trello, Asana, and many more!"
};

export const getInitialMessage = () => {
    return {
        message: {
            text: "Hi there! 👋 I'm your product assistant. How can I help you today?",
            isUser: false
        },
        quickReplies: [
            "Tell me about pricing",
            "What features do you offer?",
            "How can I get support?",
            "Do you offer a free trial?"
        ]
    };
};

export const getBotResponse = async (userMessage, conversationHistory) => {
    try {
        const message = userMessage.toLowerCase();
        
        // Log user message for debugging
        console.log('User message:', message);
        
        // Simple keyword matching for demo purposes
        if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
            return {
                message: { text: productInfo.pricing, isUser: false },
                quickReplies: ["Tell me about features", "Do you have enterprise plans?", "Start free trial"]
            };
        } 
        else if (message.includes('feature') || message.includes('what can it do')) {
            return {
                message: { text: productInfo.features, isUser: false },
                quickReplies: ["Tell me about pricing", "How does support work?", "What integrations do you offer?"]
            };
        }
        else if (message.includes('support') || message.includes('help') || message.includes('customer service')) {
            return {
                message: { text: productInfo.support, isUser: false },
                quickReplies: ["What are your hours?", "Do you have live chat?", "What's included in Premium?"]
            };
        }
        else if (message.includes('trial') || message.includes('try') || message.includes('free')) {
            return {
                message: { text: productInfo.trial, isUser: false },
                quickReplies: ["How do I sign up?", "What's included in the trial?", "Tell me about pricing"]
            };
        }
        else if (message.includes('install') || message.includes('setup') || message.includes('get started')) {
            return {
                message: { text: productInfo.installation, isUser: false },
                quickReplies: ["Do you have mobile apps?", "What browsers are supported?", "How secure is it?"]
            };
        }
        else if (message.includes('integrat') || message.includes('connect') || message.includes('work with')) {
            return {
                message: { text: productInfo.integrations, isUser: false },
                quickReplies: ["Can I build custom integrations?", "Do you integrate with Salesforce?", "Tell me more about features"]
            };
        }
        else if (message.includes('thank')) {
            return {
                message: { text: "You're welcome! Is there anything else I can help you with?", isUser: false },
                quickReplies: ["Tell me about pricing", "What features do you offer?", "No thanks, I'm good"]
            };
        }
        else if (message.includes('bye') || message.includes('goodbye') || message.includes('i'm good') || message.includes("that's all")) {
            return {
                message: { text: "Thanks for chatting! Feel free to come back if you have more questions. Have a great day! 👋", isUser: false },
                quickReplies: ["Start new conversation", "Talk to human support", "Visit website"]
            };
        }
        else {
            // Default response for unrecognized inputs
            return {
                message: { 
                    text: "I'm not sure I understand. Could you try asking that in a different way, or select one of the quick replies below?", 
                    isUser: false 
                },
                quickReplies: [
                    "Tell me about pricing",
                    "What features do you offer?",
                    "How can I get support?",
                    "Do you offer a free trial?"
                ]
            };
        }
    } catch (error) {
        // Log error to Sentry with context
        Sentry.captureException(error, {
            extra: {
                userMessage,
                conversationHistory
            }
        });
        console.error("Error in chatbot response:", error);
        
        // Return a graceful error message
        return {
            message: { 
                text: "Sorry, I encountered an error processing your request. Please try again.", 
                isUser: false 
            },
            quickReplies: ["Start over", "Talk to human support"]
        };
    }
};