import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import Dashboard from "../pages/dashboard/Dashbaord";
import ServicePayments from "../pages/ServicePayments";
import ServicePaymentsFormPage from "../pages/ServicePaymentsFormPage";
import Services from "../pages/Services";
import ServicesFormPage from "../pages/ServicesFormPage";
import OtherPayments from "../pages/OtherPayments";
import OtherPaymentsFormPage from "../pages/OtherPaymentsFormPage";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export default function DefaultRoutes() {
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
          <Route path="/other-payments" Component={OtherPayments} />
          <Route path="/other-payment" Component={OtherPaymentsFormPage} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/profile" Component={Profile} />
          <Route path="/*" Component={NotFound} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}