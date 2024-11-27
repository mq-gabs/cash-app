import { useEffect, useState } from "react";
import Input from "../components/Input";
import { callApi } from "../api";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import InputCurrency from "../components/InputCurrency";

export default function ServicesFormPage() {
  const nav = useNavigate();
  const { id } = useQuery();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();

  const handleCreateService = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "post",
      path: "/services",
      data: {
        name,
        description,
        price: Number(price || 0),
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/servicos");
  };
  const handleEditService = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "PATCH",
      path: `/services/${id}`,
      data: {
        name,
        description,
        price: Number(price || 0),
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav("/servicos");
  };

  const loadServiceData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/services/${id}`,
    });

    if (!response) {
      toast.error('Funcionário não encontrado!');
      nav('/services');
    };

    setName(response.name);
    setDescription(response.description);
    setPrice(response.price);
  };

  useEffect(() => {
    if (id) {
      loadServiceData();
    }
  }, []);

  return (
    <main className="p-4">
      <PageTitle text={id ? 'Editar serviço' : 'Criar serviço'} backRoute="/servicos" />
      <div className="p-4 mx-auto max-w-[800px]">
        <form className="flex flex-col gap-4">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={(value) => setName(value)}
            defaultValue={name}
            required
          />
          <Input
            label="Descrição"
            placeholder="Descrição"
            onChange={(value) => setDescription(value)}
            defaultValue={description}
          />
          <InputCurrency
            label="Preço"
            placeholder="Preço"
            onChange={(value) => setPrice(value)}
            value={price || 0}
            required
          />
          <Button onClick={id ? handleEditService : handleCreateService}>
            {id ? 'Salvar edição' : 'Salvar'}
          </Button>
        </form>
      </div>
    </main>
  );
}
