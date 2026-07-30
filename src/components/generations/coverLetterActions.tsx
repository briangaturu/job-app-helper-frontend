import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { downloadCoverLetterAsPdf, copyToClipboard } from "../../utils/downloadCoverLetter";

interface CoverLetterActionsProps {
  coverLetter: string;
  jobTitle?: string | null;
}

export const CoverLetterActions = ({ coverLetter, jobTitle }: CoverLetterActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(coverLetter);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadCoverLetterAsPdf(coverLetter, jobTitle || undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" onClick={handleCopy} className="flex items-center gap-1.5 text-sm">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button variant="ghost" onClick={handleDownload} className="flex items-center gap-1.5 text-sm">
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};