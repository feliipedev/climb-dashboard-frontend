import styled from "styled-components";
import React, { SetStateAction, useState } from "react";
import CloseFilter from "../../../assets/icons/close-filter.svg";
import Select from "../../../components/Select/Select";
import EyeModal from "../../../assets/icons/eye-modal.svg";
import { Loan } from "../../../pages/SideDish/SideDish";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

const ModalDetailsClient = ({ isOpen, onClose }: Props): JSX.Element => {
  const [titleTable, setTitleTable] = useState<string[]>([
    "Data de Vencimento",
    "Valor da Parcela",
    "Comprovante de Pagamento",
    "Status",
  ]);
  const [bodyTable, setBodyTable] = useState<Loan[]>([
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
  ]);

  return (
    <ScreenContainer isVisible={isOpen}>
      <Container>
        <ContainerForm>
          <HeaderModal>
            <h1>Detalhamento</h1>
            <CollumnContainer>
              <Name>Amanda Gomes Rocha</Name>
              <Email>amandarocha@email.com</Email>
            </CollumnContainer>
            <StyledCloseFilter onClick={() => onClose(false)}>
              <img src={CloseFilter} alt="fechar filtro" />
            </StyledCloseFilter>
          </HeaderModal>
          <Table>
            <tr>
              {titleTable &&
                titleTable.map((title: string, index: number) => {
                  return <th key={index}>{title}</th>;
                })}
            </tr>
            {bodyTable.map((body: Loan, index: number) => {
              return (
                <tr key={index}>
                  <td>{body.date} </td>
                  <td>{body.parcela}</td>
                  <td>
                    {body.comprovante} <img src={EyeModal} alt="olho" />
                  </td>
                  <td>
                    <Select
                      loan={body}
                      loans={bodyTable}
                      setLoans={setBodyTable}
                      i={index}
                    />
                  </td>
                </tr>
              );
            })}
          </Table>
        </ContainerForm>
      </Container>
    </ScreenContainer>
  );
};

export default ModalDetailsClient;

const ScreenContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  border-radius: 6px;
  i {
    color: black;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 25px;
    margin-top: 26px;
    display: block;
    padding: 4px 8px;
    background: #fff;
    border-radius: 5px;
  }
`;

const ContainerForm = styled.section`
  max-width: 1041px;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  background-color: #fff;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  border-radius: 6px;
  padding: 33px 26px 40px 24px;
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 120%;
    color: #000000;
    max-width: 408px;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    margin-left: 20px;
    padding-bottom: 30px;
  }
`;

const CollumnContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Name = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  margin-bottom: 7px;
  color: #6eaea9;
  text-align: left;
`;

const Email = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #151f1e;
`;

const Table = styled.table`
  margin-top: 32px;
  margin-bottom: 59px;
  width: 100%;
  th {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: #6eaea9;
    border-right: 1px solid #e0e0e0;
    text-align: left;
    padding-left: 20px;
    padding-top: 11px;
    padding-bottom: 19px;
    &:last-child {
      border-right: none;
    }
  }
  td {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: #151f1e;
    border: 1px solid #e0e0e0;
    padding-top: 11px;
    padding-bottom: 19px;
    border-left: none;
    text-align: left;
    padding-left: 20px;
    img {
      margin-left: 8px;
      cursor: pointer;
    }
    &:last-child {
      border-right: none;
    }
  }
`;
