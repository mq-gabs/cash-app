import { useEffect, useState } from "react";
import Input from "../components/Input";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useQuery } from "../hooks/use-query";
import Button from "../components/Button";
import { callApi } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EmployeesFormPage() {
  const { id } = useQuery();

  const nav = useNavigate();

  const [name, setName] = useState("");
  const [wage, setWage] = useState<number>();
  const [role, setRole] = useState("");

  const onFinish = () => {
    nav("/employees");
  };

  const isValidData = () => {
    if (!name || !wage || !role) {
      toast.error("Preencha todos campos!");
      return false;
    }

    return true;
  };

  const handleCreateEmployee = async (e: any) => {
    e.preventDefault();

    if (!isValidData()) {
      return;
    }

    const response = await callApi({
      method: "post",
      path: "/employees",
      data: {
        name,
        wage: (wage || 0) * 100,
        role,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");
    onFinish();
  };

  const handleEditEmployee = async (e: any) => {
    e.preventDefault();

    if (!isValidData()) {
      return;
    }

    const response = await callApi({
      method: "PATCH",
      path: `/employees/${id}`,
      data: {
        name,
        role,
        wage: (wage || 0) * 100,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    onFinish();
  };

  const loadEmployeeData = async () => {
    const response = await callApi({
      method: "GET",
      path: `/employees/${id}`,
    });

    if (!response) return;

    setName(response.name);
    setWage(response.wage / 100);
    setRole(response.role);
  };

  useEffect(() => {
    if (!!id) {
      loadEmployeeData();
    }
  }, []);

  return (
    <Main>
      <PageTitle backRoute="/employees" text={id ? "Editar dados do funcionário" : "Cadastrar novo funcionário"} />
      <div className="max-w-[800px] mx-auto">
        <form className="flex flex-col gap-4">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={(v) => setName(v)}
            defaultValue={name}
            required
          />
          <Input
            label="Cargo"
            placeholder="Cargo"
            onChange={(v) => setRole(v)}
            defaultValue={role}
            required
          />
          <Input
            label="Salário"
            placeholder="Salário"
            onChange={(v) => setWage(v)}
            type="number"
            defaultValue={wage}
            required
          />
          <Button onClick={id ? handleEditEmployee : handleCreateEmployee}>
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
