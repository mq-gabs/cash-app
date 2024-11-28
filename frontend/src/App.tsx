import { Toaster } from "react-hot-toast";
import Router from "./routes/routes";
import { UserProvider } from "./hooks/use-user";
import { ApiProvider } from "./hooks/use-api";

export default function App() {
  return (
    <UserProvider>
      <ApiProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 8000,
          }}
        />
        <Router />
      </ApiProvider>
    </UserProvider>
  );
}
