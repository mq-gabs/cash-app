import { useEffect, useState } from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import InputDate from "../components/InputDate";
import ServiceSelector from "../components/ServiceSelector";
import { EPaymentType, EPaymentTypeLabels, TService } from "../utils/types";
import Select from "../components/Select";
import Button from "../components/Button";
import { callApi } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const paymentTypeOptions = Object.entries(EPaymentTypeLabels).map(([key, val]) => ({
  id: key,
  name: key,
  label: val,
}));

export default function ServicePaymentsFormPage() {
  const nav = useNavigate();
  const { id } = useQuery();

  const [paymentType, setPaymentType] = useState(EPaymentType.CASH);
  const [paidAt, setPaidAt] = useState("");
  const [services, setServices] = useState<TService[]>([]);

  const handleCreateServicePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "POST",
      path: "/service-payments",
      data: {
        payment_type: paymentType,
        num_of_installments: 0,
        paid_at: paidAt,
        services,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/atendimentos");
  };

  const handleUpdateServicePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "PATCH",
      path: `/service-payments/${id}`,
      data: {
        payment_type: paymentType,
        num_of_installments: 0,
        paid_at: paidAt,
        services,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/atendimentos");
  };

  const loadServicePaymentData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/service-payments/${id}`,
    });

    if (!response) return;

    setPaymentType(response.payment_type);
    setPaidAt(response.paid_at);
    setServices(response.services);
  };

  useEffect(() => {
    if (id) {
      loadServicePaymentData();
    }
  }, []);

  return (
    <Main>
      <PageTitle
        className="mb-4"
        text={id ? "Editar atendimento" : "Novo atendimento"}
        backRoute="/atendimentos"
      />
      <div className="mx-auto max-w-[800px]">
        <form className="flex flex-col gap-2">
          <ServiceSelector
            selectedServices={services}
            setSelectedServices={setServices}
          />
          <Select
            label="Tipo de pagamento"
            options={paymentTypeOptions}
            onChange={(v) => setPaymentType(v)}
            value={paymentType}
          />
          <InputDate
            label="Data do pagamento"
            setValue={(v) => setPaidAt(v)}
            value={paidAt}
          />
          <Button
            onClick={
              id ? handleUpdateServicePayment : handleCreateServicePayment
            }
          >
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
