import styled from "styled-components";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { Loan } from "../../pages/SideDish/SideDish";
import { updateStatusLoans } from "../../services/loan";
import { toast } from "react-toastify";

interface Props {
  loan: Loan;
  setLoans: any;
  i: number;
}

const SelectContainer = ({ loan, setLoans, i }: Props): JSX.Element => {

  const handleSetSelectStatus = async (value: string) => {
    await updateStatusLoans(loan, value)
      .then(() => {
        setLoans((current: Loan[]) => {
          return current.map((obj, index) => {
            if (index === i) {
              return { ...obj, status_descricao: value };
            }
            return obj;
          });
        });
        /* toast.success("Status da parcela alterado com sucesso."); */
      })
      .catch(() => toast.error("Falha ao atualizar status da parcela."));
  };

  return (
    <>
      <SelectContainerStyled
        name="status_descricao"
        value={loan.status_descricao}
        defaultValue={loan.status_descricao}
        onChange={(e) => handleSetSelectStatus(e.target.value)}
      >
        <Option value="Em atraso">Em atraso</Option>
        <Option value="Pendente">Pendente</Option>
        <Option value="Efetuado">Efetuado</Option>
      </SelectContainerStyled>
    </>
  );
};

export default SelectContainer;

const SelectContainerStyled = styled.select<{ value?: string }>`
  width: 118px;
  height: 35px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  color: ${(props) => props.value === "Em atraso" && "#b01d1d"};
  color: ${(props) => props.value === "Pendente" && "#EDB900"};
  color: ${(props) => props.value === "Efetuado" && "#0C7028"};
  padding: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f5f5f5 url(${ArrowDown}) 92.5% 50% no-repeat;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const Option = styled.option<{ value?: string }>`
  color: ${(props) => props.value === "Em atraso" && "#b01d1d"};
  color: ${(props) => props.value === "Pendente" && "#EDB900"};
  color: ${(props) => props.value === "Efetuado" && "#0C7028"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
`;
