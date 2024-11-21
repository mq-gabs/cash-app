import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import clsx from "clsx";
import MenuSeparator from "./MenuSeparator";

const menuRoutes = [
  {
    id: "0",
    label: "Dashboard",
    Icon: () => <></>,
    href: "/dashboard",
  },
  {
    id: "1",
    label: "Atendimentos",
    Icon: () => <></>,
    href: "/service-payments",
  },
  {
    id: "2",
    label: "Pagamentos",
    Icon: () => <></>,
    href: "/employees-payments",
  },
  {
    id: "3",
    label: "Outros gastos",
    Icon: () => <></>,
    href: "/other-payments",
  },
  {
    id: "4",
    label: "Serviços",
    Icon: () => <></>,
    href: "/services",
  },
  {
    id: "5",
    label: "Funcionários",
    Icon: () => <></>,
    href: "/employees",
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
                    <Icon />
                    {label}
                  </p>
                </Link>
              </li>
              {['0','1','3'].includes(id) && (
                <MenuSeparator />
              )}
            </>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="p-2">
          <Link
            to="/profile"
            className="text-white p-2 hover:bg-white hover:text-secondary w-full rounded"
          >
            Perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
