import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../pages/Users";
import Services from "../pages/Services";
import ServicesFormPage from "../pages/ServicesFormPage";
import NotFound from "../pages/NotFound";
import Menu from "../components/Menu";
import Employees from "../pages/Employees";
import EmployeesFormPage from "../pages/EmployeesFormPage";
import OtherPayments from "../pages/OtherPayments";
import OtherPaymentsFormPage from "../pages/OtherPaymentsFormPage";
import ServicePayments from "../pages/ServicePayments";
import ServicePaymentsFormPage from "../pages/ServicePaymentsFormPage";
import EmployeesPayments from "../pages/EmployeesPayments";
import EmployeesPaymentsFormPage from "../pages/EmployeesPaymentsFormPage";
import Dashboard from "../pages/dashboard/Dashbaord";
import Profile from "../pages/Profile";
import UsersFormPage from "../pages/UsersFormPage";

export default function AdminRoutes() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div className="max-w-[200px] w-full block">
          <Menu />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/atendimentos" Component={ServicePayments} />
            <Route path="/atendimento" Component={ServicePaymentsFormPage} />
            <Route path="/servicos" Component={Services} />
            <Route path="/servico" Component={ServicesFormPage} />
            <Route path="/funcionarios" Component={Employees} />
            <Route path="/funcionario" Component={EmployeesFormPage} />
            <Route path="/pagamentos" Component={EmployeesPayments} />
            <Route path="/pagamento" Component={EmployeesPaymentsFormPage} />
            <Route path="/outros" Component={OtherPayments} />
            <Route path="/outro" Component={OtherPaymentsFormPage} />
            <Route path="/usuarios" Component={Users} />
            <Route path="/usuario" Component={UsersFormPage} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/perfil" Component={Profile} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
