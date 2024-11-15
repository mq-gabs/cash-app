import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <main className="p-4 h-screen">
      <div className="flex justify-center items-center h-full">
        <div>
          <PageTitle text="404 Not Found" className="text-center mb-8 w-full" />
          <h4>A página que você tentou acessar não existe...</h4>
          <div className="flex justify-center">
            <a
              onClick={() => nav(-1)}
              className="underline text-blue-600 text-center cursor-pointer"
            >
              Voltar
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
