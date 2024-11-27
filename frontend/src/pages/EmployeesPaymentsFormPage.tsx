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

export default function EmployeesPaymentsFormPage() {
  const { id, employeeId } = useQuery();
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [wage, setWage] = useState<number>();
  const [paidAt, setPaidAt] = useState('');

  const redirect = () => {
    nav('/pagamentos');
  }

  const handleSavePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: 'POST',
      path: '/employees-payments',
      data: {
        value: (wage || 0) * 100,
        paid_at: paidAt,
        employee: {
          id: employeeId,
        },
      }
    });

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    redirect();
  };

  const handleUpdatePayment = async (e: any) => {
    e.preventDefault();

    const response = await callApi({
      method: 'PATCH',
      path: `/employees-payments/${id}`,
      data: {
        value: (wage || 0) * 100,
        paid_at: paidAt,
      }
    });

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    redirect();
  }

  const loadEmployeeInfo = async () => {
    const response = await callApi({
      method: 'GET',
      path: `/employees/${employeeId}`,
    });

    if (!response) {
      toast.error('Funcionário não encontrado!');
      redirect();
      return;
    };

    setName(response.name);
    setWage(response.wage / 100);
  };

  const loadEmployeePaymentInfo = async () => {
    const response = await callApi({
      method: 'GET',
      path: `/employees-payments/${id}`,
    });

    if (!response) {
      toast.error('Pagamento não encontrado!');
      redirect();
      return;
    }

    setName(response?.employee?.name);
    setWage(response.value / 100);
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
          <Input
            label="Valor"
            placeholder="Valor"
            defaultValue={wage}
            required
            onChange={(v) => setWage(v)}
          />
          <InputDate
            label="Data do pagamento"
            setValue={v => setPaidAt(v)}
            value={paidAt}
          />
          <Button
            onClick={id ? handleUpdatePayment : handleSavePayment}
          >
            {id ? 'Salvar edição' : 'Salvar'}
          </Button>
        </form>
      </div>
    </Main>
  )
}