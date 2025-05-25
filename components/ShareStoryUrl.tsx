import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = {
  title: string;
  text: string;
  slug: string;
};

const ShareStoryUrl = ({ title, text, slug }: Props) => {
  return (
    <Button
    //   size='icon'
      variant={"ghost"}
      type='button'
      onClick={() => {
        const shareUrl = `${window.location.origin}/achievements/${slug}`;
        if (navigator.share) {
          navigator
            .share({
              title,
              text,
              url: shareUrl,
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
          navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied");
        }
      }}
      className='p-2 hover:bg-muted rounded-full transition-colors'
      aria-label='Share achievement'>
      <Share2 className='w-4 h-4 shrink-0' /> <span className="text-xs">Share</span>
    </Button>
  );
};

export default ShareStoryUrl;
