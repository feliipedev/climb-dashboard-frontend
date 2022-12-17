import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideDish from "../pages/SideDish/SideDish";
import Requests from "../pages/Requests/Requests";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Signup from "../pages/Signup/Signup";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideDish />} />
        <Route path="/solicitacoes" element={<Requests />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<ForgotPassword />} />
        <Route path="/registrar" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
