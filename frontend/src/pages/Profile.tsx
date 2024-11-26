import { useEffect, useState } from "react";
import Input from "../components/Input";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loadUserData = async () => {
  }

  const handleSave = async () => {
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Main>
      <PageTitle text="Perfil" />
      <div>
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
          >
            Salvar
          </Button>
        </form>
      </div>
    </Main>
  )
}