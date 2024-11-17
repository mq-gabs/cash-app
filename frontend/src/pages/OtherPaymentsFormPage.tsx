import { useEffect, useState } from "react";
import Input from "../components/Input";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import Button from "../components/Button";
import { callApi } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputDate from "../components/InputDate";

export default function OtherPaymentsFormPage() {
  const { id } = useQuery();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number>();
  const [paidAt, setPaidAt] = useState("");

  const handleCreatePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "POST",
      path: "/other-payments",
      data: {
        title,
        description,
        value: (value || 0) * 100,
        paid_at: new Date(paidAt),
      },
    });

    if (!response) return;

    toast.success(response?.message || "Successo!");

    nav("/other-payments");
  };

  const handleUpdatePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "PATCH",
      path: `/other-payments/${id}`,
      data: {
        title,
        description,
        value: (value || 0) * 100,
        paid_at: new Date(paidAt),
      },
    });

    if (!response) return;

    toast.success(response?.message || "Successo!");

    nav("/other-payments");
  };

  const loadPaymentData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/other-payments/${id}`,
    });

    if (!response) return;

    setTitle(response.title);
    setDescription(response.description);
    setValue(response.value / 100);
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
        backRoute="/other-payments"
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
          <Input
            label="Valor"
            onChange={(v) => setValue(v)}
            placeholder="Valor"
            defaultValue={value}
            required
            type="number"
          />
          <InputDate
            label="Data do pagamento"
            setValue={v => setPaidAt(v)}
            value={paidAt}
          />
          <Button onClick={id ? handleUpdatePayment : handleCreatePayment}>
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
