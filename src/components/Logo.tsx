export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* Tech/P symbol - P letter with tech feel */}
      <path
        d="M30 35 L30 65 L45 65 L45 55 L38 55 L38 45 L45 45 L45 35 Z"
        fill="white"
        opacity="0.95"
      />
      
      {/* Digital/Tech accent - lightning bolt */}
      <path
        d="M52 32 L62 32 L58 42 L68 42 L50 52 L56 42 L48 42 Z"
        fill="white"
        opacity="0.85"
      />
      
      {/* Connection dots */}
      <circle cx="30" cy="28" r="3" fill="white" opacity="0.6" />
      <circle cx="68" cy="28" r="3" fill="white" opacity="0.6" />
      <circle cx="30" cy="72" r="3" fill="white" opacity="0.6" />
      <circle cx="68" cy="72" r="3" fill="white" opacity="0.6" />
    </svg>
  );
}
