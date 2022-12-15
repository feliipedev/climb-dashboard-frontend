import styled from "styled-components";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import CloseFilter from "../../../assets/icons/close-filter.svg";
import Select from "../../../components/Select/Select";
import EyeModal from "../../../assets/icons/eye-modal.svg";
import { FlexContainer, Loan } from "../../../pages/SideDish/SideDish";
import { getLoans } from "../../../services/loan";
import Spinner from "../../Spinner/Spinner";
import moment from "moment";
import Pagination from "../../Pagination/Pagination";
import UploadIcon from "../../../assets/icons/upload.png";
import ModalHandleImage from "../ModalHandleImage/ModalHandleImage";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  id: number;
};

interface Upload {
  name: string;
  image: string;
}

const ModalDetailsClient = ({ isOpen, onClose, id }: Props): JSX.Element => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hiddenIndex = useRef<HTMLInputElement>(null);
  const [titleTable, setTitleTable] = useState<string[]>([
    "Data de Vencimento",
    "Valor da Parcela",
    "Comprovante de Pagamento",
    "Aprovação",
  ]);
  const [bodyTable, setBodyTable] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pg, setPg] = useState<number>(0);
  const [pp, setPp] = useState<number>(4);
  const [upload, setUpload] = useState<Upload[]>([]);
  const [data, setData] = useState<File[]>([]);
  const [image, setImage] = useState<string>("");
  const [modalImage, setModalImage] = useState<boolean>(false);
  const [openMessageUpload, setOpenMessageUpload] = useState<number>();
  const [openMessageUploadSuccess, setOpenMessageUploadSuccess] =
    useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      handleRequest();
    }, 2000);
  }, []);

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
              setData((prev) => [...prev, selectedFile]);
            }
          };
        }
      });
    }
  };

  const handleRequest = async () => {
    setLoading(true);
    await getLoans(id).then((res) => {
      if (res.internal_code === 200) {
        setTimeout(() => {
          setBodyTable(
            res.result.map((res: any, index: number) => {
              const loan: Loan = {
                name: "Jonh MackBook" + index,
                email: `teste${index}@gmail.com`,
                date: moment(res.vencimento).format("DD/MM/YYYY"),
                quantity: res.valor,
                status_descricao:
                  res.status_descricao === "A Pagar"
                    ? "Pendente"
                    : res.status_descricao,
                parcela: "2/24",
                comprovante: "comprovante.jpg",
                emprestimo_id: res.emprestimo_id,
                numero_parcela: res.numero_parcela,
              };
              return loan;
            })
          );
          setLoading(false);
        }, 2000);
      } else {
        toast.error("Falha ao conectar com o servidor...");
      }
    });
  };

  const pages: number = Math.ceil(bodyTable ? bodyTable.length / pp : 0);
  const startIndex = pg * pp;
  const endIndex = startIndex + pp;
  const current: Loan[] | undefined = bodyTable?.slice(startIndex, endIndex);

  const handleOpenModal = (index: number) => {
    if (upload.length > 0) {
      setImage(upload[0].image);
      setModalImage(true);
    } else {
      setOpenMessageUpload(index);
      setTimeout(() => {
        setOpenMessageUpload(undefined);
      }, 3000);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setOpenMessageUploadSuccess(true);
      setTimeout(() => {
        setOpenMessageUploadSuccess(false);
      }, 3000);
    }
  }, [data]);

  return (
    <ScreenContainer isVisible={isOpen}>
      <ModalHandleImage
        image={image}
        isOpen={modalImage}
        onClose={() => setModalImage(false)}
      />
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
          {loading ? (
            <StyledLoading>
              <Spinner />
            </StyledLoading>
          ) : (
            <>
              <Table>
                <tr>
                  {titleTable &&
                    titleTable.map((title: string, index: number) => {
                      return <th key={index}>{title}</th>;
                    })}
                </tr>
                {current &&
                  current.map((body: Loan, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{body.date} </td>
                        <td>{body.quantity}</td>
                        <td>
                          <CollumnContainer>
                            <FlexContainer>
                              {body.comprovante}{" "}
                              <img
                                src={EyeModal}
                                alt="olho"
                                onClick={() => handleOpenModal(index)}
                              />{" "}
                              <input
                                type={"file"}
                                accept="image/*"
                                multiple
                                ref={hiddenFileInput}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                              />
                              <UploadImg
                                src={UploadIcon}
                                alt="upload"
                                onClick={() => handleClick()}
                              />
                            </FlexContainer>
                            <MessaUploadStyled
                              open={openMessageUpload === index}
                            >
                              Faça o upload de algum comprovante para
                              visualizar.
                            </MessaUploadStyled>
                          </CollumnContainer>
                        </td>
                        <td>
                          <Select
                            loan={body}
                            setLoans={setBodyTable}
                            i={index}
                          />
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
              <MessaUploadStyledSuccess open={openMessageUploadSuccess}>
                Upload realizado.
              </MessaUploadStyledSuccess>
            </>
          )}
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
  z-index: 10;
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

const StyledLoading = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

const UploadImg = styled.img`
  object-fit: contain;
  width: 16px;
  margin-bottom: -2px;
  cursor: pointer;
`;

const MessaUploadStyled = styled.div<{ open: boolean }>`
  transition: all 0.5s ease-in-out;
  opacity: ${(props) => (props.open ? 1 : 0)};
  font-size: 12px;
  color: red;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  margin-top: 22px;
`;

const MessaUploadStyledSuccess = styled.div<{ open: boolean }>`
  transition: all 0.5s ease-in-out;
  opacity: ${(props) => (props.open ? 1 : 0)};
  font-size: 12px;
  color: green;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  margin-top: 0px;
  right: 40px;
  bottom: 60px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  width: 220px;
  height: 46px;
  border-bottom: 2px solid green;
  animation-name: description;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  position: relative;
  @keyframes description {
    from {
      right: 30px;
    }
    to {
      right: 0px;
    }
  }
`;
