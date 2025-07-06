"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Facebook, Linkedin, MessageCircle, Share2, Twitter } from "lucide-react";

type ProjectData = {
  title: string;
  description?: string;
  skills?: string;
  category?: string;
  level?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  url: string;
};

export function CopyFullProjectButton({ project }: { project: ProjectData }) {
  const [copied, setCopied] = useState(false);

  const formatText = () => {
    return `🚀 *${project.title}*

📄 *Description:* ${project.description || "No description."}
🛠️ *Skills:* ${project.skills || "N/A"}
📂 *Category:* ${project.category || "N/A"}
📈 *Level:* ${project.level || "N/A"}
🗓️ *Start Date:* ${project.startDate || "N/A"}
🛑 *End Date:* ${project.endDate || "N/A"}

🔗 *Link:* ${project.url}
${project.imageUrl ? `🖼️ *Image:* ${project.imageUrl}` : ""}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`💼 Gain real experience with this beautiful project: \n ${project.title}\n${project.description || ""}`);
  const encodedUrl = encodeURIComponent(project.url);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex text-[#0a2342] items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          {copied ? "Copied!" : "Copy full project"}
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://wa.me/?text=${shareText}%0A${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Facebook className="w-4 h-4" /> Facebook
            </span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              <Twitter className="w-4 h-4" /> X (Twitter)
            </span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
