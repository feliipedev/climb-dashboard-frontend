import styled from "styled-components";
import { memo } from "react";
import SelectModal from "../../components/SelectModal/SelectModal";
import { Loan } from "../../pages/Requests/Requests";
import React from "react";

interface Props {
  index: number;
  body: Loan;
  bodyTable: Loan[];
  setBodyTable: any;
}

const TrRequests = ({
  index,
  body,
  bodyTable,
  setBodyTable,
}: Props): JSX.Element => {
  return (
    <tr key={index}>
      <td>
        <>{body.name}</>
      </td>
      <td>{body.cpf}</td>
      <td>{body.email}</td>
      <td>{body.rendaMensal}</td>
      <td>{body.score}</td>
      <td>{body.emprestimo}</td>
      <td>{body.valorParcela}</td>
      <td>{body.datPag}</td>
      <td>
        {" "}
        <SelectModal
          loan={body}
          loans={bodyTable}
          setLoans={setBodyTable}
          i={index}
        />
      </td>
    </tr>
  );
};

export default React.memo(
  TrRequests,
  (oldProps, newProps) => oldProps.body.cpf === newProps.body.cpf
);
