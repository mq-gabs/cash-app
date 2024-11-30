import { useEffect, useState } from "react";
import LinkButton from "../components/LinkButton";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { IoMdAddCircle } from "react-icons/io";
import { EPaymentTypeLabels, TServicePayments } from "../utils/types";
import { formatCurrency, formatDate } from "../utils/formaters";
import Button from "../components/Button";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Table from "../components/Table";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { useApi } from "../hooks/use-api";
import { useFilters } from "../hooks/use-filters";

const columns = [
  "Cliente",
  "Serviços",
  "Valor total",
  "Valor pago",
  "Saldo",
  "Tipo de pagamento",
  "Pago em",
  "Ações",
];

function ServicePaymentsActions({
  id,
  refresh,
}: {
  id: string;
  refresh: () => void;
}) {
  const { callApi } = useApi();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDelete = async () => {
    const response = await callApi({
      path: `/service-payments/${id}`,
      method: "delete",
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setOpenDeleteModal(false);
    refresh();
  };

  const handleClickToDelete = () => {
    setOpenDeleteModal(true);
  };

  return (
    <div className="flex gap-2">
      <LinkButton to={`/atendimento?id=${id}`} className="!bg-gray-500">
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
        text="Deseja realmente excluir o atendimento?"
        title="Excluir?"
        type="warning"
      />
    </div>
  );
}

export default function ServicePayments() {
  const { callApi } = useApi();

  const [servicePayments, setServicePayments] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalPayments, setTotalPayments] = useState();

  const loadServicePayments = async (filters: Object = {}) => {
    const response = await callApi({
      method: "GET",
      path: `/service-payments`,
      params: {
        page,
        ...filters,
      },
    });

    if (!response) return;

    const formattedPayments = response.data.map(
      ({
        id,
        value,
        paid_at,
        customer,
        services,
        payment_type,
      }: TServicePayments) => {
        const total = services.reduce((acc, curr) => acc + curr.price, 0);

        return [
          customer?.name || "Não selecionado",
          services.map(({ name }) => name).join(", "),
          formatCurrency(total),
          formatCurrency(value),
          formatCurrency(value - total),
          EPaymentTypeLabels[payment_type],
          formatDate(paid_at),
          <ServicePaymentsActions
            id={id}
            refresh={() => {
              setPage(0);
              loadServicePayments();
            }}
          />,
        ];
      }
    );

    setServicePayments(formattedPayments);
    setTotalPayments(response.count);
  };

  const { FilterEl } = useFilters(
    [
      {
        label: "Cliente",
        name: "customer_name",
        placeholder: "Cliente",
      },
    ],
    loadServicePayments
  );

  useEffect(() => {
    loadServicePayments();
  }, [page]);

  return (
    <Main>
      <div className="flex justify-between items-center mb-4">
        <PageTitle text="Atendimentos" />
        <LinkButton to="/atendimento">
          <div className="flex gap-2 items-center">
            <IoMdAddCircle />
            Novo atendimento
          </div>
        </LinkButton>
      </div>
      <div className="mb-2">{FilterEl}</div>
      <div>
        <Table
          columns={columns}
          data={servicePayments}
          currentPage={page}
          setPage={setPage}
          totalItems={totalPayments}
        />
      </div>
    </Main>
  );
}
