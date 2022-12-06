import axios from "axios";

export const getLoans = async () => {
  const res = await axios.get(process.env.REACT_APP_API_URL + "/installment/list?emprestimo_id=1");
  return res.data;
};
