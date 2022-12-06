import React, { useState } from "react";
import styled from "styled-components";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { Loan } from "../../pages/Requests/Requests";

interface Props {
  loan: Loan;
  loans: Loan[];
  setLoans: any;
  i: number;
}

const SelectContainer = ({ loan, loans, setLoans, i }: Props): JSX.Element => {
  const handleSetSelectStatus = (value: string) => {
    let aux = loans.map((item, index: number) => {
      if (index === i) {
        return { ...item, status: value };
      }
      return item;
    });
    setLoans(aux);
  };

  return (
    <>
      <SelectContainerStyled
        name="status"
        value={loan.status}
        onChange={(e) => handleSetSelectStatus(e.target.value)}
      >
        <Option value="Sim">Sim</Option>
        <Option value="Não">Não</Option>
      </SelectContainerStyled>
    </>
  );
};

export default SelectContainer;

const SelectContainerStyled = styled.select<{ value?: string }>`
  width: 67px;
  height: 35px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  color: ${(props) => props.value === "Não" && "#b01d1d"};
  color: ${(props) => props.value === "Sim" && "#0C7028"};
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
  color: ${(props) => props.value === "Não" && "#b01d1d"};
  color: ${(props) => props.value === "Sim" && "#0C7028"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
`;
