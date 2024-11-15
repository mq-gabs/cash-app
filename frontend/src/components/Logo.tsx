import { TbCoinFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex justify-center items-center">
      <TbCoinFilled className="bg-white rounded-full w-[50px] h-[50px] fill-primary" />
    </Link>
  );
}
