import toast from "react-hot-toast";
import { callApi } from "../api"
import { useEffect, useState } from "react";
import { TService } from "../utils/types";
import ServiceCard from "../components/ServiceCard";
import PageTitle from "../components/PageTitle";

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
      <PageTitle text="Serviços" />
      <ul className="gap-2 flex flex-wrap">
        {services.map((service) => (
          <li className="max-w-[300px] flex-1">
            <ServiceCard
              data={service}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}