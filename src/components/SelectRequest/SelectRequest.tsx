import styled from "styled-components";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { Loan } from "../../pages/SideDish/SideDish";
import { updateStatusRequest } from "../../services/loan";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface Props {
  loan: any;
  setLoans: any;
  i: number;
  bodyTable: Loan[];
}

const SelectContainer = ({
  loan,
  setLoans,
  i,
  bodyTable,
}: Props): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const handleSetSelectStatus = async (value: string) => {
    await updateStatusRequest(loan, value)
      .then(() => {
        setLoans((current: Loan[]) => {
          return current.map((obj, index) => {
            if (index === i) {
              return { ...obj, status_descricao: value };
            }
            return obj;
          });
        });
        setActiveFilter(true);
      })
      .catch((err) => {
        toast.error("Falha ao atualizar status da parcela.");
        console.log(err);
      });
  };

  useEffect(() => {
    if (activeFilter) {
      setTimeout(() => {
        setLoans(
          bodyTable.filter((item) => item.status_descricao !== "Concluído")
        );
        setActiveFilter(false);
      }, 1000);
    }
  }, [activeFilter]);

  return (
    <>
      <SelectContainerStyled
        name="status_descricao"
        value={loan.status_descricao}
        defaultValue={loan.status_descricao}
        onChange={(e) => handleSetSelectStatus(e.target.value)}
      >
        <Option value="Pendente">Pendente</Option>
        <Option value="Em andamento">Em andamento</Option>
        <Option value="Reprovado">Reprovado</Option>
        <Option value="Concluído">Concluído</Option>
      </SelectContainerStyled>
    </>
  );
};

export default SelectContainer;

const SelectContainerStyled = styled.select<{ value?: string }>`
  width: ${(props) => (props.value === "Em andamento" ? "168px" : "128px")};
  height: 35px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  color: ${(props) => props.value === "Pendente" && "#EDB900"};
  color: ${(props) => props.value === "Em andamento" && "#818181"};
  color: ${(props) => props.value === "Reprovado" && "#b01d1d"};
  color: ${(props) => props.value === "Concluído" && "#0C7028"};
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
  color: ${(props) => props.value === "Pendente" && "#EDB900"};
  color: ${(props) => props.value === "Em andamento" && "#818181"};
  color: ${(props) => props.value === "Reprovado" && "#b01d1d"};
  color: ${(props) => props.value === "Concluído" && "#0C7028"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
`;
