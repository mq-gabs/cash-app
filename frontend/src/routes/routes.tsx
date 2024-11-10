import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pagamentos from "../pages/Pagamentos";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import CreateService from "../pages/CreateService";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          Component={Home}
        />
        <Route
          path="/pagamentos"
          Component={Pagamentos}
        />
        <Route
          path="/login"
          Component={Login}
        />
        <Route
          path="/register"
          Component={Register}
        />
        <Route
          path="/services"
          Component={Services}
        />
        <Route
          path="/servicescreate"
          Component={CreateService}
        />
        <Route
          path="/*"
          Component={NotFound}
        />
      </Routes>
    </BrowserRouter>
  );
}