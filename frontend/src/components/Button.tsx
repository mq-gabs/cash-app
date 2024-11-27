import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

interface IButton {
  children: React.ReactNode;
  onClick: (arg: any) => void;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  isLoading = false,
}: IButton) {
  return (
    <button
      onClick={onClick}
      className={clsx({
        [`bg-primary text-sm text-white font-bold block px-2 py-1 rounded ${className}`]:
          true,
        "hover:brightness-110": !isLoading,
        "!bg-gray-300": isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <AiOutlineLoading size={18} className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
