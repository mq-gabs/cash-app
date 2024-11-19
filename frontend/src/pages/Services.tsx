import toast from "react-hot-toast";
import { callApi } from "../api"
import { useEffect, useState } from "react";
import { TService } from "../utils/types";
import ServiceCard from "../components/ServiceCard";
import PageTitle from "../components/PageTitle";
import LinkButton from "../components/LinkButton";
import { IoMdAddCircle } from "react-icons/io";

export default function Services() {
  const [services, setServices] = useState<TService[]>([]);

  const loadServices = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/services',
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
          to="/service"
        >
          <div className="flex items-center gap-2">

            <IoMdAddCircle />
            Novo serviço
          </div>
        </LinkButton>
      </div>
      {services.length !== 0 && (

        <ul className="gap-2 flex flex-wrap">
          {services.map((service) => (
            <li className="max-w-[300px] flex-1">
              <ServiceCard
                data={service}
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