import toast from "react-hot-toast";
import { callApi } from "../api";
import Main from "../components/Main"
import PageTitle from "../components/PageTitle"
import { useQuery } from "../hooks/use-query"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import InputDate from "../components/InputDate";
import Button from "../components/Button";
import InputCurrency from "../components/InputCurrency";
import { useUser } from "../hooks/use-user";

export default function EmployeesPaymentsFormPage() {
  const { id, employeeId } = useQuery();
  const nav = useNavigate();

  const { signOut } = useUser();

  

  const [name, setName] = useState('');
  const [wage, setWage] = useState<number>();
  const [paidAt, setPaidAt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const redirect = () => {
    nav('/pagamentos');
  }

  const handleSavePayment = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await callApi(signOut, {
      method: 'POST',
      path: '/employees-payments',
      data: {
        value: (wage || 0),
        paid_at: paidAt,
        employee: {
          id: employeeId,
        },
      }
    });
    setIsLoading(false);

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    redirect();
  };

  const handleUpdatePayment = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await callApi(signOut, {
      method: 'PATCH',
      path: `/employees-payments/${id}`,
      data: {
        value: (wage || 0),
        paid_at: paidAt,
      }
    });
    setIsLoading(false);

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    redirect();
  }

  const loadEmployeeInfo = async () => {
    const response = await callApi(signOut, {
      method: 'GET',
      path: `/employees/${employeeId}`,
    });

    if (!response) {
      toast.error('Funcionário não encontrado!');
      redirect();
      return;
    };

    setName(response.name);
    setWage(response.wage);
  };

  const loadEmployeePaymentInfo = async () => {
    const response = await callApi(signOut, {
      method: 'GET',
      path: `/employees-payments/${id}`,
    });

    if (!response) {
      toast.error('Pagamento não encontrado!');
      redirect();
      return;
    }

    setName(response?.employee?.name);
    setWage(response.value);
    setPaidAt(response.paid_at);
  };

  useEffect(() => {
    if (id) {
      loadEmployeePaymentInfo();
      return;
    }

    if (employeeId) {
      loadEmployeeInfo();
      return;
    }

    toast.error('Nenhum dado encontrado!');
    redirect();
  }, [])

  return (
    <Main>
      <PageTitle text={id ? 'Editar pagamento' : 'Registrar pagamento'} backRoute="/pagamentos" />
      <div className="max-w-[800px] mx-auto">
        <form className="flex flex-col gap-2">
          <Input
            label="Nome"
            placeholder="Nome"
            defaultValue={name}
            required
            onChange={() => {}}
            disabled
          />
          <InputCurrency
            label="Valor"
            placeholder="Valor"
            value={wage || 0}
            required
            onChange={(v) => setWage(v)}
          />
          <InputDate
            label="Data do pagamento"
            setValue={v => setPaidAt(v)}
            value={paidAt}
          />
          <Button
            isLoading={isLoading}
            onClick={id ? handleUpdatePayment : handleSavePayment}
          >
            {id ? 'Salvar edição' : 'Salvar'}
          </Button>
        </form>
      </div>
    </Main>
  )
}