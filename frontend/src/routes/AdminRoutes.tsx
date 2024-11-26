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
            <Route path="/service-payments" Component={ServicePayments} />
            <Route path="/service-payment" Component={ServicePaymentsFormPage} />
            <Route path="/services" Component={Services} />
            <Route path="/service" Component={ServicesFormPage} />
            <Route path="/employees" Component={Employees} />
            <Route path="/employee" Component={EmployeesFormPage} />
            <Route path="/employees-payments" Component={EmployeesPayments} />
            <Route path="/employee-payment" Component={EmployeesPaymentsFormPage} />
            <Route path="/other-payments" Component={OtherPayments} />
            <Route path="/other-payment" Component={OtherPaymentsFormPage} />
            <Route path="/users" Component={Users} />
            <Route path="/user" Component={UsersFormPage} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/profile" Component={Profile} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
