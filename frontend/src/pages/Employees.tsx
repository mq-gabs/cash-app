import { useEffect, useState } from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { callApi } from "../api";
import { TEmployee } from "../utils/types";
import { formatCurrency, formatDate } from "../utils/formaters";
import Table from "../components/Table";
import { IoMdAddCircle } from "react-icons/io";
import LinkButton from "../components/LinkButton";
import Button from "../components/Button";

const columns = [
  'Nome',
  'Cargo',
  'Salário',
  'Criado em',
  'Ações',
];

function EmployeeActions({
  id,
}: {
  id: string
}) {
  const handleDelete = () => { }

  return (
    <div className="flex gap-2">
      <LinkButton
        to={`/employee?id=${id}`}
      >
        Editar
      </LinkButton>
      <Button
        onClick={handleDelete}
        className="bg-red-500"
      >
        Excluir
      </Button>
    </div>
  )
}

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<string[][]>([]);

  const loadEmployees = async () => {
    const response = await callApi({
      method: 'get',
      path: '/employees',
    });

    if (!response) return;

    const formattedData = response.data.map(({
      id,
      name,
      role,
      wage,
      created_at,
    }: TEmployee) => [
        name,
        role,
        formatCurrency(wage),
        formatDate(created_at),
        <EmployeeActions id={id} />
      ]);

    setEmployeesList(formattedData);
  };

  useEffect(() => {
    loadEmployees();
  }, [])

  return (
    <Main>
      <div className="flex justify-between items-center font-bold">
        <PageTitle text="Funcionários" />
        <div>
          <LinkButton
            to="/employee"
          >
            <div className="flex gap-2 items-center">
              <IoMdAddCircle />
              Novo funcionário
            </div>
          </LinkButton>
        </div>
      </div>
      <Table
        columns={columns}
        data={employeesList}
      />
    </Main>
  )
}