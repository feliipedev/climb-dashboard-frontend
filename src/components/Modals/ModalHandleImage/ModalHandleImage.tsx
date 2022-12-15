import React from "react";
import styled from "styled-components";
/* import Icon from 'components/Icon' */
import ClosePhoto from "../../../assets/icons/close-filter.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: string;
};

const ModalHandleImage: React.FC<Props> = ({
  isOpen,
  onClose,
  image,
}: Props) => {
  return (
    <ScreenContainer isVisible={isOpen}>
      <Image src={image}>
        <ButtonRemoveImage onClick={() => onClose()}>
          <Img src={ClosePhoto} />
        </ButtonRemoveImage>
      </Image>
    </ScreenContainer>
  );
};
export default ModalHandleImage;

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
  flex-direction: column;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
  z-index: 999;
`;

const Image = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 400px;
  border-radius: 6px;
  margin: 10px;
  animation-name: fade;
  animation-duration: 1s;
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ButtonRemoveImage = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: none;
  position: absolute;
  top: -25px;
  right: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 24px;
  object-fit: contain;
  margin-left: 8px;
  cursor: pointer;
`;
