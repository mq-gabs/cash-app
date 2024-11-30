import logo from "../assets/logo-sabrina-unhas-light.png";

export default function Logo() {
  return (
    <div className="w-[180px] h-[100px]">
      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
    </div>
  );
}
