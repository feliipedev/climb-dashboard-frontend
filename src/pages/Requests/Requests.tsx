import Header from "../../components/Header/Header";
import styled from "styled-components";
import Search from "../../assets/icons/search.svg";
import Filter from "../../assets/icons/filter.svg";
import CloseFilter from "../../assets/icons/close-filter.svg";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Pagination from "../../components/Pagination/Pagination";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import CircularProgressBarBase from "../../components/CircularProgress/CircleProgressBarBase";
import ModalDetailsClient from "../../components/Modals/ModalDetailsClient/ModalDetailsClient";
import { useNavigate } from "react-router-dom";
import SelectModal from "../../components/SelectModal/SelectModal";

export interface Select {
  name: string;
  cpf: string;
  email: string;
  rendaMensal: string;
  score: string;
  emprestimo: string;
  valorParcela: string;
  status: "Sim" | "Não";
}

const Requests = (): JSX.Element => {
  const navigate = useNavigate();
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [disabledFilter, setDisabledFilter] = useState<boolean>(false);
  const [selectOrder, setSelectOrder] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<boolean>(false);
  const [selectPendente, setSelectPendente] = useState<boolean>(false);
  const [selectEfetuado, setSelectEfetuado] = useState<boolean>(false);
  const [pg, setPg] = useState<number>(0);
  const [pp, setPp] = useState<number>(8);
  const [search, setSearch] = useState<string>("");
  const [openDateInitial, setOpenDateInitial] = useState<boolean>(false);
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false);
  const [titleTable, setTitleTable] = useState<string[]>([
    "Nome",
    "CPF",
    "Email",
    "Renda Mensal",
    "Score",
    "Empréstimo",
    "V. Parcela",
    "Status",
  ]);
  const [bodyTable, setBodyTable] = useState<Select[]>([
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "R$ 100.000,00",
      valorParcela: "R$ 10.000,00",
      status: "Não",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "",
      valorParcela: "",
      status: "Sim",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "R$ 100.000,00",
      valorParcela: "R$ 10.000,00",
      status: "Não",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "",
      valorParcela: "",
      status: "Sim",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "R$ 100.000,00",
      valorParcela: "R$ 10.000,00",
      status: "Não",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "",
      valorParcela: "",
      status: "Sim",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "R$ 100.000,00",
      valorParcela: "R$ 10.000,00",
      status: "Não",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "",
      valorParcela: "",
      status: "Sim",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "R$ 100.000,00",
      valorParcela: "R$ 10.000,00",
      status: "Não",
    },
    {
      name: "Ivete Prado Guimarães",
      cpf: "000.000.000-00",
      email: "ivete@gmail.com",
      rendaMensal: "R$ 10000,00",
      score: "160",
      emprestimo: "",
      valorParcela: "",
      status: "Sim",
    },
  ]);
  const [filteredItems, setFilteredItems] = useState<Select[]>([]);
  const [messageNotFound, setMessageNotFound] = useState<string>();

  useEffect(() => {
    if (selectOrder) {
      return setFilteredItems(
        bodyTable.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        )
      );
    }
    if (selectPendente) {
      if (filteredItems.length !== 0)
        setFilteredItems(filteredItems.filter((item) => item.status === "Não"));
      if (filteredItems.length === 0)
        setFilteredItems(bodyTable.filter((item) => item.status === "Não"));
      return setDisabledFilter(true);
    }
    if (selectEfetuado) {
      if (filteredItems.length === 0)
        setFilteredItems(bodyTable.filter((item) => item.status === "Sim"));
      if (filteredItems.length !== 0)
        setFilteredItems(filteredItems.filter((item) => item.status === "Sim"));
      return setDisabledFilter(true);
    }
  }, [selectOrder, selectPendente, selectEfetuado]);

  useEffect(() => {
    if (search) {
      let itemsFiltered = bodyTable.filter((item) =>
        item.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      );
      if (itemsFiltered) {
        setFilteredItems(itemsFiltered);
      } else {
        setMessageNotFound("Nenhum item encontrado.");
      }
    } else {
      setDisabledFilter(false);
      setFilteredItems([]);
    }
  }, [search]);

  const pages: number = Math.ceil(bodyTable ? bodyTable.length / pp : 0);
  const startIndex = pg * pp;
  const endIndex = startIndex + pp;
  const current: any | undefined = bodyTable?.slice(startIndex, endIndex);

  return (
    <HomeStyled>
      <Header />
      <Container>
        <FlexContainer>
          <Title onClick={() => navigate("/solicitacoes")}>Solicitações</Title>
          <TitleTwo onClick={() => navigate("/")}>Acompanhamento</TitleTwo>
        </FlexContainer>
      </Container>
      <Container>
        <TitleStyled>
          <SubTitle>Mostrando perído:</SubTitle>
          <DateTitle>01 de maio de 2022</DateTitle>
          <SubTitle>a</SubTitle>
          <DateTitle>25 de maio de 2022</DateTitle>
          <InputStyled>
            <InputSearch
              placeholder="Buscar por nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img src={Search} alt="search" />
          </InputStyled>
          <CollumnContainer>
            <ButtonFilter onClick={() => setOpenModalFilter(true)}>
              <>Filtro</>
              <img src={Filter} alt="filtro icon" />
            </ButtonFilter>
            <FilterContainer isOpen={openModalFilter}>
              <HeaderFilter>
                <div></div>
                <p>Filtro</p>
                <StyledCloseFilter onClick={() => setOpenModalFilter(false)}>
                  <img src={CloseFilter} alt="fechar filtro" />
                </StyledCloseFilter>
              </HeaderFilter>
              <BodyFilter>
                <p>Ordenar por:</p>
                <FlexContainer>
                  <RadioButtonOrder
                    type="radio"
                    name="radioButtonOrder"
                    value="radioButtonOrder"
                    checked={selectOrder}
                    onClick={() => setSelectOrder(!selectOrder)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Ordem alfabética</span>
                  <RadioButtonDate
                    type="radio"
                    name="radioButtonDate"
                    value="radioButtonDate"
                    checked={selectDate}
                    onClick={() => setSelectDate(!selectDate)}
                  />
                  <RadioButtonLabelDate />
                  <span>Data</span>
                </FlexContainer>
                <p>Status de pagamento:</p>
                <FlexContainer>
                  <RadioButtonPendente
                    type="radio"
                    name="radioButton"
                    value="radioButtonPendente"
                    checked={selectPendente}
                    onClick={() => setSelectPendente(!selectPendente)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Não</span>
                  <RadioButtonEfetuado
                    type="radio"
                    name="radioButton"
                    value="radioButtonEfetuado"
                    checked={selectEfetuado}
                    onClick={() => setSelectEfetuado(!selectEfetuado)}
                  />
                  <RadioButtonLabelDate />
                  <span>Sim</span>
                </FlexContainer>
                <FilterButtonStyled>
                  <ButtonFilterModal>Filtrar</ButtonFilterModal>
                </FilterButtonStyled>
              </BodyFilter>
            </FilterContainer>
          </CollumnContainer>
        </TitleStyled>
      </Container>
      <Container>
        <Table>
          <tr>
            {titleTable &&
              titleTable.map((title: string, index: number) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
          {search !== "" || disabledFilter
            ? filteredItems.map((body: Select, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <>{body.name}</>
                    </td>
                    <td>{body.cpf}</td>
                    <td>{body.email}</td>
                    <td>{body.rendaMensal}</td>
                    <td>{body.score}</td>
                    <td>{body.emprestimo}</td>
                    <td>{body.valorParcela}</td>
                    <td>
                      <SelectModal status={body.status} />
                    </td>
                  </tr>
                );
              })
            : current.map((body: Select, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <>{body.name}</>
                    </td>
                    <td>{body.cpf}</td>
                    <td>{body.email}</td>
                    <td>{body.rendaMensal}</td>
                    <td>{body.score}</td>
                    <td>{body.emprestimo}</td>
                    <td>{body.valorParcela}</td>
                    <td>
                      {" "}
                      <SelectModal status={body.status} />
                    </td>
                  </tr>
                );
              })}
        </Table>
        <PaginationStyled>
          <Pagination
            pages={pages}
            pg={pg}
            setPg={setPg}
            lastPage={pages}
            total={bodyTable ? bodyTable.length : 0}
          />
        </PaginationStyled>
        <ShowTickets>
          <p>Mostrar boletos:</p>
          <ButtonTicket>Últimos 7 dias</ButtonTicket>
          <ButtonTicket>Últimos 30 dias</ButtonTicket>
          <ButtonTicket>Últimos 3 meses</ButtonTicket>
          <ButtonTicket>Últimos 6 meses</ButtonTicket>
          <ButtonTicket>Escolher período</ButtonTicket>
        </ShowTickets>
        <CircularStyled>
          <AlignContainer>
            <p>Pagos</p>
            <CircularProgress
              size={150}
              strokeWidth={10}
              percentage={75}
              color="#79C6C0"
            />
          </AlignContainer>
          <AlignContainer>
            <p>Pendentes</p>
            <CircularProgress
              size={150}
              strokeWidth={10}
              percentage={30}
              color="#79C6C0"
            />
          </AlignContainer>
          <AlignContainer>
            <p>Total</p>
            <CircularProgressBarBase
              size={150}
              strokeWidth={10}
              percentage={100}
              color="#79C6C0"
            />
          </AlignContainer>
        </CircularStyled>
      </Container>
      <ModalDetailsClient
        isOpen={openModalDetails}
        onClose={setOpenModalDetails}
      />
    </HomeStyled>
  );
};

export default Requests;

export const HomeStyled = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1312px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1300px) {
    width: 90%;
  }
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.title};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 120%;
  text-decoration: underline;
  margin-top: 43px;
  cursor: pointer;
`;

const TitleTwo = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.fontColor};
  margin-top: 43px;
  margin-left: 33px;
  cursor: pointer;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const TitleStyled = styled.div`
  display: flex;
  margin-top: 44px;
`;

const SubTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.fontColor};
  margin-right: 17px;
`;

const DateTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.dateTitle};
  margin-right: 35px;
`;

const InputSearch = styled.input`
  border: none;
  border-bottom: 2px solid #39c6bb;
  max-width: 272px;
  width: 100%;
  padding-left: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  ::placeholder {
    color: #818181;
  }
  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const InputStyled = styled.div`
  position: relative;
  width: 272px;
  margin-left: 70px;
  img {
    position: absolute;
    right: 5px;
    top: 2px;
    cursor: pointer;
  }
`;

const ButtonFilter = styled.button`
  width: 118px;
  height: 35px;
  background: #ffffff;
  border: 2px solid #39c6bb;
  border-radius: 43px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  color: #39c6bb;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 26px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  :hover {
    opacity: 0.8;
  }
  img {
    margin-left: 11px;
  }
`;

const Table = styled.table`
  margin-top: 22px;
  margin-bottom: 59px;
  width: 100%;
  th {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: ${(props) => props.theme.colors.title};
    border-top: 2px solid #e0e0e0;
    padding: 22px 12px 15px 12px;
    border-right: 1px solid #e0e0e0;
    text-align: left;
  }
  td {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: #151f1e;
    border: 1px solid #e0e0e0;
    border-left: none;
    padding: 15px 0px 14px 12px;
    img {
      position: absolute;
      right: 8px;
      top: 26px;
      cursor: pointer;
    }
    &:first-child {
      position: relative;
      width: 295px;
    }
    &:last-child {
      text-align: center;
    }
  }
`;

const CollumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FilterContainer = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all ease-in-out 0.3s;
  width: 456px;
  padding-bottom: 40px;
  background: #fff;
  border-radius: 16px;
  position: absolute;
  margin-top: 20px;
  right: 20px;
  box-shadow: 0px 8px 16px 2px rgba(97, 97, 97, 0.1),
    0px 16px 32px 2px rgba(97, 97, 97, 0.1);
`;

const HeaderFilter = styled.div`
  max-width: 408px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 0 33px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 120%;
    color: #000000;
    text-align: center;
  }
`;

const RadioButtonLabelOrder = styled.label`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;

const RadioButtonLabelDate = styled.label`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
  margin-left: 40px;
`;

const RadioButtonOrder = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  &:hover ~ ${RadioButtonLabelOrder} {
    background: #bebebe;
    cursor: pointer;
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabelOrder} {
      background: #fff;
      border: 1px solid #6EAEA9;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin-top: 2px;
        margin-left: 2px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #6EAEA9;
      }
    }
  `}
`;

const RadioButtonPendente = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  margin-left: 1px;
  &:hover ~ ${RadioButtonLabelOrder} {
    background: #bebebe;
    cursor: pointer;
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabelOrder} {
      background: #fff;
      border: 1px solid #6EAEA9;
      border-radius: 50%;
      &::after {
        content: "";
        display: block;
        width: 10px;
        border-radius: 50%;
        height: 10px;
        margin-top: 2px;
        margin-left: 2px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #6EAEA9;
      }
    }
  `}
`;

const RadioButtonDate = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  position: absolute;
  margin-left: 213px;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelDate} {
    background: #bebebe;
    cursor: pointer;
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabelDate} {
      background: #fff;
      border: 1px solid #6EAEA9;
      &::after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 2px;
        margin-left: 2px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #6EAEA9;
      }
    }
  `}
`;

const RadioButtonEfetuado = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  position: absolute;
  margin-left: 104px;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabelDate} {
    background: #bebebe;
    cursor: pointer;
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabelDate} {
      background: #fff;
      border: 1px solid #6EAEA9;
      &::after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 2px;
        margin-left: 2px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #6EAEA9;
      }
    }
  `}
`;

const BodyFilter = styled.div`
  max-width: 408px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    margin-top: 32px;
    color: #6eaea9;
    margin-bottom: 24px;
  }
  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: #151f1e;
    margin-left: 15px;
    :first-child {
      border: 1px solid red;
    }
  }
`;

const StyledCloseFilter = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #79c6c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarDate = styled.div`
  width: 88px;
  height: 48px;
  border-radius: 8px 0px 0px 8px;
  backdrop-filter: blur(20px);
  background: rgba(110, 174, 169, 0.2);
  border: 1px solid #6eaea9;
  padding: 15px 18px 15px 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Manrope", "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.0168em;
  color: #6eaea9;
  cursor: pointer;
  margin-bottom: 24px;
  span {
    margin-left: 8px;
    font-family: "Manrope", "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.0168em;
    color: #6eaea9;
  }
`;

const SelectDate = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all ease-in-out 0.3s;
`;

const CalendarStyled = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  display: ${(props) => (props.isOpen ? "block" : "none")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  position: absolute;
  z-index: 2;
`;

const FilterButtonStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ButtonFilterModal = styled.button`
  margin-top: 16px;
  width: 195px;
  height: 49px;
  background: #39c6bb;
  border-radius: 43px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  color: #ffffff;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 0.8;
  }
`;

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 40px;
  border-bottom: 1px solid #e0e0e0;
  max-width: 798px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

const ShowTickets = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 20px;
  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    color: #000000;
  }
`;

const ButtonTicket = styled.button`
  padding: 8px 14px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  color: #818181;
  background: #e0e0e0;
  border-radius: 43px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-left: 24px;
  :hover {
    opacity: 0.8;
    background: #39c6bb;
    color: #fff;
  }
  :focus {
    opacity: 0.8;
    background: #39c6bb;
    color: #fff;
  }
`;

const CircularStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    color: #095a54;
    margin-bottom: 16px;
    margin-top: 20px;
  }
`;

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  margin-bottom: 16px;
`;
