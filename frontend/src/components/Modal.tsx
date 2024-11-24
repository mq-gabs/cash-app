import { RxCrossCircled } from "react-icons/rx";
import Button from "./Button";

interface IModal {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  onClose,
  open,
  title = 'Título',
  children,
}: IModal) {
  if (!open) return <></>;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10">
      <div className="absolute w-full h-full bg-gray-500 opacity-50"/>
      <div className="bg-white z-20 rounded">
        <div className="bg-primary w-full p-2 flex justify-between gap-2 rounded-tl rounded-tr">
          <p className="text-white font-bold text-lg">
            {title}
          </p>
          <Button
            onClick={onClose}
          >
            <RxCrossCircled size={20} />
          </Button>
        </div>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  )
}