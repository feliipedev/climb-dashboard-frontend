import styled from "styled-components";
import Spinner from "../Spinner/Spinner";

interface Props {
  loading: boolean;
  disabled: boolean;
  text: string;
}

const ButtonRegister = ({ loading, disabled, text }: Props) => {
  return (
    <ButtonRegisterContainer type="submit" disabled={disabled}>
      {loading ? <Spinner /> : text}
    </ButtonRegisterContainer>
  );
};

export default ButtonRegister;

const ButtonRegisterContainer = styled.button<{ disabled: boolean }>`
  max-width: 659px;
  width: 100%;
  height: 74px;
  background: #39c6bb;
  border-radius: 5px;
  border: none;
  transition: all 0.3s ease-in-out;
  margin: 0 auto;
  cursor: pointer;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 120%;
  color: #ffffff;
  margin-top: -5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};  
  &:hover {
    opacity: 0.8;
  }
`;
