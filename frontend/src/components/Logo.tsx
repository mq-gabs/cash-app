import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Logo() {
  return (
    <Link to="/" className="flex justify-center items-center p-2">
      <div className="h-[50px] w-[50px]">
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>
    </Link>
  );
}
