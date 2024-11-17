import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <main className="p-4 h-screen">
      <div className="flex justify-center items-center h-full">
        <div>
          <h1 className="text-center mb-8 w-full text-3xl font-bold" >404 Not Found</h1>
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
