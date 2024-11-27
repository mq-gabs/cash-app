import { MdEdit } from "react-icons/md";
import { formatCurrency, formatDate } from "../utils/formaters";
import { TService } from "../utils/types"
import Button from "./Button";
import { FaTrash } from "react-icons/fa";
import LinkButton from "./LinkButton";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { callApi } from "../api";
import toast from "react-hot-toast";
import { useUser } from "../hooks/use-user";

interface IServiceCard {
  data: TService;
  refresh: () => void;
}

export default function ServiceCard({
  data: {
    id,
    name,
    price,
    description,
    updated_at,
  },
  refresh,
}: IServiceCard) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { signOut } = useUser();

  const handleDelete = async () => {
    const response = await callApi(signOut, {
      method: 'delete',
      path: `/services/${id}`,
    });

    if (!response) return;

    toast.success(response?.message || 'Sucesso!');

    setOpenDeleteModal(false);
    refresh();
  }

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  }

  return (
    <div className="border rounded p-4 shadow-lg h-full flex flex-col justify-between">
      <div className="flex flex-col gap-2 justify-between h-full">
      <div>

      <p className="font-semibold text-lg">{name}</p>
      <p>{description}</p>
      </div>
      <div>

      <p className="text-primary font-bold">{formatCurrency(price)}</p>
      <p className="text-xs text-gray-500 text-right">Útima atualização {formatDate(updated_at)}</p>
      </div>
      </div>
      <div className="flex gap-2 mt-4">
        <LinkButton
          to={`/servico?id=${id}`}
          className="!bg-gray-500"
        >
          <div className="flex gap-2 items-center">

            <MdEdit />
            Editar
          </div>
        </LinkButton>
        <Button
          onClick={handleClickToDelete}
          className="bg-red-500"
        >
          <div className="flex gap-2 items-center">

            <FaTrash />
            Excluir
          </div>
        </Button>
      </div>
      <ConfirmModal
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        open={openDeleteModal}
        title="Excluir?"
        text="Deseja realmente excluir o serviço?"
        type="warning"
      />
    </div>
  )
}