import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: "Lato";
  }
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }
  .react-datepicker__header {
    width: 478px;
    background: #FFFFFF;
    padding: 0;
    padding: 25px 20px 25px 25px;
    border: none;
  }
  .react-datepicker__current-month{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 132%;
    color: #2D2527;
  }
  .react-datepicker__navigation{
    background: #79C6C0;
    border-radius: 23.3922px;
    margin-top: 25px;
    display: flex;
    justify-content: center;
  }
  span{
    border: none !important;
  }
  .react-datepicker__navigation-icon--next::before {
    transform: rotate(45deg);
    left: -14px;
    border-width: 4px 4px 0 0;
    border-color: #fff !important;
    top: 4px;
  }
  .react-datepicker__navigation-icon--previous::before {
    transform: rotate(225deg);
    right: 0px;
    border-width: 4px 4px 0 0;
    border-color: #fff !important;
    top: 4px;
  }
  .react-datepicker__navigation--next {
    right: 18px;
    top: -250px;
  }
  .react-datepicker__navigation--previous {
    left: 18px;
    top: -250px;
  }
  .react-datepicker__day-names{
    border-top: 1.29957px solid #E0E0E0;
    margin: 0 auto;
    max-width: 436px;
    width: 100%;
    padding-top: 27px;
    margin-top: 31px;
   display: flex;
   justify-content: space-between;
  }
  .react-datepicker__day-name{
     font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 143%;
    letter-spacing: 0.018em;
    color: #818181;
  }
  .react-datepicker__month-container{
    margin-top: -250px;
  }
  .react-datepicker__input-container{
    input{width: 152px;
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
      &:focus{
        outline: none;
      }
  }
  }
  .react-datepicker__day{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.0168em;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #000000;
    width: 32px;
    margin-top: 31px;
    margin-right: 17px;
    margin-left: 17px;
  }
  .react-datepicker__day:hover{
    background: rgba(121, 198, 192, 0.5);
    border-radius: 50%;
    opacity: 0.8;
  }
  .react-datepicker{
    border: none;
  }
  .react-datepicker__month-container{
    background: #FFFFFF;
    box-shadow: 0px 8px 16px 2px rgba(97, 97, 97, 0.1), 0px 16px 32px 2px rgba(97, 97, 97, 0.1);
    border-radius: 12px;
    padding-bottom: 12px;
  }
  .react-datepicker__day--keyboard-selected{
    width: 42px;
    height: 42px;
    background: rgba(121, 198, 192, 0.5);
    border: 1.29957px solid rgba(121, 198, 192, 0.5);
    border-radius: 50%;
    padding-top: 8px;
  }
  .react-datepicker__day--selected{
    width: 42px;
    height: 42px;
    background: rgba(121, 198, 192, 0.5);
    border: 1.29957px solid rgba(121, 198, 192, 0.5);
    border-radius: 50%;
    padding-top: 8px;
  }
  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 26px;
  }
  .MuiFormGroup-root{
    flex-direction: row !important;
  }
  .MuiFormGroup-root :hover{
   background: none;
  }
  .MuiSvgIcon-root {
    fill : #6EAEA9 !important;
    width: 16px;
  }
  .MuiSvgIcon-root:hover {
    fill : #6EAEA9 !important;
    background: none;
  }
  .fkCLRm p {
    margin-left: 24px;
  }
  .iocJID p {
    margin-left: 24px;
  }
  .kJCoWD p {
    margin-left: 24px !important;
  }
`;
