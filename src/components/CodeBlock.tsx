import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-2 border border-[#ff6b35]/30 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-black/80 text-[#ff6b35] px-4 py-2 border-b border-[#ff6b35]/30">
        <span className="text-sm uppercase tracking-wider">{language}</span>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="text-[#ff6b35] hover:text-[#ff8c42] hover:bg-[#ff6b35]/10"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="bg-[#0a0a0a] text-gray-100 p-4 overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}
