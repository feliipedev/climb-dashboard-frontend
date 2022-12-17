import { useState } from "react";
import styled from "styled-components";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("waterpark@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisabledButton(true);
    setTimeout(() => {
      setLoading(false);
      setDisabledButton(false);
      localStorage.setItem("token", "UmTokenQualquer#123");
      navigate("/");
    }, 2500);
  };

  return (
    <>
      <Header register={true} />
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Digite seu email"
          value={email}
          handleChange={setEmail}
          label={"E-mail"}
        />
        <Input
          placeholder="Digite sua senha"
          value={password}
          type="password"
          handleChange={setPassword}
          label={"Senha"}
          redefine={true}
        />
        <ButtonSignup onClick={() => navigate("/registrar")}>
          Não possui uma conta?
        </ButtonSignup>
        <ButtonRegister
          text="Entrar"
          loading={loading}
          disabled={disabledButton}
        />
      </Form>
    </>
  );
};

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 165px;
`;

const ButtonSignup = styled.p`
  text-align: center;
  margin-bottom: 36px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
