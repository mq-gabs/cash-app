import { formatCurrency } from "../utils/formaters";
import { TService } from "../utils/types"
import Button from "./Button";

interface IServiceCard {
  data: TService;
}

export default function ServiceCard({
  data: {
    name,
    price,
    description,
  },
}: IServiceCard) {
  const handleClickEditService = () => { };

  return (
    <div className="border rounded p-4">
      <p className="font-semibold text-lg">{name}</p>
      <p>{description}</p>
      <p className=" text-primary font-bold">{formatCurrency(price)}</p>
      <div className="flex gap-2">
        <Button
          onClick={handleClickEditService}
        >
          Editar
        </Button>
        <Button
          onClick={handleClickEditService}
          className="bg-red-500"
        >
          Excluir
        </Button>
      </div>
    </div>
  )
}