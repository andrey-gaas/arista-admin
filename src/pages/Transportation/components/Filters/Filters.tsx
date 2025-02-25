import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import transporationsStore from '../../../../store/transportationsStore';

import { Dropdown, Button } from "../../../../components";
import styles from './Filters.module.scss';

const statuses = [
  { value: 'active', label: 'Активные' },
  { value: 'delivered', label: 'Доставленные' },
  { value: 'all', label: 'Все' },
];

const types = [
  { value: 'delivery', label: 'Доставка' },
  { value: 'return', label: 'Возврат' },
  { value: 'all', label: 'Все' },
];

function Filters() {
  const [status, setStatus] = useState(statuses[0]);
  const [type, setType] = useState(types[0]);

  useEffect(() => {
    const query = {
      ...(status.value !== 'all' && { status: status.value }),
      ...(type.value !== 'all' && { type: type.value }),
    };

    transporationsStore.fetchList(query);
  }, [status, type]);

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
      <Button className={styles.button}>Создать перевозку</Button>
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
