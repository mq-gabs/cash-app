import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import clsx from "clsx";
import MenuSeparator from "./MenuSeparator";
import { MdDashboard, MdMiscellaneousServices } from "react-icons/md";
import { GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { rand } from "../utils";

const menuRoutes = [
  {
    id: "0",
    label: "Dashboard",
    Icon: MdDashboard,
    href: "/dashboard",
  },
  {
    id: "1",
    label: "Atendimentos",
    Icon: FaPlus,
    href: "/service-payments",
  },
  {
    id: "2",
    label: "Pagamentos",
    Icon: GiPayMoney,
    href: "/employees-payments",
  },
  {
    id: "3",
    label: "Outros gastos",
    Icon: GiMoneyStack,
    href: "/other-payments",
  },
  {
    id: "4",
    label: "Serviços",
    Icon: MdMiscellaneousServices,
    href: "/services",
  },
  {
    id: "5",
    label: "Funcionários",
    Icon: FaPeopleGroup,
    href: "/employees",
  },
  {
    id: "6",
    label: "Perfil",
    Icon: CgProfile,
    href: "/profile",
  },
];

export default function Menu() {
  const { pathname } = useLocation();

  return (
    <div className="bg-secondary h-full flex flex-col justify-between">
      <div className="p-2 cursor-pointer">
        <Logo />
        <MenuSeparator />
        <ul className="flex flex-col gap-2 pt-2">
          {menuRoutes.map(({ id, href, label, Icon }) => (
            <>
              <li key={id}>
                <Link to={href}>
                  <p
                    className={clsx({
                      "p-2 text-xs rounded flex gap-2 items-center uppercase font-semibold":
                        true,
                      "text-white hover:bg-gray-500": pathname !== href,
                      "bg-white text-secondary": pathname === href,
                    })}
                  >
                    <Icon size={18} />
                    {label}
                  </p>
                </Link>
              </li>
              {["0", "1", "3", "5"].includes(id) && (
                <MenuSeparator key={rand()} />
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
