import { useEffect, useState } from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import InputDate from "../components/InputDate";
import ServiceSelector from "../components/ServiceSelector";
import {
  EPaymentType,
  EPaymentTypeLabels,
  TCustomer,
  TService,
  TServicePayments,
} from "../utils/types";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useApi } from "../hooks/use-api";
import InputCurrency from "../components/InputCurrency";
import ConfirmModal from "../components/ConfirmModal";

type TCustomerOption = {
  id: string;
  label: string;
  name: string;
};

const paymentTypeOptions = Object.entries(EPaymentTypeLabels).map(
  ([key, val]) => ({
    id: key,
    name: key,
    label: val,
  })
);

export default function ServicePaymentsFormPage() {
  const nav = useNavigate();
  const { id } = useQuery();
  const { callApi, isLoading } = useApi();

  const [paymentType, setPaymentType] = useState(EPaymentType.CASH);
  const [paidAt, setPaidAt] = useState("");
  const [services, setServices] = useState<TService[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState<TCustomerOption[]>([]);
  const [valuePaid, setValuePaid] = useState(0);
  const [messageWarning, setMessageWarning] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleCreateServicePayment = async () => {
    const data: any = {
      payment_type: paymentType,
      num_of_installments: 0,
      paid_at: paidAt,
      services,
      value: valuePaid,
    };

    if (selectedCustomer) {
      data.customer = {
        id: selectedCustomer,
      };
    }

    const response = await callApi({
      method: "POST",
      path: "/service-payments",
      data,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/atendimentos");
  };

  const handleUpdateServicePayment = async () => {
    const data: any = {
      payment_type: paymentType,
      num_of_installments: 0,
      paid_at: paidAt,
      services,
      value: valuePaid,
      customer: {
        id: selectedCustomer,
      },
    };

    if (selectedCustomer) {
      data.customer = {
        id: selectedCustomer,
      };
    }

    const response = await callApi({
      method: "PATCH",
      path: `/service-payments/${id}`,
      data,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/atendimentos");
  };

  const loadServicePaymentData = async () => {
    const response: TServicePayments = await callApi({
      method: "GET",
      path: `/service-payments/${id}`,
    });

    if (!response) return;

    setPaymentType(response.payment_type);
    setPaidAt(response.paid_at);
    setServices(response.services);
    setSelectedCustomer(response.customer_id);
    setTimeout(() => {
      setValuePaid(response.value);
    }, 1);
  };

  const loadCustomers = async () => {
    const response = await callApi({
      method: "GET",
      path: "/customers",
      params: {
        pageSize: 9999,
      },
    });

    if (!response) return;

    const formattedCustomers: TCustomerOption[] = response.data.map(
      ({ id, name }: TCustomer) => ({
        id,
        label: name,
        name: id,
      })
    );

    formattedCustomers.unshift({
      id: "999",
      label: "Não selecionar",
      name: "",
    });

    setCustomers(formattedCustomers);
  };

  useEffect(() => {
    loadCustomers();

    if (id) {
      loadServicePaymentData();
    }
  }, []);

  useEffect(() => {
    setValuePaid(services.reduce((acc, curr) => acc + curr.price, 0));
  }, [services]);

  const submit = () => {
    if (id) {
      handleUpdateServicePayment();
      return;
    }

    handleCreateServicePayment();
  };

  const handleClickToSubmitServicePayment = (e: any) => {
    e.preventDefault();

    const total = services.reduce((acc, curr) => acc + curr.price, 0);

    if (total !== valuePaid) {
      setMessageWarning(
        "O valor pago é diferente do total de serviços. Prosseguir mesmo assim?"
      );
      setOpenConfirmModal(true);
      return;
    }

    submit();
  };

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
            label="Cliente"
            options={customers}
            onChange={(v) => setSelectedCustomer(v)}
            value={selectedCustomer}
            hideAsterisk
          />
          <Select
            label="Tipo de pagamento"
            options={paymentTypeOptions}
            onChange={(v) => setPaymentType(v)}
            value={paymentType}
          />
          <InputCurrency
            label="Valor pago"
            placeholder="Valor pago"
            onChange={(v) => setValuePaid(v)}
            value={valuePaid || 0}
            required
          />
          <InputDate
            label="Data do pagamento"
            setValue={(v) => setPaidAt(v)}
            value={paidAt}
          />
          <Button
            onClick={handleClickToSubmitServicePayment}
            isLoading={isLoading}
          >
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
        <ConfirmModal
          title="Aviso!"
          text={messageWarning}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={submit}
          open={openConfirmModal}
        />
      </div>
    </Main>
  );
}
