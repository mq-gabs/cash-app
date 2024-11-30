import { Link } from "react-router-dom";
import logo from "../assets/logo-sabrina-unhas-light.png";

export default function Logo() {
  return (
    <Link to="/" className="flex justify-center items-center p-2">
      <div className="w-[180px] h-[100px]">
        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
      </div>
    </Link>
  );
}
