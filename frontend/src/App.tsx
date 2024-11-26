import { Toaster } from "react-hot-toast";
import Router from "./routes/routes";
import { UserProvider } from "./hooks/use-user";

export default function App() {
  return (
    <UserProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 8000,
        }}
      />
      <Router />
    </UserProvider>
  );
}
