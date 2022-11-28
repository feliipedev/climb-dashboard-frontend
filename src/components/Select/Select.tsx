import React, { useState } from "react";
import styled from "styled-components";
import ArrowDown from "../../assets/icons/arrow-down.svg";
interface Status {
  status: "Pendente" | "Em atraso" | "Efetuado";
}

const SelectContainer = ({ status }: Status): JSX.Element => {
  const [selectStatus, setSelectStatus] = useState<string | undefined>();

  return (
    <>
      <SelectContainerStyled
        name="status"
        value={status}
        onChange={(e) => setSelectStatus(e.target.value)}
        defaultValue={status}
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
  color: ${(props) => props.value === "Pendente" && "#0C7028"};
  color: ${(props) => props.value === "Efetuado" && "#EDB900"};
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
  color: ${(props) => props.value === "Pendente" && "#0C7028"};
  color: ${(props) => props.value === "Efetuado" && "#EDB900"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
`;
