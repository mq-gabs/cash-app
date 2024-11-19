import { useEffect, useState } from "react";
import LinkButton from "../components/LinkButton";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { IoMdAddCircle } from "react-icons/io";
import { callApi } from "../api";
import { EPaymentTypeLabels, TServicePayments } from "../utils/types";
import { formatCurrency, formatDate } from "../utils/formaters";
import Button from "../components/Button";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Table from "../components/Table";

const columns = [
  'Data',
  'Serviços',
  'Tipo de pagamento',
  'Valor',
  'Ações',
];

function ServicePaymentsActions({
  id
}: {
  id: string
}) {
  const handleDelete = () => { };

  return (
    <div className="flex gap-2">
      <LinkButton
        to={`/service-payment?id=${id}`}
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

export default function ServicePayments() {
  const [servicePayments, setServicePayments] = useState<string[][]>([]);
  const [page, setPage] = useState(0);
  const [totalPayments, setTotalPayments] = useState();

  const loadServicePayments = async () => {
    const response = await callApi({
      method: 'GET',
      path: `/service-payments`,
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedPayments = response.data.map(({
      id,
      value,
      created_at,
      payment_type,
      services,
    }: TServicePayments) => [
        formatDate(created_at),
        services.map(({ name }) => name).join(', '),
        EPaymentTypeLabels[payment_type],
        formatCurrency(value),
        <ServicePaymentsActions id={id} />,
      ]);

    setServicePayments(formattedPayments);
    setTotalPayments(response.count);
  }

  useEffect(() => {
    loadServicePayments();
  }, []);

  return (
    <Main>
      <div className="flex justify-between items-center mb-4">
        <PageTitle text="Atendimentos" />
        <LinkButton
          to="/service-payment"
        >
          <div className="flex gap-2 items-center">

            <IoMdAddCircle />
            Novo atendimento
          </div>
        </LinkButton>
      </div>
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
  )
}