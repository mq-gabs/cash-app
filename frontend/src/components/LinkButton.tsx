import { Link } from "react-router-dom";

interface ILinkButton {
  to: string;
  children: React.ReactNode;
}

export default function LinkButton({
  to,
  children,
}: ILinkButton) {
  return (
    <Link
      to={to}
    >
      <div className="bg-primary p-3 text-white rounded">
        {children}
      </div>
    </Link>
  )
}