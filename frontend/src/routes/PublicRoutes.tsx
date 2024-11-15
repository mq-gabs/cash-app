import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function PublicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/login"
          Component={Login}
        />
        <Route
          path="/register"
          Component={Register}
        />
      <Route
          path="/*"
          Component={Login}
        />
      </Routes>
    </BrowserRouter>
  )
}