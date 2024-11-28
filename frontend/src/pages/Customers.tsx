import { IoMdAddCircle } from "react-icons/io";
import LinkButton from "../components/LinkButton";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/use-api";
import { TCustomer } from "../utils/types";
import { formatDate } from "../utils/formaters";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import Button from "../components/Button";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";
import Table from "../components/Table";

const columns = ["Nome", "Telefone", "Endereço", "Criado em", "Ações"];

function CustomersActions({
  id,
  refresh,
}: {
  id: string;
  refresh: () => void;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { callApi } = useApi();

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    const response = await callApi({
      method: "delete",
      path: `/customers/${id}`,
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setOpenDeleteModal(false);
    refresh();
  };

  return (
    <div className="flex gap-2">
      <LinkButton to={`/cliente?id=${id}`} className="!bg-gray-500">
        <div className="flex gap-2 items-center">
          <MdEdit />
          Editar
        </div>
      </LinkButton>
      <Button className="bg-red-500" onClick={handleClickToDelete}>
        <div className="flex gap-2 items-center">
          <FaTrash />
          Excluir
        </div>
      </Button>
      <ConfirmModal
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        open={openDeleteModal}
        title="Excluir?"
        text="Deseja realmente excluir o cliente?"
        type="warning"
      />
    </div>
  );
}

export default function Customers() {
  const [customersData, setCustomersData] = useState<any[][]>([]);
  const [totalCustomers, setTotalCustomers] = useState(1);
  const { callApi } = useApi();
  const [page, setPage] = useState(0);

  const loadCustomers = async () => {
    const response = await callApi({
      method: "GET",
      path: "/customers",
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedCustomers = response.data.map(
      ({ id, name, contact, address, created_at }: TCustomer) => [
        name,
        contact,
        address,
        formatDate(created_at),
        <CustomersActions
          id={id}
          refresh={() => {
            setPage(0);
            loadCustomers();
          }}
        />,
      ]
    );

    setCustomersData(formattedCustomers);
    setTotalCustomers(response.count);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <Main>
      <div className="flex gap-2 justify-between items-center mb-4">
        <PageTitle text="Clientes" />
        <div>
          <LinkButton to="/cliente">
            <div className="flex gap-2 items-center">
              <IoMdAddCircle />
              Novo cliente
            </div>
          </LinkButton>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          data={customersData}
          currentPage={page}
          setPage={setPage}
          totalItems={totalCustomers}
        />
      </div>
    </Main>
  );
}
