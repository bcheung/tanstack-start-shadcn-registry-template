import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";

export function CopyCommandButton({
  command,
  label,
  className,
  toastMessage = "Copied install command to clipboard",
}: {
  command: string;
  label: string;
  className?: string;
  toastMessage?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    onCopy: () => toast.success(toastMessage),
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-2 rounded-sm", className)}
      onClick={() => copyToClipboard(command)}
    >
      {isCopied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="sr-only">Copy install command</span>
      <span className="hidden sm:inline text-xs font-medium">{label}</span>
    </Button>
  );
}
