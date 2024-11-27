import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Table from "../components/Table";
import { callApi } from "../api";
import { ERolesLabels, TUser } from "../utils/types";
import { formatDate } from "../utils/formaters";
import LinkButton from "../components/LinkButton";
import { MdEdit } from "react-icons/md";
import Button from "../components/Button";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { userUser } from "../hooks/use-user";
import { IoMdAddCircle } from "react-icons/io";

const columns = ["Name", "Email", "Permissão", "Criado em", "Ações"];

const UserActions = ({ id, refresh }: { id: string; refresh: () => void }) => {
  const {
    data: { id: userId },
  } = userUser();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    const response = await callApi({
      method: "delete",
      path: `/users/${id}`,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    refresh();
  };

  return (
    <div className="flex gap-2">
      <LinkButton to={`/usuario?id=${id}`} className="!bg-gray-500">
        <div className="flex items-center gap-2">
          <MdEdit />
          Editar
        </div>
      </LinkButton>
      {userId !== id && (
        <Button onClick={handleClickToDelete} className="bg-red-500">
          <div className="flex items-center gap-2 justify-center">
            <FaTrash />
            Excluir
          </div>
        </Button>
      )}
      <ConfirmModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title="Excluir?"
        text="Deseja realmente excluir o usuário?"
        type="warning"
      />
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState<string[][]>([]);
  const [totalUsers, setTotalUsers] = useState<number>();
  const [page, setPage] = useState(0);

  const getUsers = async () => {
    const response = await callApi({
      method: "GET",
      path: "/users",
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedUsers = response.data.map(
      ({ id, name, email, role, created_at }: TUser) => [
        name,
        email,
        ERolesLabels[role],
        formatDate(created_at),
        <UserActions
          id={id}
          refresh={() => {
            setPage(0);
            getUsers();
          }}
        />,
      ]
    );

    setUsers(formattedUsers);
    setTotalUsers(response.count);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="p-4">
      <div className="mb-4 flex gap-2 justify-between">
        <PageTitle text="Usuários" />
        <div>
          <LinkButton
            to="/usuario"
          >
            <div className="flex gap-2 items-center">
              <IoMdAddCircle />
              Novo
            </div>
          </LinkButton>
        </div>
      </div>
      <Table
        columns={columns}
        data={users}
        currentPage={page}
        setPage={setPage}
        totalItems={totalUsers}
      />
    </main>
  );
}
