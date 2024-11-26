import PublicRoutes from "./PublicRoutes";
import { userUser } from "../hooks/use-user";
import AdminRoutes from "./AdminRoutes";
import DefaultRoutes from "./DefaultRoutes";

export default function Router() {
  const { data } = userUser();

  if (!data.token) return <PublicRoutes />;

  if (data.is_admin) return <AdminRoutes />

  return <DefaultRoutes />
}
