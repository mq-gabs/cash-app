import { Link } from "react-router-dom";

interface ILinkButton {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({
  to,
  children,
  className = '',
}: ILinkButton) {
  return (
    <Link
      to={to}
    >
      <div className={`bg-primary text-sm py-1 px-2 font-bold text-white rounded hover:brightness-110 ${className}`}>
        {children}
      </div>
    </Link>
  )
}