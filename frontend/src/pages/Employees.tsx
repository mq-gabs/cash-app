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
import { BsCash } from "react-icons/bs";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { useUser } from "../hooks/use-user";

const columns = ["Nome", "Cargo", "Salário", "Criado em", "Ações"];

function EmployeeActions({ id, refresh }: { id: string; refresh: () => void }) {
  const { signOut } = useUser();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    const response = await callApi(signOut, {
      method: "delete",
      path: `/employees/${id}`,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setOpenDeleteModal(false);
    refresh();
  };

  return (
    <div className="flex gap-2">
      <LinkButton to={`/pagamento?employeeId=${id}`} className="!bg-green-600">
        <div className="flex items-center gap-2">
          <BsCash />
          Pagar
        </div>
      </LinkButton>
      <LinkButton to={`/funcionario?id=${id}`} className="!bg-gray-500">
        <div className="flex items-center gap-2">
          <MdEdit />
          Editar
        </div>
      </LinkButton>
      <Button onClick={handleClickToDelete} className="bg-red-500">
        <div className="flex items-center gap-2 justify-center">
          <FaTrash />
          Excluir
        </div>
      </Button>
      <ConfirmModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title="Excluir?"
        text="Deseja realmente excluir o funcionário?"
        type="warning"
      />
    </div>
  );
}

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(1);
  const { signOut } = useUser();

  const loadEmployees = async () => {
    const response = await callApi(signOut, {
      method: "get",
      path: "/employees",
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedData = response.data.map(
      ({ id, name, role, wage, created_at }: TEmployee) => [
        name,
        role,
        formatCurrency(wage),
        formatDate(created_at),
        <EmployeeActions
          id={id}
          refresh={() => {
            setPage(0);
            loadEmployees();
          }}
        />,
      ]
    );

    setEmployeesList(formattedData);
    setTotalEmployees(response.count);
  };

  useEffect(() => {
    loadEmployees();
  }, [page]);

  return (
    <Main>
      <div className="flex justify-between items-center font-bold mb-4">
        <PageTitle text="Funcionários" />
        <div>
          <LinkButton to="/funcionario">
            <div className="flex gap-2 items-center">
              <IoMdAddCircle />
              Novo
            </div>
          </LinkButton>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          data={employeesList}
          currentPage={page}
          setPage={setPage}
          totalItems={totalEmployees}
        />
      </div>
    </Main>
  );
}
