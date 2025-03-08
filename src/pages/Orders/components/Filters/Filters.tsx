import { useState, useCallback, ChangeEvent, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';
import authStore from '../../../../store/authStore';
import { TOrderStatus } from '../../../../types/orders';

import { Dropdown, Input } from '../../../../components';
import styles from './Filters.module.scss';

const searchTypes = [
  { value: 'status', label: 'статусу' }, // Статусы заказов
  { value: 'client', label: "QR-коду клиента" }, // QR-code клиента
  { value: 'barcode', label: "штрих-коду" }, // Штрих-код товара, показывает заказ где этот товар лежит
  { value: 'phone', label: 'номеру телефона' }, // Поиск заказов по номеру телефона
];

const statuses: TOrderStatus[] = ["added", "works", "delivered", "issued", "rejected", "all"];

function Filters() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [status, setStatus] = useState<TOrderStatus>(statuses[0]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const searchPlaceholder = useMemo(() => {
    switch (searchType.value) {
      case 'status': return 'Поиск по статусу';
      case 'client': return 'Поиск по QR-коду клиента';
      case 'barcode': return 'Поиск по товару';
      case 'phone': return 'Поиск по номеру телефона';
    }
  }, [searchType]);

  useEffect(() => {
    const pvz = authStore.user?.pvz;

    if (searchType.value === 'status') {
      const query = {
        ...(status === 'all' ? {} : { status }),
        ...(pvz ? { pvz } : {}),
      };
      ordersStore.fetchOrdersByStatus(query);
    }

    if (searchType.value === 'client') {
      const query = {
        ...(pvz ? { pvz } : {}),
      };
      ordersStore.fetchOrdersByQRCode(query, search);
    }

    if (searchType.value === 'barcode') {
      const query = {
        ...(pvz ? { pvz } : {}),
      };
      ordersStore.fetchOrdersByBarcode(query, search);
    }

    if (searchType.value === 'phone') {
      const query = {
        phone: search,
        ...(pvz ? { pvz } : {}),
      };
      ordersStore.fetchOrdersByPhone(query);
    }
  }, [status, searchType, search]);

  return (
    <section className={styles['filters-container']}>
      <Dropdown
        options={searchTypes}
        onSelect={setSearchType}
        placeholder='Выберите что нибудь'
        title="Заказы по:"
        value={searchType}
      />
      {
        searchType.value !== 'status' &&
        <Input
          type="search"
          value={search}
          onChange={handleSearch}
          className={styles.input}
          placeholder={searchPlaceholder}
        />
      }
      {
        searchType.value === 'status' &&
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${status === statuses[0] && styles.active}`}
            onClick={() => setStatus(statuses[0])}
          >
            Добавлен
          </button>
          <button
            className={`${styles.button} ${status === statuses[1] && styles.active}`}
            onClick={() => setStatus(statuses[1])}
          >
            В работе
          </button>
          <button
            className={`${styles.button} ${status === statuses[2] && styles.active}`}
            onClick={() => setStatus(statuses[2])}
          >
            Готов к выдаче
          </button>
          <button
            className={`${styles.button} ${status === statuses[3] && styles.active}`}
            onClick={() => setStatus(statuses[3])}
          >
            Выдан
          </button>
          <button
            className={`${styles.button} ${status === statuses[4] && styles.active}`}
            onClick={() => setStatus(statuses[4])}
          >
            Отклонен
          </button>
          <button
            className={`${styles.button} ${status === statuses[5] && styles.active}`}
            onClick={() => setStatus(statuses[5])}
          >
            Все
          </button>
        </div>
      }
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
