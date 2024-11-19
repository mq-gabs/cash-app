interface IButton {
  children: React.ReactNode;
  onClick: (arg: any) => void;
  className?: string
}

export default function Button({
  children,
  onClick,
  className = '',
}: IButton) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-sm text-white font-bold block px-2 py-1 rounded hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  )
}