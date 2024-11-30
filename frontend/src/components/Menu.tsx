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
import { CiLogout } from "react-icons/ci";
import { useUser } from "../hooks/use-user";
import { HiUsers } from "react-icons/hi";
import { BsFillPersonVcardFill } from "react-icons/bs";

const menuRoutesAdmin = [
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
    href: "/atendimentos",
  },
  {
    id: "2",
    label: "Pagamentos",
    Icon: GiPayMoney,
    href: "/pagamentos",
  },
  {
    id: "3",
    label: "Outros gastos",
    Icon: GiMoneyStack,
    href: "/outros",
  },
  {
    id: "4",
    label: "Serviços",
    Icon: MdMiscellaneousServices,
    href: "/servicos",
  },
  {
    id: "5",
    label: "Funcionários",
    Icon: FaPeopleGroup,
    href: "/funcionarios",
  },
  {
    id: "6",
    label: "Clientes",
    Icon: BsFillPersonVcardFill,
    href: "/clientes",
  },
  {
    id: "7",
    label: "Usuários",
    Icon: HiUsers,
    href: "/usuarios",
  },
  {
    id: "8",
    label: "Perfil",
    Icon: CgProfile,
    href: "/perfil",
  },
];

const menuSeparatorIndexesAdmin = ["0", "1", "3", "6"];

const menuRoutesDefault = [
  {
    id: "0",
    label: "Atendimentos",
    Icon: FaPlus,
    href: "/atendimentos",
  },
  {
    id: "1",
    label: "Outros gastos",
    Icon: GiMoneyStack,
    href: "/outros",
  },
  {
    id: "2",
    label: "Serviços",
    Icon: MdMiscellaneousServices,
    href: "/servicos",
  },
  {
    id: "4",
    label: "Clientes",
    Icon: BsFillPersonVcardFill,
    href: "/clientes",
  },
  {
    id: "3  ",
    label: "Perfil",
    Icon: CgProfile,
    href: "/perfil",
  },
];

const menuSeparatorIndexesDefault = ["0", "1", "2", "3"];

export default function Menu() {
  const { pathname } = useLocation();
  const {
    signOut,
    data: { is_admin },
  } = useUser();

  const menuRoutes = is_admin ? menuRoutesAdmin : menuRoutesDefault;
  const menuSeparatorIndexes = is_admin
    ? menuSeparatorIndexesAdmin
    : menuSeparatorIndexesDefault;

  return (
    <div className="bg-secondary h-full flex flex-col justify-between">
      <div className="p-2 cursor-pointer overflow-auto">
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
                      "text-white hover:bg-primary": pathname !== href,
                      "bg-white text-secondary": pathname === href,
                    })}
                  >
                    <Icon size={18} />
                    {label}
                  </p>
                </Link>
              </li>
              {menuSeparatorIndexes.includes(id) && (
                <MenuSeparator key={rand()} />
              )}
            </>
          ))}
          <li onClick={signOut}>
            <p
              className={clsx({
                "p-2 text-xs rounded flex gap-2 items-center uppercase font-semibold":
                  true,
                "text-white hover:bg-gray-500": true,
              })}
            >
              <CiLogout size={18} />
              Sair
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
