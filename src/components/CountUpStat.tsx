import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/contexts/LanguageContext";

interface CountUpStatProps {
  num: string;        // e.g. "200+", "24/7", "8+"
  labelEn: string;
  labelAr: string;
}

/** Extracts numeric part and suffix from strings like "200+", "24/7", "7+" */
function parseStatNum(num: string): { value: number; suffix: string } | null {
  if (num.includes("/")) return null;
  const match = num.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { value: parseInt(match[1], 10), suffix: match[2] };
}

const CountUpStat = ({ num, labelEn, labelAr }: CountUpStatProps) => {
  const { t } = useLanguage();
  const parsed = parseStatNum(num);
  const [ref, animatedValue] = useCountUp(parsed?.value ?? 0, 2200);

  return (
    <div
      ref={ref}
      className="text-center lg:text-start sm:border-e sm:last:border-e-0 border-primary-foreground/20 px-2"
    >
      <div className="text-2xl font-bold tabular-nums text-accent md:text-3xl transition-transform duration-150">
        {parsed ? `${animatedValue}${parsed.suffix}` : num}
      </div>
      <div className="mt-0.5 text-xs font-medium text-primary-foreground/85 sm:text-sm">
        {t(labelEn, labelAr)}
      </div>
    </div>
  );
};

export default CountUpStat;
