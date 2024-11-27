import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../api";
import toast from "react-hot-toast";
import { userUser } from "../hooks/use-user";

export default function Login() {
  const { signIn } = userUser();
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: "POST",
      path: '/auth',
      data: {
        email,
        password,
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    signIn(response.data);

    nav("/");
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-4 w-[300px] rounded shadow-slate-700 shadow-2xl">
        <h1 className="text-2xl text-center font-bold">Fazer login</h1>
        <form className="flex flex-col gap-2">
          <Input
            label="Email"
            placeholder="Email"
            onChange={value => setEmail(value)}
            hideAsterisk
          />
          <Input
            label="Senha"
            placeholder="Senha"
            onChange={value => setPassword(value)}
            type="password"
            hideAsterisk
          />
          <p>
            Não tem cadastro?
            {' '}
            <Link
              to="/registrar"
              className="underline text-blue-500"
            >
              Crie agora!
            </Link>
          </p>
          <Button
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </form>
      </div>
    </main>
  )
}