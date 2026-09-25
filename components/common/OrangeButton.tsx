interface OrangeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function OrangeButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}: OrangeButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="min-w-[170px] px-10 py-3 rounded-lg bg-[#ff9d00] hover:bg-[#ffae26] active:bg-[#e08900] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[28px] font-black tracking-tight shadow-lg transition-colors"
    >
      {children}
    </button>
  );
}
