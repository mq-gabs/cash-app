import { MdEdit } from "react-icons/md";
import { formatCurrency } from "../utils/formaters";
import { TService } from "../utils/types"
import Button from "./Button";
import { FaTrash } from "react-icons/fa";
import LinkButton from "./LinkButton";

interface IServiceCard {
  data: TService;
}

export default function ServiceCard({
  data: {
    id,
    name,
    price,
    description,
  },
}: IServiceCard) {
  const handleClickToDelete = () => {

  }

  return (
    <div className="border rounded p-4">
      <p className="font-semibold text-lg">{name}</p>
      <p>{description}</p>
      <p className=" text-primary font-bold">{formatCurrency(price)}</p>
      <div className="flex gap-2">
        <LinkButton
          to={`/service?id=${id}`}
          className="bg-gray-400"
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
    </div>
  )
}