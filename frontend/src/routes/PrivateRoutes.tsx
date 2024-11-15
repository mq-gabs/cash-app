import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pagamentos from "../pages/Pagamentos";
import Users from "../pages/Users";
import Services from "../pages/Services";
import CreateService from "../pages/CreateService";
import NotFound from "../pages/NotFound";
import Menu from "../components/Menu";

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
            <Route path="/pagamentos" Component={Pagamentos} />
            <Route path="/users" Component={Users} />
            <Route path="/services" Component={Services} />
            <Route path="/servicescreate" Component={CreateService} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
