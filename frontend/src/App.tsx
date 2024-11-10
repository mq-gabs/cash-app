import { Toaster } from "react-hot-toast";
import Router from "./routes/routes";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 8000,
        }}
      />
      <Router />
    </>
  );
}