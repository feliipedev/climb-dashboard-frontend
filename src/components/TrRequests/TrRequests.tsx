import { Loan } from "../../pages/Requests/Requests";
import SelectRequest from "../SelectRequest/SelectRequest";
interface Props {
  index: number;
  body: Loan;
  setBodyTable: any;
}

const TrRequests = ({
  index,
  body,
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
        <SelectRequest loan={body} setLoans={setBodyTable} i={index} />
      </td>
    </tr>
  );
};

export default TrRequests;
