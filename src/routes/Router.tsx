import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideDish from "../pages/SideDish/SideDish";
import Requests from "../pages/Requests/Requests";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideDish />} />
        <Route path="/solicitacoes" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
