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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Spinner from "../../components/LoadingTable.tsx/LoadingTable";
import useProtectedPage from "../../hooks/useProtectedPage";
import HeaderTable from "../../components/HeaderTable/HeaderTable";
import { getListOfOutstandingLoans, getSideDish } from "../../services/loan";

export interface Loan {
  emprestimo_id: number;
  name: string;
  email: string;
  date: string;
  quantity: number;
  parcela: string;
  status_descricao: "Pendente" | "Em atraso" | "Efetuado";
  comprovante?: string;
  numero_parcela: number;
}

const SideDish = (): JSX.Element => {
  useProtectedPage();
  const navigate = useNavigate();
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [select, setSelect] = useState<
    "Pendente" | "Efetuado" | "Order" | "Clear"
  >();
  const [pg, setPg] = useState<number>(0);
  const [pp, setPp] = useState<number>(8);
  const [search, setSearch] = useState<string>("");
  const [openDateInitial, setOpenDateInitial] = useState(false);
  const [dateInitial, setDateInitial] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false);
  const [titleTable, setTitleTable] = useState<string[]>([
    "Cliente",
    "E-mail",
    "Vencimento",
    "Valor Total",
    "Parcela",
    "Aprovação",
  ]);
  const [bodyTable, setBodyTable] = useState<Loan[]>([]);
  const [bodyTableAux, setBodyTableAux] = useState<Loan[]>(bodyTable);
  const [loading, setLoading] = useState<boolean>(true);
  const [beforeDate, setBeforeDate] = useState<string>("");
  const [afterDate, setAfterDate] = useState<string>("");
  const [aproved, setAproved] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleFilter = () => {
    if (select === "Order") {
      bodyTable.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );
      setOpenModalFilter(false);
    }
    if (select === "Pendente") {
      setBodyTable(
        bodyTableAux.filter((item) => item.status_descricao === "Pendente")
      );
      setOpenModalFilter(false);
    }

    if (select === "Efetuado") {
      setBodyTable(
        bodyTableAux.filter((item) => item.status_descricao === "Efetuado")
      );
      setOpenModalFilter(false);
    }

    if (select === "Clear") {
      setDateInitial(undefined);
      setDateEnd(undefined);
      setOpenModalFilter(false);
      return setBodyTable(bodyTableAux);
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
      setOpenModalFilter(false);
    }
  };

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

  function comparar_datas(a: any, b: any) {
    let d1 = moment(a.date, "YYYY-MMM-DD");
    let d2 = moment(b.date, "YYYY-MMM-DD");
    if (d1.isAfter(d2)) {
      return 1;
    } else if (d1.isBefore(d2)) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    if (bodyTable.length > 0) {
      moment.locale("pt");
      bodyTable.sort(comparar_datas);
      setBeforeDate(bodyTable[bodyTable.length - 1].date);
      setAfterDate(bodyTable[0].date);
      handleAproved();
      handlePending();
    }
  }, [bodyTable]);

  const handleAproved = () => {
    let ap = bodyTable.filter((item) => item.status_descricao === "Efetuado");
    setAproved((ap.length / bodyTable.length) * 100);
  };

  const handlePending = () => {
    let ap = bodyTable.filter((item) => item.status_descricao === "Pendente");
    setPending((ap.length / bodyTable.length) * 100);
  };

  const handleFilterDate = (ultimateDate: number) => {
    var dataUltimateDays = new Date();
    dataUltimateDays.setDate(dataUltimateDays.getDate() - ultimateDate);
    var dia = String(dataUltimateDays.getDate()).padStart(2, "0");
    var mes = String(dataUltimateDays.getMonth() + 1).padStart(2, "0");
    var ano = dataUltimateDays.getFullYear();
    const dataAtual = dia + "/" + mes + "/" + ano;
    setBodyTable(
      bodyTableAux.filter((item) => {
        let date1 = moment(item.date, "DD/MM/YYYY").format("YYYYMMDD");
        let date2 = moment(dataAtual, "DD/MM/YYYY").format("YYYYMMDD");
        return moment(date1).isAfter(date2);
      })
    );
  };

  const pages: number = Math.ceil(bodyTable ? bodyTable.length / pp : 0);
  const startIndex = pg * pp;
  const endIndex = startIndex + pp;
  const current: Loan[] | undefined = bodyTable?.slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(true);
    handleList();
    setLoading(false);
  }, []);

  const handleList = async () => {
    await getSideDish().then((res: any) => {
      let sum = 0;
      res.result.map((item: any) => {
        let dateAux = new Date(item.vencimento);
        let dateFormated = moment(dateAux).format("DD/MM/YYYY").toString();
        let aux: Loan = {
          name: item.customer_name,
          email: item.customer_email,
          date: dateFormated,
          emprestimo_id: 1,
          quantity: item.valor_total,
          parcela: item.parcelas,
          numero_parcela: 1,
          status_descricao: item.status_descricao,
        };
        sum += item.valor_total;
        setBodyTableAux((current) => [...current, aux]);
        return setBodyTable((current) => [...current, aux]);
      });
      setTotal(sum);
    });
  };

  return (
    <HomeStyled>
      <Header />
      <HeaderTable select="Acompanhamento" />
      {loading ? (
        <StyledLoading>
          <Spinner />
        </StyledLoading>
      ) : (
        <>
          <Container>
            <TitleStyled>
              <SubTitle>Mostrando perído:</SubTitle>
              <DateTitle>{beforeDate}</DateTitle>
              <SubTitle>a</SubTitle>
              <DateTitle>{afterDate}</DateTitle>
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
                    <StyledCloseFilter
                      onClick={() => setOpenModalFilter(false)}
                    >
                      <img src={CloseFilter} alt="fechar filtro" />
                    </StyledCloseFilter>
                  </HeaderFilter>
                  <BodyFilter>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="clear"
                          control={<Radio />}
                          label="Limpar filtros"
                          onChange={() => setSelect("Clear")}
                        />
                        <CollumnContainer>
                          <p>Ordenar por:</p>
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Ordem alfabética"
                            onChange={() => setSelect("Order")}
                          />
                        </CollumnContainer>
                        <p>Status de pagamento:</p>
                        <FlexContainer>
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Efetuado"
                            onChange={() => setSelect("Efetuado")}
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Pendente"
                            onChange={() => setSelect("Pendente")}
                          />
                        </FlexContainer>
                      </RadioGroup>
                    </FormControl>{" "}
                    <SelectDate>
                      <p>Selecionar período:</p>
                      <FlexContainer>
                        <CalendarDate>
                          <img src={CalendarIcon} alt="calendario" />
                          <span>De</span>
                        </CalendarDate>
                        <FilterComponent
                          date={dateInitial as Date}
                          setDate={setDateInitial}
                        />
                      </FlexContainer>
                      <FlexContainer>
                        <CalendarDate>
                          <img src={CalendarIcon} alt="calendario" />
                          <span>Até</span>
                        </CalendarDate>
                        <FilterComponent
                          date={dateEnd as Date}
                          setDate={setDateEnd}
                        />
                      </FlexContainer>
                    </SelectDate>
                  </BodyFilter>

                  <FilterButtonStyled>
                    <ButtonFilterModal onClick={() => handleFilter()}>
                      Filtrar
                    </ButtonFilterModal>
                  </FilterButtonStyled>
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
              {current.map((body: Loan, index: number) => {
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
                    <td>
                      {body.quantity.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>{body.parcela}</td>
                    <td>
                      <Select loan={body} setLoans={setBodyTable} i={index} />
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
              <p>Acompanhamento:</p>
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
                <CircularProgress percentage={aproved} />
              </AlignContainer>
              <AlignContainer>
                <p>Pendentes</p>
                <CircularProgress percentage={pending} />
              </AlignContainer>
              <AlignContainer>
                <p>Total</p>
                <CircularProgressBarBase percentage={total} />
              </AlignContainer>
            </CircularStyled>
          </Container>
        </>
      )}
      <ModalDetailsClient
        isOpen={openModalDetails}
        onClose={setOpenModalDetails}
        id={1}
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
  background: #f5f5f5;
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
  margin-bottom: 20px;
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
  margin-left: 24px;
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

const SelectDate = styled.div`
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

const StyledLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function currencyFormat(arg0: number): number {
  throw new Error("Function not implemented.");
}
