import Header from "../../components/Header/Header";
import styled from "styled-components";
import Search from "../../assets/icons/search.svg";
import Filter from "../../assets/icons/filter.svg";
import Eye from "../../assets/icons/eye.svg";
import CloseFilter from "../../assets/icons/close-filter.svg";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Pagination from "../../components/Pagination/Pagination";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import CircularProgressBarBase from "../../components/CircularProgress/CircleProgressBarBase";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ModalDetailsClient from "../../components/Modals/ModalDetailsClient/ModalDetailsClient";
import FilterComponent from "../../components/Filter/Filter";
export interface Select {
  name: string;
  email: string;
  date: string;
  quantity: string;
  parcela: string;
  status: "Pendente" | "Em atraso" | "Efetuado";
}

const SideDish = (): JSX.Element => {
  const navigate = useNavigate();
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [disabledFilter, setDisabledFilter] = useState<boolean>(false);
  const [selectOrdem, setSelectOrdem] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<boolean>(false);
  const [selectPendente, setSelectPendente] = useState<boolean>(false);
  const [selectEfetuado, setSelectEfetuado] = useState<boolean>(false);
  const [pg, setPg] = useState<number>(0);
  const [pp, setPp] = useState<number>(8);
  const [search, setSearch] = useState<string>("");
  const [dateInitial, setDateInitial] = useState<Date>();
  const [openDateInitial, setOpenDateInitial] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date>();
  const [openDateEnd, setOpenDateEnd] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false);
  const [titleTable, setTitleTable] = useState<string[]>([
    "Cliente",
    "E-mail",
    "Último Pagam.",
    "Valor Total",
    "Parcela",
    "Status de pagamento",
  ]);
  const [bodyTable, setBodyTable] = useState<Select[]>([
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "21/11/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Rafael Silva Mateus",
      email: "rafael@email.com",
      date: "21/10/2022",
      quantity: "R$ 18000,00",
      parcela: "6/24",
      status: "Em atraso",
    },
    {
      name: "Conh MackBook",
      email: "jonh@email.com",
      date: "21/08/2022",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Donh MackBook",
      email: "jonh@email.com",
      date: "14/06/2022",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Eonh MackBook",
      email: "jonh@email.com",
      date: "14/05/2001",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Fonh MackBook",
      email: "jonh@email.com",
      date: "14/04/2006",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Rafael Silva Mateus",
      email: "rafael@email.com",
      date: "30/08/1970",
      quantity: "R$ 18000,00",
      parcela: "6/24",
      status: "Em atraso",
    },
    {
      name: "Conh MackBook",
      email: "jonh@email.com",
      date: "14/06/1999",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Donh MackBook",
      email: "jonh@email.com",
      date: "14/06/2000",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Eonh MackBook",
      email: "jonh@email.com",
      date: "14/05/2001",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Fonh MackBook",
      email: "jonh@email.com",
      date: "14/04/2006",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Rafael Silva Mateus",
      email: "rafael@email.com",
      date: "30/08/1970",
      quantity: "R$ 18000,00",
      parcela: "6/24",
      status: "Em atraso",
    },
    {
      name: "Conh MackBook",
      email: "jonh@email.com",
      date: "14/06/1999",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Donh MackBook",
      email: "jonh@email.com",
      date: "14/06/2000",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Eonh MackBook",
      email: "jonh@email.com",
      date: "14/05/2001",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Fonh MackBook",
      email: "jonh@email.com",
      date: "14/04/2006",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Rafael Silva Mateus",
      email: "rafael@email.com",
      date: "30/08/1970",
      quantity: "R$ 18000,00",
      parcela: "6/24",
      status: "Em atraso",
    },
    {
      name: "Conh MackBook",
      email: "jonh@email.com",
      date: "14/06/2021",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Donh MackBook",
      email: "jonh@email.com",
      date: "14/06/2000",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Eonh MackBook",
      email: "jonh@email.com",
      date: "14/05/2001",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Fonh MackBook",
      email: "jonh@email.com",
      date: "14/04/2006",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Amanda Gomes Rocha",
      email: "amandarocha@email.com",
      date: "10/05/2022",
      quantity: "R$ 15000,00",
      parcela: "2/24",
      status: "Pendente",
    },
    {
      name: "Rafael Silva Mateus",
      email: "rafael@email.com",
      date: "30/08/1970",
      quantity: "R$ 18000,00",
      parcela: "6/24",
      status: "Em atraso",
    },
    {
      name: "Conh MackBook",
      email: "jonh@email.com",
      date: "14/06/1999",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Donh MackBook",
      email: "jonh@email.com",
      date: "14/06/2000",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Eonh MackBook",
      email: "jonh@email.com",
      date: "14/05/2001",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
    {
      name: "Fonh MackBook",
      email: "jonh@email.com",
      date: "14/04/2006",
      quantity: "R$ 22000,00",
      parcela: "19/24",
      status: "Efetuado",
    },
  ]);
  const [bodyTableAux, setBodyTableAux] = useState<Select[]>(bodyTable);
  const [filteredItems, setFilteredItems] = useState<Select[]>([]);

  useEffect(() => {
    if (selectOrdem) {
      return setBodyTable(
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
      setBodyTable(bodyTable.filter((item) => item.status === "Pendente"));
    }
    if (selectEfetuado) {
      setBodyTable(bodyTable.filter((item) => item.status === "Efetuado"));
    }
    if (dateInitial && dateEnd) {
      var dia = String(dateInitial.getDate()).padStart(2, "0");
      var mes = String(dateInitial.getMonth() + 1).padStart(2, "0");
      var ano = dateInitial.getFullYear();
      const dataI = dia + "/" + mes + "/" + ano;
      var diaTwo = String(dateEnd.getDate()).padStart(2, "0");
      var mesTwo = String(dateEnd.getMonth() + 1).padStart(2, "0");
      var anoTwo = dateEnd.getFullYear();
      const dataTwo = diaTwo + "/" + mesTwo + "/" + anoTwo;
      setBodyTable(
        bodyTable.filter((item) => {
          let date1 = moment(item.date, "DD/MM/YYYY").format("YYYYMMDD");
          let date2 = moment(dataI, "DD/MM/YYYY").format("YYYYMMDD");
          let date3 = moment(dataTwo, "DD/MM/YYYY").format("YYYYMMDD");
          return moment(date2).isBefore(date1) && moment(date3).isAfter(date1);
        })
      );
    }
  }, [
    selectPendente,
    selectEfetuado,
    selectData,
    selectOrdem,
    dateInitial,
    dateEnd,
  ]);

  useEffect(() => {
    if (search) {
      setBodyTable(
        bodyTable.filter((item) =>
          item.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
        )
      );
    } else {
      setBodyTable(bodyTableAux);
    }
  }, [search]);

  const handleFilterDate = (ultimateDate: number) => {
    var dataUltimateDays = new Date();
    dataUltimateDays.setDate(dataUltimateDays.getDate() - ultimateDate);
    var dia = String(dataUltimateDays.getDate()).padStart(2, "0");
    var mes = String(dataUltimateDays.getMonth() + 1).padStart(2, "0");
    var ano = dataUltimateDays.getFullYear();
    const dataAtual = dia + "/" + mes + "/" + ano;
    setBodyTable(
      bodyTable.filter((item) => {
        let date1 = moment(item.date, "DD/MM/YYYY").format("YYYYMMDD");
        let date2 = moment(dataAtual, "DD/MM/YYYY").format("YYYYMMDD");
        return moment(date1).isAfter(date2);
      })
    );
  };

  const pages: number = Math.ceil(bodyTable ? bodyTable.length / pp : 0);
  const startIndex = pg * pp;
  const endIndex = startIndex + pp;
  const current: Select[] | undefined = bodyTable?.slice(startIndex, endIndex);

  return (
    <HomeStyled>
      <Header />
      <Container>
        <FlexContainer>
          <Title onClick={() => navigate("/")}>Acompanhamento</Title>
          <TitleTwo onClick={() => navigate("/solicitacoes")}>
            Solicitações
          </TitleTwo>
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
                  <RadioButtonOrdem
                    type="radio"
                    name="radioButtonType"
                    value="radioButtonOrder"
                    checked={selectOrdem}
                    onChange={() => setSelectOrdem(!selectOrdem)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Ordem alfabética</span>
                </FlexContainer>
                <p>Status de pagamento:</p>
                <FlexContainer>
                  <RadioButtonPendente
                    type="radio"
                    name="radioButtonStatus"
                    value="radioButtonPendente"
                    checked={selectPendente}
                    onChange={() => setSelectPendente(!selectPendente)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Pendente</span>
                  <RadioButtonEfetuado
                    type="radio"
                    name="radioButtonStatus"
                    value="radioButtonEfetuado"
                    checked={selectEfetuado}
                    onChange={() => setSelectEfetuado(!selectEfetuado)}
                  />
                  <RadioButtonLabelDate />
                  <span>Efetuado</span>
                </FlexContainer>
                <SelectDate>
                  <p>Selecionar período:</p>
                  <FlexContainer>
                    <CalendarDate onClick={() => setOpenDateInitial(true)}>
                      <img src={CalendarIcon} alt="calendario" />
                      <span>De</span>
                    </CalendarDate>
                    <FilterComponent
                      date={dateInitial as Date}
                      setDate={setDateInitial}
                    />
                  </FlexContainer>
                  <FlexContainer>
                    <CalendarDate onClick={() => setOpenDateInitial(true)}>
                      <img src={CalendarIcon} alt="calendario" />
                      <span>Até</span>
                    </CalendarDate>
                    <FilterComponent
                      date={dateEnd as Date}
                      setDate={setDateEnd}
                    />
                  </FlexContainer>
                  <CalendarStyled isOpen={openDateEnd}></CalendarStyled>
                </SelectDate>
                <FilterButtonStyled>
                  <ButtonFilterModal isOpen={selectData}>
                    Filtrar
                  </ButtonFilterModal>
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
          {current.map((body: Select, index: number) => {
            return (
              <tr key={index}>
                <td>
                  <>{body.name}</>
                  <img
                    src={Eye}
                    alt="olho"
                    onClick={() => setOpenModalDetails(true)}
                  />
                </td>
                <td>{body.email}</td>
                <td>{body.date}</td>
                <td>{body.quantity}</td>
                <td>{body.parcela}</td>
                <td>
                  <Select status={body.status} />
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
          <ButtonTicket onClick={() => handleFilterDate(7)}>
            Últimos 7 dias
          </ButtonTicket>
          <ButtonTicket onClick={() => handleFilterDate(30)}>
            Últimos 30 dias
          </ButtonTicket>
          <ButtonTicket onClick={() => handleFilterDate(90)}>
            Últimos 3 meses
          </ButtonTicket>
          <ButtonTicket onClick={() => handleFilterDate(180)}>
            Últimos 6 meses
          </ButtonTicket>
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

export default SideDish;

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
  padding-bottom: 56px;
  background: #fff;
  border-radius: 16px;
  position: absolute;
  margin-top: -151px;
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
  margin-left: -1px;
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
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  margin-left: -1px;
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

const RadioButtonOrdem = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  margin-left: -1px;
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

const RadioButtonData = styled.input`
  opacity: 0;
  margin-top: 1px;
  z-index: 1;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  margin-left: 213px;
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
  margin-left: 147px;
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

const SelectDate = styled.div``;

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
`;

const ButtonFilterModal = styled.button<{ isOpen: boolean }>`
  margin-top: ${(props) => (props.isOpen ? "16px" : "40px")};
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
