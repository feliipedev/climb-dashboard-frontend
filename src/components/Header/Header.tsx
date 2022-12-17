import styled from "styled-components";
import Logo from "../../assets/images/logo.svg";
import PerfilVazio from "../../assets/images/perfil-vazio.svg";
import { Container } from "../../pages/SideDish/SideDish";
import { useNavigate } from "react-router-dom";

interface Props {
  register?: boolean;
}

const Header = ({ register }: Props): JSX.Element => {
  const navigate = useNavigate();
  return (
    <HeaderComponent>
      <Container>
        <BetweenContainer>
          <img src={Logo} alt="logo" onClick={() => navigate("/")} />
          {!register && <Perfil src={PerfilVazio} alt="perfil" />}
        </BetweenContainer>
      </Container>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  background: ${(props) => props.theme.colors.primary};
  height: 115px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const BetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  img {
    object-fit: contain;
    cursor: pointer;
  }
`;

const Perfil = styled.img`
  cursor: pointer;
`;
