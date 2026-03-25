import { forwardRef } from "react";

const EgyptFlag = forwardRef<SVGSVGElement, { className?: string }>(
  ({ className = "w-8 h-6" }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Egyptian flag"
      role="img"
    >
      <rect width="900" height="200" fill="#CE1126" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#000000" />
      <g transform="translate(450,300)" fill="#C09300">
        <ellipse cx="0" cy="-15" rx="45" ry="35" />
        <rect x="-5" y="-50" width="10" height="20" rx="3" />
        <path d="M-45,-15 Q-70,-30 -60,-60 Q-40,-40 -30,-20Z" />
        <path d="M45,-15 Q70,-30 60,-60 Q40,-40 30,-20Z" />
        <rect x="-25" y="15" width="50" height="20" rx="4" />
        <rect x="-15" y="35" width="10" height="20" rx="2" />
        <rect x="5" y="35" width="10" height="20" rx="2" />
      </g>
    </svg>
  )
);

EgyptFlag.displayName = "EgyptFlag";

export default EgyptFlag;
