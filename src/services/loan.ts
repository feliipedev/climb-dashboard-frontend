import axios from "axios";
import { Loan } from "../pages/SideDish/SideDish";
import api from "./api";

export const getLoansDetails = async (id: number) => {
  const res = await axios.get(
    process.env.REACT_APP_API_URL + `/installment/list?emprestimo_id=${id}`
  );
  return res.data;
};

export const updateStatusLoans = async (item: Loan, field: string) => {
  let numberField = 0;
  switch (field) {
    case "Pendente":
      numberField = 1;
      break;
    case "Efetuado":
      numberField = 2;
      break;
    case "Em atraso":
      numberField = 3;
      break;
  }
  const res = await axios.put(process.env.REACT_APP_API_URL + `/installment`, {
    emprestimo_id: Number(item.emprestimo_id),
    field_to_update: "status_id",
    numero_parcela: Number(item.numero_parcela),
    value_to_update: numberField,
  });
  return res.data;
};

export const getNotification = async () => {
  const res = await axios.get(process.env.REACT_APP_API_URL + "/loan/count");
  return res.data;
};

export const getListOfOutstandingLoans = async () => {
  const res = await axios.get(
    process.env.REACT_APP_API_URL +
      "/loan/list?items_per_page=1000&page_number=1"
  );
  return res.data;
};
