import styled from "styled-components";
import React, { SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

const ModalFilter = ({ isOpen, onClose }: Props): JSX.Element => {
  return (
    <ScreenContainer isVisible={isOpen}>
      <Container>
        <ContainerForm>Teste Modal</ContainerForm>
      </Container>
    </ScreenContainer>
  );
};

export default ModalFilter;

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
  padding: 0px 32px 0px 32px;
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
  max-width: 730px;
  padding-top: 50px;
  padding-bottom: 30px;
  background-color: #fff;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  border-radius: 6px;
`;
