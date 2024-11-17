import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pagamentos from "../pages/Pagamentos";
import Users from "../pages/Users";
import Services from "../pages/Services";
import ServiceFormPage from "../pages/ServiceFormPage";
import NotFound from "../pages/NotFound";
import Menu from "../components/Menu";
import Employees from "../pages/Employees";
import EmployeeFormPage from "../pages/EmployeeFormPage";
import OtherPayments from "../pages/OtherPayments";
import OtherPaymentsFormPage from "../pages/OtherPaymentsFormPage";

export default function PrivateRoutes() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div className="max-w-[200px] w-full block">
          <Menu />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/service-payments" Component={Pagamentos} />
            <Route path="/users" Component={Users} />
            <Route path="/services" Component={Services} />
            <Route path="/service" Component={ServiceFormPage} />
            <Route path="/employees" Component={Employees} />
            <Route path="/employee" Component={EmployeeFormPage} />
            <Route path="/other-payments" Component={OtherPayments} />
            <Route path="/other-payment" Component={OtherPaymentsFormPage} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
