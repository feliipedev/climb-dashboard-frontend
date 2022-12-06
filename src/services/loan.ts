import api from "./api";
import axios from "axios";

export const getLoans = async () => {
  const res = await api.get("/installment/list?emprestimo_id=1");
  return res.data;
};
