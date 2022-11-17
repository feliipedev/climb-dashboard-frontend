import Header from "../../components/Header/Header";
import styled from "styled-components";
import Search from "../../assets/icons/search.svg";
import Filter from "../../assets/icons/filter.svg";
import Eye from "../../assets/icons/eye.svg";
import CloseFilter from "../../assets/icons/close-filter.svg";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Calendar from "react-calendar";

export interface Select {
  name: string;
  email: string;
  date: string;
  quantity: string;
  parcela: string;
  status: "Pendente" | "Em atraso" | "Efetuado";
}

const Home = (): JSX.Element => {
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [selectOrder, setSelectOrder] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<boolean>(false);
  const [selectPendente, setSelectPendente] = useState<boolean>(false);
  const [selectEfetuado, setSelectEfetuado] = useState<boolean>(false);
  const [dateInitial, setDateInitial] = useState<any>();
  const [openDateInitial, setOpenDateInitial] = useState(false);
  const [dateEnd, setDateEnd] = useState<any>();
  const [openDateEnd, setOpenDateEnd] = useState(false);
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
  const [filteredItems, setFilteredItems] = useState<Select[]>([]);

  useEffect(() => {
    if (selectOrder) {
      setFilteredItems(
        bodyTable.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        )
      );
    }
  }, [selectOrder, selectDate]);

  useEffect(() => {
    if (dateInitial && dateInitial.length === 2) {
      setTimeout(() => {
        setOpenDateInitial(false);
      }, 1500);
    }
    if (dateEnd && dateEnd.length === 2) {
      setTimeout(() => {
        setOpenDateEnd(false);
      }, 1500);
    }
  }, [dateInitial, dateEnd]);

  return (
    <>
      <Header />
      <Container>
        <FlexContainer>
          <Title>Acompanhamento</Title>
          <TitleTwo>Solicitações</TitleTwo>
        </FlexContainer>
      </Container>
      <Container>
        <TitleStyled>
          <SubTitle>Mostrando perído:</SubTitle>
          <DateTitle>01 de maio de 2022</DateTitle>
          <SubTitle>a</SubTitle>
          <DateTitle>25 de maio de 2022</DateTitle>
          <InputStyled>
            <InputSearch placeholder="Buscar por nome" />
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
                    name="radio"
                    checked={selectOrder}
                    onClick={() => setSelectOrder(!selectOrder)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Ordem alfabética</span>
                  <RadioButtonDate
                    type="radio"
                    name="radio"
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
                    name="radio"
                    checked={selectPendente}
                    onClick={() => setSelectPendente(!selectPendente)}
                  />
                  <RadioButtonLabelOrder />
                  <span>Pendente</span>
                  <RadioButtonEfetuado
                    type="radio"
                    name="radio"
                    checked={selectEfetuado}
                    onClick={() => setSelectEfetuado(!selectEfetuado)}
                  />
                  <RadioButtonLabelDate />
                  <span>Efetuado</span>
                </FlexContainer>

                <SelectDate isOpen={selectDate}>
                  <p>Selecionar período:</p>
                  <FlexContainer>
                    <CalendarDate onClick={() => setOpenDateInitial(true)}>
                      <img src={CalendarIcon} alt="calendario" />
                      <>De</>
                    </CalendarDate>
                    <CalendarContainer>
                      <>01 mai, 2022</>
                    </CalendarContainer>
                  </FlexContainer>
                  <CalendarStyled isOpen={openDateInitial}>
                    <Calendar
                      onChange={setDateInitial}
                      value={dateInitial}
                      selectRange={true}
                      calendarType="US"
                    />
                  </CalendarStyled>
                  <FlexContainer>
                    <CalendarDate onClick={() => setOpenDateInitial(true)}>
                      <img src={CalendarIcon} alt="calendario" />
                      <span>Até</span>
                    </CalendarDate>
                    <CalendarContainer>
                      <>01 mai, 2022</>
                    </CalendarContainer>
                  </FlexContainer>
                  <CalendarStyled isOpen={openDateEnd}>
                    <Calendar
                      onChange={setDateEnd}
                      value={dateEnd}
                      selectRange={true}
                      calendarType="US"
                    />
                  </CalendarStyled>
                </SelectDate>
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
              titleTable.map((title: string) => {
                return <th>{title}</th>;
              })}
          </tr>
          {filteredItems.length > 0
            ? filteredItems.map((body: Select) => {
                return (
                  <tr>
                    <td>
                      <>{body.name}</>
                      <img src={Eye} alt="olho" />
                    </td>
                    <td>{body.email}</td>
                    <td>{body.date}</td>
                    <td>{body.quantity}</td>
                    <td>{body.parcela}</td>
                    <td>
                      <Select body={body} />
                    </td>
                  </tr>
                );
              })
            : bodyTable.length > 0 &&
              bodyTable.map((body: Select) => {
                return (
                  <tr>
                    <td>
                      <>{body.name}</>
                      <img src={Eye} alt="olho" />
                    </td>
                    <td>{body.email}</td>
                    <td>{body.date}</td>
                    <td>{body.quantity}</td>
                    <td>{body.parcela}</td>
                    <td>
                      <Select body={body} />
                    </td>
                  </tr>
                );
              })}
        </Table>
      </Container>
    </>
  );
};

export default Home;

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
`;

const FilterContainer = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all ease-in-out 0.3s;
  max-width: 456px;
  width: 100%;
  height: 679px;
  background: #fff;
  border-radius: 16px;
  position: absolute;
  right: 160px;
  margin-top: 20px;
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

const RadioButtonLabelEfetuado = styled.label`
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

const CalendarContainer = styled.div`
  width: 152px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #6eaea9;
  border-radius: 0px 8px 8px 0px;
  font-family: "Manrope", "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  letter-spacing: 0.0168em;
  color: #2d2527;
  padding-left: 12px;
  margin-bottom: 24px;
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
  .react-calendar {
    width: 478px;
    max-width: 100%;
    background: #ffffff;
    box-shadow: 0px 8px 16px 2px rgba(97, 97, 97, 0.1),
      0px 16px 32px 2px rgba(97, 97, 97, 0.1);
    border-radius: 12px;
    font-family: "Inter", "Poppins";
    line-height: 132%;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  /* .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  } */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: rgba(121, 198, 192, 0.5);
    border: 1.29957px solid rgba(121, 198, 192, 0.5);
    border-radius: 50%;
    font-family: "Manrope", "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0.005em;
    color: #095a54;
    width: 42px;
    height: 42px;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  span {
    border: none !important;
  }
`;

const FilterButtonStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
