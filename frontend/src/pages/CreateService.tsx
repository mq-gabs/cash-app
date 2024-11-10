import { useState } from "react";
import Input from "../components/Input";
import { callApi } from "../api";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
  const nav = useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const handleSavePrice = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: 'post',
      path: '/services',
      data: {
        name,
        description,
        price: Number(price),
      },
    });

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    nav('/services')
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">Criar serviço</h1>
      <div className="p-4 mx-auto max-w-[800px]">
        <form className="flex flex-col gap-4">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={value => setName(value)}
          />
          <Input
            label="Descrição"
            placeholder="Descrição"
            onChange={value => setDescription(value)}
          />
          <Input
            label="Preço"
            placeholder="Preço"
            onChange={value => setPrice(value)}
            type="number"
          />
          <Button
            onClick={handleSavePrice}
          >
            Salvar
          </Button>
        </form>
      </div>
    </main>
  )
}