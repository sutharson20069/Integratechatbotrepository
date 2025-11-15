import { Button } from './ui/button';

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function QuickReplies({ suggestions, onSelect }: QuickRepliesProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          onClick={() => onSelect(suggestion)}
          variant="outline"
          className="rounded-full text-sm bg-[#1a1a1a]/80 border-[#ff6b35]/30 text-[#ff6b35] hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/60 hover:shadow-[0_0_15px_rgba(255,107,53,0.3)] transition-all duration-300 backdrop-blur-sm"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
