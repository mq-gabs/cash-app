import clsx from "clsx";
import Button from "./Button";
import Modal from "./Modal";

interface IConfirmModal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
  type?: "default" | "warning";
}

export default function ConfirmModal({
  onClose,
  onConfirm,
  open,
  title,
  text,
  type = "default",
}: IConfirmModal) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div>
        <div className="mb-4">
          <p>{text}</p>
        </div>
        <div className="flex gap-2 w-full justify-between">
          <Button onClick={onClose} className="!bg-gray-400 text-gray-950">
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className={clsx({
              "bg-red-500": type === "warning",
            })}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
