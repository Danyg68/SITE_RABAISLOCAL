interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CTAButton({ children, onClick, className = "" }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-accent hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
