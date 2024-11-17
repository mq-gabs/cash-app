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
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

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

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(1);

  const loadEmployees = async () => {
    const response = await callApi({
      method: 'get',
      path: '/employees',
      params: {
        page,
      },
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
    setTotalEmployees(response.count);
  };

  useEffect(() => {
    loadEmployees();
  }, [page])

  return (
    <Main>
      <div className="flex justify-between items-center font-bold mb-4">
        <PageTitle text="Funcionários" />
        <div>
          <LinkButton
            to="/employee"
          >
            <div className="flex gap-2 items-center">
              <IoMdAddCircle />
              Novo
            </div>
          </LinkButton>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto">
        <Table
          columns={columns}
          data={employeesList}
          currentPage={page}
          setPage={setPage}
          totalItems={totalEmployees}
        />
      </div>
    </Main>
  )
}