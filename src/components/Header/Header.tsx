import styled from "styled-components";
import Logo from "../../assets/images/logo.svg";
import PerfilVazio from "../../assets/images/perfil-vazio.svg";
import { Container } from "../../pages/Home/Home";

const Header = (): JSX.Element => {
  return (
    <HeaderComponent>
      <Container>
        <BetweenContainer>
          <img src={Logo} alt="logo" />
          <Perfil src={PerfilVazio} alt="perfil" />
        </BetweenContainer>
      </Container>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  background: ${(props) => props.theme.colors.primary};
  height: 115px;
`;

const BetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
`;

const Perfil = styled.img`
  cursor: pointer;
`;
