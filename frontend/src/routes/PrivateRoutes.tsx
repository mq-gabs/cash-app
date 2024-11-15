import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pagamentos from "../pages/Pagamentos";
import Users from "../pages/Users";
import Services from "../pages/Services";
import CreateService from "../pages/CreateService";
import NotFound from "../pages/NotFound";
import Menu from "../components/Menu";
import Employees from "../pages/Employees";
import EmployeeFormPage from "../pages/EmployeeFormPage";

export default function PrivateRoutes() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div className="max-w-[120px] block">
          <Menu />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/service-payments" Component={Pagamentos} />
            <Route path="/users" Component={Users} />
            <Route path="/services" Component={Services} />
            <Route path="/servicescreate" Component={CreateService} />
            <Route path="/employees" Component={Employees} />
            <Route path="/employee" Component={EmployeeFormPage} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
