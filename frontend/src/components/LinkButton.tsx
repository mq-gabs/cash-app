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
      <div className={`bg-primary p-2 text-white rounded hover:brightness-110 ${className}`}>
        {children}
      </div>
    </Link>
  )
}