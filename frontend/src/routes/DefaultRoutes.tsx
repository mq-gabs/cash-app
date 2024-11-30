import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import ServicePayments from "../pages/ServicePayments";
import ServicePaymentsFormPage from "../pages/ServicePaymentsFormPage";
import Services from "../pages/Services";
import ServicesFormPage from "../pages/ServicesFormPage";
import OtherPayments from "../pages/OtherPayments";
import OtherPaymentsFormPage from "../pages/OtherPaymentsFormPage";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Customers from "../pages/Customers";
import CustomersFormPage from "../pages/CustomersFormPage";

export default function DefaultRoutes() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div className="max-w-[200px] w-full block">
          <Menu />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Routes>
            <Route path="/" Component={ServicePayments} />
            <Route path="/atendimentos" Component={ServicePayments} />
            <Route path="/atendimento" Component={ServicePaymentsFormPage} />
            <Route path="/servicos" Component={Services} />
            <Route path="/servico" Component={ServicesFormPage} />
            <Route path="/outros" Component={OtherPayments} />
            <Route path="/outro" Component={OtherPaymentsFormPage} />
            <Route path="/perfil" Component={Profile} />
            <Route path="/clientes" Component={Customers} />
            <Route path="/cliente" Component={CustomersFormPage} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
