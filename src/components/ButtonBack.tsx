import { Button } from "@/components/ui/button";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface ButtonBackProps {
  className?: string;
}

function ButtonBack({ className = "" }: ButtonBackProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => {
    router.history.back();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer ${className}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
      <span className="text-sm font-medium">{t.common.back}</span>
    </Button>
  );
}

export default ButtonBack;