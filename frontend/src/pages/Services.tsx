import toast from "react-hot-toast";
import { callApi } from "../api"
import { useEffect, useState } from "react";
import { TService } from "../utils/types";
import Table from "../components/Table";
import { format } from "date-fns";

const columns = [
  'Nome',
  'Description',
  'Preço',
  'Criado em',
];

export default function Services() {
  const [services, setServices] = useState<string[][]>([]);

  const loadServices = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/services',
    });

    if (!response) {
      toast.error("Ocorreu um erro!");
      return;
    }

    const formattedServices = response.data.map(({
      name,
      description,
      created_at,
      price
    }: TService) => [
        name,
        description,
        `R$ ${price.toFixed(2)}`,
        format(new Date(created_at), 'dd/MM/yyyy'),
      ]);

    setServices(formattedServices);
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl">Serviços</h1>
      <Table
        columns={columns}
        data={services}
      />
    </main>
  )
}