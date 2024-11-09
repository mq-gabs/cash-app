import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log({ email, password });
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
          />
          <Input
            label="Senha"
            placeholder="Senha"
            onChange={value => setPassword(value)}
            type="password"
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