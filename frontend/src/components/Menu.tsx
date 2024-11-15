import { Link, useLocation } from "react-router-dom"
import Logo from "./Logo"
import clsx from "clsx"

const menuRoutes = [
  {
    id: '1',
    label: 'Serviços',
    Icon: () => <></>,
    href: '/services'
  },
  {
    id: '2',
    label: 'Pagamento de serviço',
    Icon: () => <></>,
    href: '/service-payments'
  },
  {
    id: '3',
    label: 'Outros pagamentos',
    Icon: () => <></>,
    href: '/other-payments'
  },
  {
    id: '4',
    label: 'Funcionários',
    Icon: () => <></>,
    href: '/employees'
  },
]

export default function Menu() {
  const { pathname } = useLocation()
  
  return (
    <div className="bg-secondary h-full flex flex-col justify-between">
      <div className="p-2 cursor-pointer">
        <Logo />
      </div>
      <div>
        <ul className="flex flex-col gap-4">
          {menuRoutes.map(({
            id,
            href,
            label,
          }) => (
            <li key={id}>
              <Link to={href}>
              <p className={clsx({
                "p-2 ml-2 rounded-tl rounded-bl text-sm hover:underline": true,
                "text-white": pathname !== href,
                "bg-white text-secondary": pathname === href,
              })}>
              {label}
              </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center" >
        <div className="p-2">
          <Link to="/profile" className="text-white p-2 hover:bg-white hover:text-secondary w-full rounded" >Perfil</Link>
        </div>
      </div>
    </div>
  )
}