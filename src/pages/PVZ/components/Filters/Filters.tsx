import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import pvzStore from '../../../../store/pvzStore';

import { Input } from '../../../../components';
import styles from './Filters.module.scss';

function Filters() {
  const [search, setSearch] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  }, []);

  useEffect(() => {
    pvzStore.fetchList(search);
  }, [search]);

  return (
    <section className={styles.container}>
      <Input
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Поиск по адресу"
        className={styles.input}
      />
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
