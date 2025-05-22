import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface PromptInputAreaProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const PromptInputArea = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  placeholder = "I need a table for my CRM where we track company expenses. Service name, total spend, latest transaction date. And action to save it",
}: PromptInputAreaProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="rounded-xl border flex flex-col bg-card text-card-foreground shadow p-4 sm:p-6 w-full max-w-md relative space-y-4"
    >
      <Textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-base resize-none min-h-[64px] border-none p-0 pr-8 shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none"
        rows={4}
        disabled={isLoading}
      />
      {!isLoading && (
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !prompt.trim()}
          className="ml-auto right-6 bottom-6 h-9 w-9"
          aria-label="Submit prompt"
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      )}
    </form>
  );
};
