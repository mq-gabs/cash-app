import { useEffect, useState } from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import { useApi } from "../hooks/use-api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import InputBirthDate from "../components/InputBirthDate";

export default function CustomersFormPage() {
  const { id } = useQuery();
  const nav = useNavigate();
  const { callApi, isLoading } = useApi();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const redirect = () => {
    nav("/clientes");
  };

  const handleCreateCustomer = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "POST",
      path: "/customers",
      data: {
        name,
        contact,
        address,
        birth_date: birthDate,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    redirect();
  };

  const handleUpdateCustomer = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "PATCH",
      path: `/customers/${id}`,
      data: {
        name,
        contact,
        address,
        birth_date: birthDate,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    redirect();
  };

  const loadCustomerData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/customers/${id}`,
    });

    if (!response) return;

    setName(response.name);
    setContact(response.contact);
    setAddress(response.address);
    setBirthDate(response.birth_date);
  };

  useEffect(() => {
    if (id) {
      loadCustomerData();
    }
  }, []);

  return (
    <Main>
      <PageTitle
        text={id ? "Editar cliente" : "Novo cliente"}
        backRoute="/clientes"
      />
      <div className="max-w-[800px] mx-auto">
        <form className="flex gap-2 flex-col">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={(v) => setName(v)}
            defaultValue={name}
            required
          />
          <Input
            label="Telefone"
            placeholder="Telefone"
            onChange={(v) => setContact(v)}
            defaultValue={contact}
            required
          />
          <Input
            label="Endereço"
            placeholder="Endereço"
            onChange={(v) => setAddress(v)}
            defaultValue={address}
            required
          />
          <InputBirthDate
            label="Data do nascimento"
            onChange={(v) => setBirthDate(v)}
            value={birthDate}
          />
          <Button
            onClick={id ? handleUpdateCustomer : handleCreateCustomer}
            isLoading={isLoading}
          >
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
