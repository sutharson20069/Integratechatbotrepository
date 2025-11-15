import { Bot, User } from 'lucide-react';
import { motion } from 'motion/react';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  imageUrl?: string;
}

export function ChatMessage({ message, isBot, timestamp, imageUrl }: ChatMessageProps) {
  // Parse message for code blocks
  const parseMessageContent = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }
      
      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim(),
      });
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex),
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const messageParts = parseMessageContent(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot 
            ? 'bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] shadow-[0_0_20px_rgba(255,107,53,0.5)]' 
            : 'bg-gradient-to-br from-[#ff8c42] to-[#ffa500] shadow-[0_0_20px_rgba(255,140,66,0.5)]'
        }`}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-black" />
        ) : (
          <User className="w-5 h-5 text-black" />
        )}
      </div>

      <div className={`flex flex-col gap-1 max-w-[70%]`}>
        <div
          className={`rounded-2xl px-4 py-2 border ${
            isBot
              ? 'bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-100 rounded-tl-none border-[#ff6b35]/30 shadow-[0_0_15px_rgba(255,107,53,0.2)]'
              : 'bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] text-white rounded-tr-none border-[#ff8c42]/50 shadow-[0_0_20px_rgba(255,107,53,0.4)]'
          }`}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full rounded-lg mb-2 max-h-64 object-contain border border-[#ff6b35]/30"
            />
          )}
          
          {messageParts.map((part, index) => {
            if (part.type === 'code') {
              return (
                <CodeBlock
                  key={index}
                  code={part.content}
                  language={part.language}
                />
              );
            }
            return (
              <p key={index} className="whitespace-pre-wrap">
                {part.content}
              </p>
            );
          })}
        </div>
        <span className={`text-xs text-gray-500 ${isBot ? 'text-left' : 'text-right'}`}>
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}
