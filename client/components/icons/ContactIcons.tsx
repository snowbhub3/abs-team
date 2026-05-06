import React from "react";

export const EmailIcon = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M4.5 7.25A2.25 2.25 0 0 1 6.75 5h10.5a2.25 2.25 0 0 1 2.25 2.25v9.5A2.25 2.25 0 0 1 17.25 19H6.75a2.25 2.25 0 0 1-2.25-2.25v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m5.5 7.35 6.5 5.15 6.5-5.15"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
EmailIcon.displayName = "EmailIcon";

export const WhatsAppIcon = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5.4 19.15 6.2 16.8a7.4 7.4 0 1 1 2.8 2.3l-3.6.05Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.25 8.8c.14-.25.32-.37.6-.37h.45c.22 0 .4.12.5.32l.55 1.12c.12.24.08.47-.1.66l-.38.4c.52.93 1.25 1.66 2.2 2.18l.4-.38c.2-.18.42-.22.67-.1l1.13.55c.2.1.32.28.32.5v.45c0 .28-.12.46-.37.6-.46.26-1.17.36-1.95.14-2.02-.56-4.14-2.68-4.7-4.7-.22-.78-.12-1.49.14-1.95Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
WhatsAppIcon.displayName = "WhatsAppIcon";

export const TelegramIcon = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20.25 4.75 3.9 11.05c-.78.3-.76 1.42.03 1.68l4.05 1.34 1.55 4.95c.23.74 1.18.94 1.7.35l2.28-2.58 4.02 3.03c.64.48 1.56.12 1.7-.67l2.12-13.22c.13-.8-.35-1.47-1.1-1.18Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m8.15 13.95 8.25-5.1-6.75 7.25"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
TelegramIcon.displayName = "TelegramIcon";
