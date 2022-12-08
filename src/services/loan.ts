import axios from "axios";

export const getLoans = async (id: number) => {
  const res = await axios.get(
    process.env.REACT_APP_API_URL + `/installment/list?emprestimo_id=${id}`
  );
  return res.data;
};

export const updateStatusLoans = async (id: number, status: string) => {
  const res = await axios.patch(
    process.env.REACT_APP_API_URL + `/loan?emprestimo_id=${id}`,
    {
      emprestimo_id: id,
      field_to_update: "status",
      value_to_update: status,
    }
  );
  return res.data;
};
