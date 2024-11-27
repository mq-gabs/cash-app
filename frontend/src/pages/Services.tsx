import toast from "react-hot-toast";
import { callApi } from "../api"
import { useEffect, useState } from "react";
import { TService } from "../utils/types";
import ServiceCard from "../components/ServiceCard";
import PageTitle from "../components/PageTitle";
import LinkButton from "../components/LinkButton";
import { IoMdAddCircle } from "react-icons/io";
import { useUser } from "../hooks/use-user";

export default function Services() {
  const [services, setServices] = useState<TService[]>([]);
  const { signOut } = useUser();


  const loadServices = async () => {
    const response = await callApi(signOut, {
      method: 'GET',
      path: '/services',
      params: {
        pageSize: 999,
      },
    });

    if (!response) {
      toast.error("Ocorreu um erro!");
      return;
    }

    setServices(response.data);
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <main className="p-4">
      <div className="flex justify-between mb-4">
        <PageTitle text="Serviços" />
        <LinkButton
          to="/servico"
        >
          <div className="flex items-center gap-2">

            <IoMdAddCircle />
            Novo serviço
          </div>
        </LinkButton>
      </div>
      {services.length !== 0 && (

        <ul className="gap-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <li className="">
              <ServiceCard
                data={service}
                refresh={loadServices}
              />
            </li>
          ))}
        </ul>
      )}
      {services.length === 0 && (
        <div className="h-[300px] flex justify-center items-center">
          <p className="text-xl text-gray-500">Nenhum serviço encontrado...</p>
        </div>
      )}
    </main>
  )
}