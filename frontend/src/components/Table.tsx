import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Button from "./Button";
import { PiEmptyBold } from "react-icons/pi";

interface ITable {
  columns: string[];
  data: any[][];
  setPage: (arg: number) => void
  totalItems: number;
  currentPage: number;
}

const PAGE_SIZE = 10;

export default function Table({
  columns = [],
  data = [],
  currentPage = 0,
  setPage,
  totalItems = 1,
}: ITable) {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handleNext = () => {
    if ((currentPage + 1) < totalPages) {
      setPage(currentPage + 1);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  }

  return (
    <div>

      <table className="border w-full">
        <tr className="bg-primary text-white">
          {columns?.map(col => (
            <th className="p-2 text-left">
              {col}
            </th>
          ))}
        </tr>
        {data.length !== 0 && data?.map(row => (
          <tr className="[&:nth-child(odd)]:bg-gray-200 [&:nth-child(even)]:bg-white">
            {row?.map(cel => (
              <td className="p-2">
                {cel}
              </td>
            ))}
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length}>

              <div className="h-[300px] w-full flex justify-center items-center">
                <p className="text-gray-500 text-xl flex gap-2 items-center">
                <PiEmptyBold />
                  Nenhum registro encontrado...
                </p>
              </div>
            </td>
          </tr>
        )}
      </table>
      {
        data.length !== 0 && (
          <div className="flex justify-between mt-2">
            <Button onClick={handlePrevious} className="gap-1 bg-blue-400 hover:bg-blue-500">
              <div className="flex gap-2 items-center">
                <IoIosArrowRoundBack />
                Anterior
              </div>
            </Button>
            <div className="flex items-center">
              Pág. {currentPage + 1} / {totalPages} - Total {totalItems}
            </div>
            <Button onClick={handleNext} className="gap-1 bg-blue-400 hover:bg-blue-500">
              <div className="flex gap-2 items-center">
                Proximo
                <IoIosArrowRoundForward />
              </div>
            </Button>
          </div>
        )
      }
    </div>
  )
}