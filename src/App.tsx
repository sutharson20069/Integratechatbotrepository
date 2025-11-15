import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { QuickReplies } from './components/QuickReplies';
import { CosmicBackground } from './components/CosmicBackground';
import { generateBotResponse, generateCodingResponse } from './utils/chatbot';
import { getAIResponse, analyzeImage } from './utils/aiService';
import { Bot, Trash2, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  imageUrl?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! 👋 I'm your AI assistant with image recognition and coding capabilities. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What can you do?",
    "Help me with code",
    "Analyze an image",
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string, imageData?: { file: File; preview: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: imageData?.preview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSuggestions([]);
    setIsTyping(true);

    // Handle image analysis
    if (imageData) {
      try {
        const imageAnalysis = await analyzeImage(imageData.preview);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: imageAnalysis + "\n\n📸 **Image Recognition Active**\n\nI've analyzed your image! Feel free to ask me any questions about it, or let me know what else you'd like to discuss.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
        setSuggestions(["Tell me more about the image", "Analyze another image", "Help with something else"]);
        setIsTyping(false);
        return;
      } catch (error) {
        console.log('Image analysis failed, providing default response');
      }
    }

    // Add to conversation history
    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      { role: 'user', content: text },
    ];

    if (useAI) {
      // Try to use AI API
      try {
        const aiResponse = await getAIResponse(text, conversationHistory);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
        setConversationHistory([
          ...newHistory,
          { role: 'assistant', content: aiResponse },
        ]);
        
        // Generate contextual suggestions based on AI response
        const contextSuggestions = [
          "Tell me more",
          "Can you explain further?",
          "What else should I know?",
        ];
        setSuggestions(contextSuggestions);
        setIsTyping(false);
      } catch (error) {
        // Silently fallback to pattern-based responses
        setTimeout(() => {
          const response = generateBotResponse(text);
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response.message,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          setMessages((prev) => [...prev, botMessage]);
          setSuggestions(response.suggestions || []);
          setIsTyping(false);
        }, 500);
      }
    } else {
      // Use pattern-based responses
      setTimeout(() => {
        const response = generateBotResponse(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
        setSuggestions(response.suggestions || []);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! 👋 I'm your AI assistant with image recognition and coding capabilities. How can I help you today?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSuggestions(["What can you do?", "Help me with code", "Analyze an image"]);
    setConversationHistory([]);
  };

  const toggleAIMode = () => {
    setUseAI(!useAI);
  };

  return (
    <div className="size-full flex items-center justify-center cosmic-bg p-4 relative overflow-hidden">
      {/* Animated cosmic background */}
      <CosmicBackground />
      
      <div className="w-full max-w-4xl h-full max-h-[900px] bg-black/80 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(255,107,53,0.3)] border border-[#ff6b35]/30 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-black border-b border-[#ff6b35]/30 p-6 flex items-center justify-between relative overflow-hidden">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6b35]/10 to-transparent animate-[cosmic-pulse_3s_ease-in-out_infinite]" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,53,0.6)] animate-[float_3s_ease-in-out_infinite]">
              <Bot className="w-7 h-7 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#ff6b35] animate-[cosmic-glow_2s_ease-in-out_infinite]">Cosmic AI</h1>
                {useAI && (
                  <Badge variant="secondary" className="bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/50">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400">
                {useAI ? 'AI + Image Recognition + Code Helper' : 'Pattern-based responses'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <Button
              onClick={toggleAIMode}
              variant="ghost"
              className="text-[#ff6b35] hover:bg-[#ff6b35]/20 border border-[#ff6b35]/30 hover:border-[#ff6b35]/60 transition-all duration-300"
              title={useAI ? 'Switch to Pattern Mode' : 'Switch to AI Mode'}
            >
              <Sparkles className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleClearChat}
              variant="ghost"
              className="text-[#ff6b35] hover:bg-[#ff6b35]/20 border border-[#ff6b35]/30 hover:border-[#ff6b35]/60 transition-all duration-300"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-black/50 to-black/30">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
              imageUrl={message.imageUrl}
            />
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.5)]">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className="bg-[#1a1a1a] border border-[#ff6b35]/30 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#ff8c42] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#ffa500] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {suggestions.length > 0 && !isTyping && (
          <div className="px-6 pb-4 bg-gradient-to-b from-transparent to-black/30">
            <QuickReplies suggestions={suggestions} onSelect={handleSendMessage} />
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-[#ff6b35]/30 bg-gradient-to-b from-black/50 to-black backdrop-blur-sm">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
