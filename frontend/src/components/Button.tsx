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
      className={`bg-primary text-white block w-full p-2 rounded hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  )
}