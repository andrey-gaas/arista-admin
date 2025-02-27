import { memo } from 'react';

import { Dropdown, Button } from "../../../../components";
import styles from './Filters.module.scss';


type TOption = {
  value: string;
  label: string;
};

type TFiltersProps = {
  openModal: () => void;
  status: TOption;
  setStatus: React.Dispatch<React.SetStateAction<TOption>>;
  statuses: TOption[];
  type: TOption;
  setType: React.Dispatch<React.SetStateAction<TOption>>;
  types: TOption[];
};

function Filters(props: TFiltersProps) {
  const {
    openModal,
    status, setStatus, statuses,
    type, setType, types,
  } = props;

  return (
    <section className={styles.container}>
      <div className={styles.dropdown}>
        <Dropdown
          options={statuses}
          onSelect={setStatus}
          title="Статус"
          defaultValue={status}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          options={types}
          onSelect={setType}
          title="Тип перевозки"
          defaultValue={type}
        />
      </div>
      <Button className={styles.button} onClick={openModal}>Создать перевозку</Button>
    </section>
  );
}

export default memo(Filters);
