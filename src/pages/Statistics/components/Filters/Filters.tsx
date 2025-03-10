import { useState, useMemo, useCallback, ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import statisticsStore from "../../../../store/statisticsStore";
import { Dropdown, Input } from "../../../../components";

import styles from './Filters.module.scss';
import { TStatiscticsListQuery } from "../../../../types/statistics";

type TOption = {
  label: string;
  value: string;
};

function Filters() {
  const markets: TOption[] = useMemo(() => [
    { label: "Все", value: "all" },
    { label: "OZON", value: "ozon" },
    { label: "Wildberries", value: "wb" },
  ], []);

  const getFormattedDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // Получаем дату в формате YYYY-MM-DD
  };

  // Получаем дату 30 дней назад, обнуляем время
  const getStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // Получаем текущую дату с концом дня (23:59:59)
  const getEndDate = () => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };

  const [market, setMarket] = useState<TOption>(markets[0]);
  const [startDate, setStartDate] = useState(getFormattedDate(getStartDate()));
  const [endDate, setEndDate] = useState(getFormattedDate(getEndDate()));

  const setStartDateCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  }, []);

  const setEndDateCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  }, []);

  useEffect(() => {
    const date = new Date(endDate);
    const query = {
      start: +new Date(startDate),
      end: +date.setDate(date.getDate() + 1),
      ...(market.value !== 'all' ? { market: market.value } : {})
    };

    statisticsStore.fetchStatistics(query as TStatiscticsListQuery);
  }, [startDate, endDate, market]);

  return (
    <div className={styles.container}>
      <Input
        value={startDate}
        onChange={setStartDateCallback}
        label="Начало"
        className={styles.input}
        type="date"
      />
      <Input
        value={endDate}
        onChange={setEndDateCallback}
        label="Конец"
        className={styles.input}
        type="date"
      />
      <Dropdown
        options={markets}
        value={market}
        onSelect={setMarket}
        title="Маркет:"
        className={styles.dropdown}
      />
    </div>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
