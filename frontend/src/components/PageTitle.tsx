import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function PageTitle({
  text,
  className = '',
  backRoute,
}: {
  text: string;
  className?: string;
  backRoute?: string;
}) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {backRoute && (
        <Link to={backRoute}>
          <IoIosArrowBack className="w-[40px] h-[40px] cursor-pointer hover:bg-gray-200 p-2 rounded-full" />
        </Link>
      )}
      <h1 className="text-3xl font-bold">{text}</h1>
    </div>
  );
}
