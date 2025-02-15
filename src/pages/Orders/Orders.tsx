import { ChangeEvent, useCallback, useState, useMemo } from 'react';

import { AdminLayout } from '../../layouts';
import { Dropdown, Input } from '../../components';
import { List } from './components';

import styles from './Orders.module.scss';

const searchTypes = [
  { value: 'status', label: 'статусу' }, // Статусы заказов
  { value: 'client', label: "QR-коду клиента" }, // QR-code клиента
  { value: 'shtrih', label: "штрих-коду" }, // Штрих-код товара, показывает заказ где этот товар лежит
  { value: 'phone', label: 'номеру телефона' }, // Поиск заказов по номеру телефона
];

function OrdersPage() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState(searchTypes[0]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const searchPlaceholder = useMemo(() => {
    switch (searchType.value) {
      case 'status': return 'Поиск по статусу';
      case 'client': return 'Поиск по QR-коду клиента';
      case 'shtrih': return 'Поиск по товару';
      case 'phone': return 'Поиск по номеру телефона';
    }
  }, [searchType]);

  return (
    <AdminLayout title="Список заказов">
      <section className={styles['filters-container']}>
        <Dropdown
          options={searchTypes}
          onSelect={setSearchType}
          placeholder='Выберите что нибудь'
          title="Заказы по:"
          defaultValue={searchType}
        />
        <Input
          type="search"
          value={search}
          onChange={handleSearch}
          className={styles.input}
          placeholder={searchPlaceholder}
        />
      </section>
      <section className={styles.grid}>
        <List />
      </section>
    </AdminLayout>
  );
}

export default OrdersPage;
