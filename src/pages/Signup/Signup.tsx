import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const Signup = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisabledButton(true);
    setTimeout(() => {
      setLoading(false);
      setDisabledButton(false);
      toast.success("Código enviado para seu email");
    }, 2500);
  };

  useEffect(() => {
    if (email !== "") return setDisabledButton(false);
    return setDisabledButton(true);
  }, [email]);

  return (
    <>
      <Header register={true} />
      <Form onSubmit={handleSubmit}>
        <h5>Esqueceu sua senha?</h5>
        <Input
          label="Nome"
          value={name}
          handleChange={setName}
          placeholder={"Digite seu nome"}
        />
        <Input
          label="Telefone"
          value={phone}
          handleChange={setPhone}
          placeholder={"(00) 0 0000-0000"}
        />
        <Input
          label="E-mail"
          value={email}
          handleChange={setEmail}
          placeholder={"Digite seu e-mail"}
        />
        <Input
          label="Senha"
          value={password}
          handleChange={setPassword}
          placeholder={"Digite seu e-mail"}
        />
        <Input
          label="Repita a Senha"
          value={password}
          handleChange={setPassword}
          placeholder={"Digite seu e-mail"}
        />
        <ButtonRegister
          text="Cadastrar"
          loading={loading}
          disabled={disabledButton}
        />
      </Form>
    </>
  );
};

export default Signup;

const Form = styled.form`
  margin: 0 auto;
  max-width: 659px;
  h5 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 120%;
    color: #000000;
    margin-top: 88px;
    margin-bottom: 45px;
  }
`;
