import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";
import { callApi } from "../api";
import toast from "react-hot-toast";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: 'post',
      path: '/users',
      data: {
        name,
        password,
        email,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    nav('/');
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-4 w-[300px] rounded shadow-slate-700 shadow-2xl">
        <h1 className="text-2xl text-center font-bold">Cadastrar</h1>
        <form className="flex flex-col gap-2">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={value => setName(value)}
          />
          <Input
            label="Email"
            placeholder="Email"
            onChange={value => setEmail(value)}
          />
          <Input
            label="Senha"
            placeholder="Senha"
            onChange={value => setPassword(value)}
            type="password"
          />
          <p>
            Já tem cadastro?
            {' '}
            <Link
              to="/login"
              className="underline text-blue-500"
            >
              Faça o login!
            </Link>
          </p>
          <Button
            onClick={handleRegister}
          >
            Entrar
          </Button>
        </form>
      </div>
    </main>
  )
}