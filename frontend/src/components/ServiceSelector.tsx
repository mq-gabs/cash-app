import { useEffect, useState } from "react";
import { callApi } from "../api";
import { formatCurrency } from "../utils/formaters";
import { TService } from "../utils/types"

interface IServiceSelector {
  selectedServices: TService[];
  setSelectedServices: (s: TService[]) => void;
}

export default function ServiceSelector({
  selectedServices = [],
  setSelectedServices,
}: IServiceSelector) {
  const [services, setServices] = useState<TService[]>([]);

  const value = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

  const loadServices = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/services',
      params: {
        pageSize: 999,
      },
    });

    if (!response) return;

    setServices(response.data);
  }

  useEffect(() => {
    loadServices();
  }, []);

  const handleClickCheckbox = (service: TService) => {
    if (selectedServices.some(({ id }) => id === service.id)) {
      setSelectedServices(selectedServices.filter(({ id }) => id !== service.id));
      return;
    }

    setSelectedServices([...selectedServices, service]);
  }

  return (
    <div>
      <fieldset className="border p-2 rounded border-dashed">
        <legend>Selecione os serviços: <span className="text-red-500">*</span></legend>
        <div className="flex flex-col gap-2 pl-8">
          {services.length !== 0 && services.map((service) => (
            <div className="flex justify-between gap-2">
              <div className="flex gap-2">
                <input checked={selectedServices.some(({ id }) => id === service.id)} onChange={() => handleClickCheckbox(service)} type="checkbox" id={service.id} name={service.id} />
                <label htmlFor={service.id}>
                  {service.name}
                </label>
              </div>
              <p>
                {formatCurrency(service.price)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-xl flex justify-between pt-2 mt-2 font-bold border-t">
            <p>Total</p>
            <p>{formatCurrency(value)}</p>
          </div>
      </fieldset>
      {services.length === 0 && (
        <p className="text-center text-gray-400">Nenhum serviço cadastrado...</p>
      )}
    </div>
  )
}