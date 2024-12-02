import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Main from "../components/Main";
import Input from "../components/Input";
import Button from "../components/Button";
import { useQuery } from "../hooks/use-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "../components/Select";
import { ERoles, ERolesLabels } from "../utils/types";
import { useApi } from "../hooks/use-api";

const roleOptions = [
  {
    id: "1",
    name: ERoles.DEFAULT,
    label: ERolesLabels.DEFAULT,
  },
  {
    id: "2",
    name: ERoles.ADMIN,
    label: ERolesLabels.ADMIN,
  },
];

export default function UsersFormPage() {
  const { id } = useQuery();
  const nav = useNavigate();
  const { callApi, isLoading } = useApi();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<ERoles>(ERoles.DEFAULT);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = () => {
    nav("/usuarios");
  };

  const checkPassword = () => {
    if (password && !confirmPassword) {
      toast.error("Digite a senha novamente.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas são diferentes!");
      return false;
    }

    return true;
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!checkPassword()) return;

    const response = await callApi({
      method: "POST",
      path: "/users",
      data: {
        name,
        email,
        password,
        role,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    redirect();
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    if (!checkPassword()) return;

    const response = await callApi({
      method: "PATCH",
      path: `/users/${id}`,
      data: {
        name,
        email,
        password,
        role,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    redirect();
  };

  const loadUserData = async () => {
    const response = await callApi({
      method: "get",
      path: `/users/${id}`,
    });

    if (!response) return;

    setName(response.name);
    setEmail(response.email);
    setRole(response.role);
  };

  useEffect(() => {
    if (id) {
      loadUserData();
    }
  }, []);

  return (
    <Main>
      <PageTitle
        text={id ? "Editar usuário" : "Novo usuário"}
        backRoute="/usuarios"
      />
      <div className="max-w-[800px] mx-auto">
        <form className="flex flex-col gap-2">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={(v) => setName(v)}
            defaultValue={name}
            required
          />
          <Input
            label="Email"
            placeholder="Email"
            onChange={(v) => setEmail(v)}
            defaultValue={email}
            required
          />
          <Input
            label="Senha"
            placeholder="Senha"
            onChange={(v) => setPassword(v)}
            defaultValue={password}
            required
            type="password"
          />
          <Input
            label="Repetir senha"
            placeholder="Repetir senha"
            onChange={(v) => setConfirmPassword(v)}
            defaultValue={confirmPassword}
            required
            type="password"
          />
          <Select
            options={roleOptions}
            label="Permissão"
            onChange={(v) => setRole(v)}
            value={role}
          />
          <Button
            onClick={id ? handleUpdate : handleCreate}
            isLoading={isLoading}
          >
            {id ? "Salvar edição" : "Salvar"}
          </Button>
        </form>
      </div>
    </Main>
  );
}
