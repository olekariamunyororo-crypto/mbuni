import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { IconButton } from "../ui/IconButton";

interface Props {
  title?: string;
  back?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  className?: string;
}

export function TopBar({ title, back, onBack, right, className }: Props) {
  const navigate = useNavigate();
  const goBack = () => {
    if (onBack) return onBack();
    if (window.history.length > 1) navigate(-1);
    else navigate("/app/home");
  };
  return (
    <header className={cn("flex h-14 shrink-0 items-center gap-2", className)}>
      {back && (
        <IconButton onClick={goBack} label="Back">
          <ChevronLeft size={22} />
        </IconButton>
      )}
      {title && <h1 className="flex-1 truncate text-[22px] font-bold tracking-tight">{title}</h1>}
      {right}
    </header>
  );
}
