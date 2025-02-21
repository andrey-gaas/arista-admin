import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import clientsStore from '../../../../store/clientsStore';

import { Input } from '../../../../components';
import styles from './Filters.module.scss';
import { TClientsListQuery } from '../../../../types/clients';

function Filters() {
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(filters => ({
      ...filters,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    const query: TClientsListQuery = {
      ...(filters.name && { name: filters.name }),
      ...(filters.phone && { phone: filters.phone })
    };

    clientsStore.fetchList(query);
  }, [filters.name, filters.phone]);

  return (
    <section className={styles.container}>
      <Input
        value={filters.name}
        onChange={handleChange}
        name="name"
        type="search"
        placeholder="Поиск по имени"
        className={styles.input}
      />
      <Input
        value={filters.phone}
        onChange={handleChange}
        name="phone"
        type="search"
        placeholder="Поиск по номеру телефона"
        className={styles.input}
      />
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
