import { useEffect, useState } from "react";
import Input from "../components/Input";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputDate from "../components/InputDate";
import InputCurrency from "../components/InputCurrency";
import { useApi } from "../hooks/use-api";

export default function OtherPaymentsFormPage() {
  const { id } = useQuery();
  const nav = useNavigate();
  const { callApi, isLoading } = useApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number>();
  const [paidAt, setPaidAt] = useState<string>("");

  const handleCreatePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "POST",
      path: "/other-payments",
      data: {
        title,
        description,
        value: value || 0,
        paid_at: paidAt,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Successo!");

    nav("/outros");
  };

  const handleUpdatePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "PATCH",
      path: `/other-payments/${id}`,
      data: {
        title,
        description,
        value: value || 0,
        paid_at: paidAt,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Successo!");

    nav("/outros");
  };

  const loadPaymentData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/other-payments/${id}`,
    });

    if (!response) return;

    setTitle(response.title);
    setDescription(response.description);
    setValue(response.value);
    setPaidAt(response.paid_at);
  };

  useEffect(() => {
    if (id) {
      loadPaymentData();
    }
  }, []);

  return (
    <Main>
      <PageTitle
        text={id ? "Editar gasto" : "Registrar gasto"}
        backRoute="/outros"
        className="mb-4"
      />
      <div className="max-w-[800px] mx-auto">
        <form className="flex flex-col gap-2">
          <Input
            label="Título"
            onChange={(v) => setTitle(v)}
            placeholder="Título"
            defaultValue={title}
            required
          />
          <Input
            label="Descrição"
            onChange={(v) => setDescription(v)}
            placeholder="Descrição"
            defaultValue={description}
          />
          <InputCurrency
            label="Valor"
            value={value || 0}
            onChange={(v) => setValue(v)}
            placeholder="Valor"
            required
          />
          <InputDate
            label="Data do pagamento"
            setValue={(v) => setPaidAt(v)}
            value={paidAt}
          />
          <Button
            isLoading={isLoading}
            onClick={id ? handleUpdatePayment : handleCreatePayment}
          >
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
