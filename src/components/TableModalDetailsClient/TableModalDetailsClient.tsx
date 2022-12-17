import styled from "styled-components";
import { FlexContainer, Loan } from "../../pages/SideDish/SideDish";
import Select from "../Select/Select";
import EyeModal from "../../assets/icons/eye-modal.svg";
import { useRef, useState } from "react";
import UploadIcon from "../../assets/icons/upload.svg";
import ModalHandleImage from "../Modals/ModalHandleImage/ModalHandleImage";
import { toast } from "react-toastify";

interface Props {
  body: Loan;
  index: number;
  setBodyTable: any;
}

interface Upload {
  name: string;
  image: string;
}

const TableModalDetailClient = ({
  body,
  index,
  setBodyTable,
}: Props): JSX.Element => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [upload, setUpload] = useState<Upload[]>([]);
  const [openMessageUpload, setOpenMessageUpload] = useState<number>();
  const [image, setImage] = useState<string>("");
  const [modalImage, setModalImage] = useState<boolean>(false);

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

  return (
    <>
      <ModalHandleImage
        image={image}
        isOpen={modalImage}
        onClose={() => setModalImage(false)}
      />
      <tr key={index}>
        <td>{body.date} </td>
        <td>{body.quantity}</td>
        <td>
          <CollumnContainer>
            <FlexContainer>
              <Comprovant>{body.comprovante} </Comprovant>
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
                onChange={(e) => handleFileChange(e)}
                style={{ display: "none" }}
              />
              <UploadImg
                src={UploadIcon}
                alt="upload"
                onClick={() => handleClick()}
              />
            </FlexContainer>
            <MessaUploadStyled open={openMessageUpload === index}>
              Faça o upload de algum comprovante para visualizar.
            </MessaUploadStyled>
          </CollumnContainer>
        </td>
        <td>
          <Select loan={body} setLoans={setBodyTable} i={index} />
        </td>
      </tr>
    </>
  );
};

export default TableModalDetailClient;

const UploadImg = styled.img`
  object-fit: contain;
  width: 13px;
  margin-bottom: -1px;
  cursor: pointer;
  margin-left: 4px;
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

const CollumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comprovant = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #151f1e;
  margin-right: 8px;
`;
