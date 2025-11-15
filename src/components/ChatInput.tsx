import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { ImageUpload } from './ImageUpload';

interface ChatInputProps {
  onSendMessage: (message: string, imageData?: { file: File; preview: string }) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [imageData, setImageData] = useState<{ file: File; preview: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || imageData) && !disabled) {
      onSendMessage(input.trim() || 'Analyze this image', imageData || undefined);
      setInput('');
      setImageData(null);
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setImageData({ file, preview });
  };

  // Auto-focus the input when it's enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {imageData && (
        <div className="flex justify-start">
          <ImageUpload onImageSelect={handleImageSelect} disabled={disabled} />
        </div>
      )}
      <div className="flex gap-2">
        {!imageData && (
          <ImageUpload onImageSelect={handleImageSelect} disabled={disabled} />
        )}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={imageData ? "Ask about this image..." : "Type your message or upload an image..."}
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#ff6b35]/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent disabled:opacity-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,53,0.1)] focus:shadow-[0_0_30px_rgba(255,107,53,0.3)]"
        />
        <Button
          type="submit"
          disabled={(!input.trim() && !imageData) || disabled}
          className="rounded-full w-12 h-12 p-0 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] hover:from-[#ff8c42] hover:to-[#ffa500] shadow-[0_0_30px_rgba(255,107,53,0.5)] hover:shadow-[0_0_40px_rgba(255,107,53,0.7)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          <Send className="w-5 h-5 text-black" />
        </Button>
      </div>
    </form>
  );
}
