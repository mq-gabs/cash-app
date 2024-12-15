import { IoMdAddCircle } from "react-icons/io";
import LinkButton from "../components/LinkButton";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/use-api";
import { formatCurrency, formatDate } from "../utils/formaters";
import { EPaymentTypeLabels, TCashier, TServicePayments } from "../utils/types";
import { MdEdit } from "react-icons/md";
import Button from "../components/Button";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import Table from "../components/Table";
import InputCurrency from "../components/InputCurrency";
import { useUser } from "../hooks/use-user";
import Modal from "../components/Modal";

const columns = [
  "Cliente",
  "Serviços",
  "Valor pago",
  "Valor total",
  "Diferença",
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

export default function Cashier() {
  const { data } = useUser();
  const { callApi, isLoading } = useApi();

  const [cashier, setCashier] = useState<TCashier | null>(null);
  const [servicesPayments, setServicesPayments] = useState<any[][]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(1);
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const loadServicePayments = async (cashierId?: string) => {
    if (!cashierId && !cashier) return;

    const response = await callApi({
      method: "GET",
      path: "/service-payments",
      params: {
        cashier_id: cashierId || cashier?.id,
        page,
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
          formatCurrency(value),
          formatCurrency(total),
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

    setServicesPayments(formattedPayments);
    setTotalItems(response.count);
  };

  useEffect(() => {
    loadServicePayments();
  }, [page]);

  const getOpenCashier = async () => {
    const response = await callApi({
      method: "GET",
      path: "/cashier",
    });

    if (!response) return;

    setCashier(response?.cashier);
    loadServicePayments(response?.cashier?.id);
  };

  useEffect(() => {
    getOpenCashier();
  }, []);

  const handleCloseCashier = async () => {
    const response = await callApi({
      method: "PATCH",
      path: "/cashier/close",
      data: {
        end_value: value,
        closed_by: {
          id: data.id,
        },
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setValue(0);
    setCashier(null);
    setOpenModal(false);
    setServicesPayments([]);
  };

  const handleOpenCashier = async () => {
    const response = await callApi({
      method: "POST",
      path: "/cashier/open",
      data: {
        start_value: value,
        open_by: {
          id: data.id,
        },
      },
    });

    if (!response) return;

    toast.success(response?.message || "Sucesso!");

    setCashier(response.data);
    setValue(0);
  };

  const handleClickCloseCashier = () => {
    setOpenModal(true);
  };

  return (
    <Main>
      <div className="flex gap-2 justify-between items-center mb-4">
        <PageTitle text={!!cashier ? "Caixa aberto" : "Caixa fechado"} />
        {!!cashier && (
          <div className="flex gap-2 items-center">
            <Button className="bg-red-500" onClick={handleClickCloseCashier}>
              Fechar caixa
            </Button>
            <LinkButton to="/atendimento">
              <div className="flex gap-2 items-center">
                <IoMdAddCircle />
                Novo atendimento
              </div>
            </LinkButton>
          </div>
        )}
      </div>
      {!!cashier && (
        <div>
          <Table
            columns={columns}
            currentPage={page}
            setPage={setPage}
            data={servicesPayments}
            isLoading={isLoading}
            totalItems={totalItems}
          />
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            title="Fechar caixa"
          >
            <div className="flex flex-col gap-2">
              <InputCurrency
                label="Valor final"
                placeholder="Valor final"
                value={value}
                onChange={(v) => setValue(v)}
                hideAsterisk
              />
              <Button onClick={handleCloseCashier}>Fechar caixa</Button>
            </div>
          </Modal>
        </div>
      )}
      {!cashier && (
        <div className="max-w-[600px] mx-auto flex flex-col gap-2">
          <p>Insira o valor inicial do caixa:</p>
          <InputCurrency
            label="Valor inicial"
            placeholder="Valor inicial"
            hideAsterisk
            value={value}
            onChange={(v) => setValue(v)}
          />
          <Button onClick={handleOpenCashier}>Abrir caixa</Button>
        </div>
      )}
    </Main>
  );
}
