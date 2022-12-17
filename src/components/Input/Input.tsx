import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Props {
  label: string;
  value: string;
  handleChange(state: string): void;
  placeholder: string;
  type?: string;
  redefine?: boolean;
}

const Input = ({
  handleChange,
  label,
  placeholder,
  value,
  type,
  redefine,
}: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <InputStyled>
      <Label>{label}</Label>
      <InputComponent
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        type={type}
      />
      {redefine && (
        <RedefinePassword onClick={() => navigate("/redefinir-senha")}>
          Esqueceu sua senha?
        </RedefinePassword>
      )}
    </InputStyled>
  );
};

export default Input;

const InputComponent = styled.input`
  max-width: 659px;
  width: 100%;
  height: 74px;
  border: 1px solid #000000;
  border-radius: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #000000;
  padding-left: 40px;
  margin-top: -14px;
  &:focus {
    outline: none;
  }
`;

const InputStyled = styled.div`
  margin: 0 auto;
  max-width: 659px;
  position: relative;
  width: 100%;
  margin-bottom: 33px;
  &:last-child {
    margin: 0 !important;
  }
`;

const Label = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 120%;
  color: #000000;
  height: 30px;
  background: #fff;
  margin-left: 30px;
  z-index: 2;
  position: relative;
  border: 1px solid red;
  padding: 10px;
`;

const RedefinePassword = styled.p`
  position: absolute;
  right: 38px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #000000;
  top: 42px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
