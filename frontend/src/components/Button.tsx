interface IButton {
  children: React.ReactNode;
  onClick: (arg: any) => void;
}

export default function Button({
  children,
  onClick,
}: IButton) {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white block w-full p-2 rounded"
    >
      {children}
    </button>
  )
}