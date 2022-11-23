import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { Dispatch, SetStateAction, useState } from "react";
registerLocale("pt-br", ptBR);

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Nobembro",
  "Dezembro",
];
const locale = {
  localize: {
    day: (n: any) => days[n],
    month: (n: any) => months[n],
  },
  formatLong: {
    date: () => "mm/dd/yyyy",
  },
};

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Filter = ({ date, setDate }: Props): JSX.Element => {
  return (
    <DatePicker
      selected={date}
      onChange={(newValue: Date) => {
        setDate(newValue);
      }}
      locale={locale as object}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default Filter;
