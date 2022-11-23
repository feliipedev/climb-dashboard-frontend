import styled, { css } from "styled-components/macro";
import { useState, useEffect } from "react";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";

type PaginationProps = {
  isActive?: boolean;
};

type Props = {
  pages: number;
  pg: number;
  setPg: (pg: number) => void;
  lastPage: number;
  total: number;
};

const Pagination = ({
  pages,
  pg,
  setPg,
  lastPage,
  total,
}: Props): JSX.Element => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [skipButton, setSkipButton] = useState<boolean>(true);

  const handlePaginate = (props: string) => {
    if (props === "previous") {
      if (pg >= 1 && pg < total) {
        setPg(pg - 1);
      }
    } else if (props === "next") {
      if (pg < lastPage && pg >= 1) {
        setPg(pg + 1);
      }
    }
  };

  useEffect(() => {
    pg >= 3 ? setShowResults(true) : setShowResults(false);

    if (lastPage !== 0) {
      pg < lastPage - 3 ? setSkipButton(true) : setSkipButton(false);
    }
    if (lastPage < 5) {
      setShowResults(false);
    }
  }, [pg]);

  return (
    <DivFlex>
      <PageList>
        <Paginate onClick={() => handlePaginate("previous")}>
          <img src={ArrowLeft} alt="seta" />
        </Paginate>
        {pg > 3 && <Paginate onClick={() => setPg(1)}>1</Paginate>}
        {Array.from(Array(pages), (item, index) => {
          if (
            index + 1 === pg - 1 ||
            index + 1 === pg ||
            index + 1 === pg + 1 ||
            index + 1 === pg + 2
          ) {
            return (
              <Paginate
                value={index}
                onClick={(e) => setPg(Number(e.currentTarget.value))}
                isActive={index == pg}
                key={index}
              >
                {index + 1}
              </Paginate>
            );
          }
        })}
        {!(pg >= lastPage - 2) && (
          <Paginate isActive={pg === lastPage} onClick={() => setPg(lastPage)}>
            {lastPage}
          </Paginate>
        )}
        {!(pg === lastPage) && (
          <Paginate onClick={() => handlePaginate("next")}>
            <img src={ArrowRight} alt="seta" />
          </Paginate>
        )}
      </PageList>
    </DivFlex>
  );
};

const DivFlex = styled.div`
  display: flex;
`;
const PageList = styled.ul`
  margin: 0;
  padding: 0;
`;

const Paginate = styled.button<PaginationProps>(
  ({ theme, isActive }) => css`
    background: none;
    color: #818181;
    font-size: 16px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 120%;
    border: none;
    cursor: pointer;
    :nth-last-child(n + 2) {
      margin-right: 28px;
    }
    &:hover {
      color: #39c6bb;
    }
    &:focus {
      color: #39c6bb;
    }
  `
);
export default Pagination;
