import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";
import ImageFixed from "../../assets/images/image-signup.png";
import UpdateImage from "../../assets/icons/update-image.svg";

interface Upload {
  name: string;
  image: string;
}

const Signup = (): JSX.Element => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [upload, setUpload] = useState<Upload[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisabledButton(true);
    setTimeout(() => {
      setLoading(false);
      setDisabledButton(false);
      /*  toast.success("Código enviado para seu email"); */
    }, 2500);
  };

  useEffect(() => {
    if (email !== "") return setDisabledButton(false);
    return setDisabledButton(true);
  }, [email]);

  useEffect(() => {
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      password === "" ||
      passwordRepeat === "" ||
      upload.length === 0
    )
      return setDisabledButton(true);
    return setDisabledButton(false);
  }, [name, phone, password, upload, passwordRepeat, email]);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      Array.from(e.target.files).map((selectedFile: any) => {
        if (selectedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            if (e.target?.result) {
              setUpload((prev) => [
                ...prev,
                {
                  name: selectedFile.name,
                  image: e.target?.result?.toString() ?? "",
                },
              ]);
              toast.success("Upload realizado!");
            }
          };
        }
      });
    }
  };

  return (
    <>
      <Header register={true} />
      <Form onSubmit={handleSubmit}>
        <ImageFixedStyled>
          {upload.length === 0 ? (
            <img src={ImageFixed} alt="perfil" />
          ) : (
            <>
              <Perfil src={upload[upload.length - 1].image} alt="foto perfil" />
            </>
          )}
          <ButtonUploadStyled>
            <img src={UpdateImage} alt="upload" onClick={() => handleClick()} />
            <input
              type={"file"}
              accept="image/*"
              multiple
              ref={hiddenFileInput}
              onChange={(e) => handleFileChange(e)}
              style={{ display: "none" }}
            />
          </ButtonUploadStyled>
        </ImageFixedStyled>
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
          value={passwordRepeat}
          handleChange={setPasswordRepeat}
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
  padding-bottom: 100px;
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

const ImageFixedStyled = styled.div`
  max-width: 194px;
  width: 100%;
  position: relative;
  margin: 0 auto;
  margin-top: 91px;
  margin-bottom: 60px;
`;

const ButtonUploadStyled = styled.button`
  border: none;
  background: #d9d9d9;
  border-radius: 5px;
  width: 71px;
  height: 51px;
  position: absolute;
  right: -30px;
  right: -2px;
  top: 170px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const Perfil = styled.img`
  max-width: 194px;
  height: 194px;
  width: 100%;
  border-radius: 50%;
`;
