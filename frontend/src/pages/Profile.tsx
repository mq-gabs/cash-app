import { useEffect, useState } from "react";
import Input from "../components/Input";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import { callApi } from "../api";
import { useUser } from "../hooks/use-user";
import toast from "react-hot-toast";

export default function Profile() {
  const { data: { id } } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useUser();


  const loadUserData = async () => {
    const response = await callApi(signOut, {
      method: 'get',
      path: `/users/${id}`,
    });
  
    if (!response) return;

    setName(response.name);
    setEmail(response.email);
  }

  const handleSave = async (e: any) => {
    e.preventDefault()

    setIsLoading(true);

    const response = await callApi(signOut, {
      method: 'patch',
      path: `/users/${id}`,
      data: {
        name,
        email,
        password,
      },
    });

    setIsLoading(false);

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Main>
      <PageTitle text="Perfil" />
      <div className="max-w-[800px] mx-auto">
        <form className="flex flex-col gap-2">
          <Input
            label="Nome"
            placeholder="Nome"
            onChange={v => setName(v)}
            defaultValue={name}
            required
          />
          <Input
            label="Email"
            placeholder="Email"
            onChange={v => setEmail(v)}
            defaultValue={email}
            required
          />
          <Input
            label="Senha"
            placeholder="Senha"
            onChange={v => setPassword(v)}
            defaultValue={password}
            required
            type="password"
          />
          <Input
            label="Repetir senha"
            placeholder="Repetir senha"
            onChange={v => setConfirmPassword(v)}
            defaultValue={confirmPassword}
            required
            type="password"
          />
          <Button
            onClick={handleSave}  
            isLoading={isLoading}
          >
            Salvar
          </Button>
        </form>
      </div>
    </Main>
  )
}