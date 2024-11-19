import { useEffect, useState } from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { callApi } from "../api";
import { TEmployeePayment } from "../utils/types";
import LinkButton from "../components/LinkButton";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Button from "../components/Button";
import { formatCurrency, formatDate } from "../utils/formaters";
import Table from "../components/Table";

const columns = [
  'Data do pagamento',
  'Funcionário',
  'Valor',
  'Ações',
];

function EmployeesPaymentsActions({
  id,
}: {
  id: string;
}) {
  const handleDelete = () => {};

  return (
    <div className="flex gap-2">
    <LinkButton
      to={`/employee-payment?id=${id}`}
      className="bg-gray-400"
    >
      <div className="flex items-center gap-2">
        <MdEdit />
        Editar
      </div>
    </LinkButton>
    <Button
      onClick={handleDelete}
      className="bg-red-500"
    >
      <div className="flex items-center gap-2 justify-center">
        <FaTrash />
        Excluir
      </div>
    </Button>
  </div>
  )
}

export default function EmployeesPayments() {
  const [employeesPayments, setEmployeesPayments] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalPayments, setTotalPayments] = useState();

  const loadEmployeesPayments = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/employees-payments',
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedPayments = response.data.map(({
      id,
      paid_at,
      value,
      employee,
    }: TEmployeePayment) => [
      formatDate(paid_at),
      employee.name,
      formatCurrency(value),
      <EmployeesPaymentsActions id={id} />,
    ]);

    setTotalPayments(response.count)
    setEmployeesPayments(formattedPayments);
  };

  useEffect(() => {
    loadEmployeesPayments();
  }, []);

  return (
    <Main>
      <div className="mb-4">
      <PageTitle text="Pagamento dos funcionários" />
      </div>
      <div className="max-w-[800px] mx-auto">
        <Table
          columns={columns}
          data={employeesPayments}
          currentPage={page}
          setPage={setPage}
          totalItems={totalPayments}
        />
      </div>
    </Main>
  )
}