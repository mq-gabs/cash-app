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
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { useUser } from "../hooks/use-user";

const columns = ["Pago em", "Funcionário", "Valor", "Ações"];

function EmployeesPaymentsActions({
  id,
  refresh,
}: {
  id: string;
  refresh: () => void;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { signOut } = useUser();

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    const response = await callApi(signOut, {
      method: "delete",
      path: `/employees-payments/${id}`,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setOpenDeleteModal(false);
    refresh();
  };

  return (
    <div className="flex gap-2">
      <LinkButton to={`/pagamento?id=${id}`} className="!bg-gray-500">
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
        text="Deseja realmente excluir o pagamento?"
        type="warning"
      />
    </div>
  );
}

export default function EmployeesPayments() {
  const [employeesPayments, setEmployeesPayments] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalPayments, setTotalPayments] = useState();
  const { signOut } = useUser();

  const loadEmployeesPayments = async () => {
    const response = await callApi(signOut, {
      method: "GET",
      path: "/employees-payments",
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedPayments = response.data.map(
      ({ id, paid_at, value, employee }: TEmployeePayment) => [
        formatDate(paid_at),
        employee?.name || "Não encontrado",
        formatCurrency(value),
        <EmployeesPaymentsActions
          id={id}
          refresh={() => {
            loadEmployeesPayments();
            setPage(0);
          }}
        />,
      ]
    );

    setTotalPayments(response.count);
    setEmployeesPayments(formattedPayments);
  };

  useEffect(() => {
    loadEmployeesPayments();
  }, [page]);

  return (
    <Main>
      <div className="mb-4">
        <PageTitle text="Pagamentos" />
      </div>
      <div>
        <Table
          columns={columns}
          data={employeesPayments}
          currentPage={page}
          setPage={setPage}
          totalItems={totalPayments}
        />
      </div>
    </Main>
  );
}
