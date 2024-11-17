import { IoMdAddCircle } from "react-icons/io";
import LinkButton from "../components/LinkButton";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { callApi } from "../api";
import { TOtherPayment } from "../utils/types";
import { formatCurrency, formatDate } from "../utils/formaters";
import Table from "../components/Table";
import Button from "../components/Button";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const columns = [
  'Título',
  'Descrição',
  'Pago em',
  'Valor',
  'Ações',
];

function OtherPaymentsActions({
  id
}: {
  id: string
}) {
  const handleClickToDeletePayment = () => { };

  return (
    <div className="flex gap-2">
      <LinkButton
        to={`/other-payment?id=${id}`}
        className="bg-gray-400"
      >
        <div className="flex gap-2 items-center">
          <MdEdit />
          Editar
        </div>
      </LinkButton>
      <Button
        className="bg-red-500"
        onClick={handleClickToDeletePayment}
      >
        <div className="flex gap-2 items-center">
          <FaTrash />
          Excluir
        </div>
      </Button>
    </div>
  )
}

export default function OtherPayments() {
  const [payments, setPayments] = useState<string[][]>([]);
  const [totalPayments, setTotalPayments] = useState<number>();
  const [page, setPage] = useState(0);

  const loadPayments = async () => {
    const response = await callApi({
      method: 'GET',
      path: '/other-payments',
      params: {
        page,
      },
    });

    if (!response) return;

    const formattedPayments = response.data.map(({
      id,
      title,
      description,
      paid_at,
      value,
    }: TOtherPayment) => [
        title,
        description,
        formatDate(paid_at),
        formatCurrency(value),
        <OtherPaymentsActions id={id} />,
      ]);

    setPayments(formattedPayments);
    setTotalPayments(response.count);
  };

  useEffect(() => {
    loadPayments();
  }, [page]);

  return (
    <Main>
      <div className="flex justify-between items-center mb-4">
        <PageTitle text="Outros gastos" />
        <LinkButton
          to="/other-payment"
        >
          <div className="flex gap-2 items-center">
            <IoMdAddCircle />
            Novo
          </div>
        </LinkButton>
      </div>
      <div className="max-w-[800px] mx-auto">
        <Table
          columns={columns}
          data={payments}
          currentPage={page}
          setPage={setPage}
          totalItems={totalPayments}
        />
      </div>
    </Main>
  )
}