import { useState, useEffect } from 'react';

import { AdminLayout } from '../../layouts';
import { List, Filters } from './components';
import styles from './Orders.module.scss';

function OrdersPage() {
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);

  useEffect(() => {
    if (currentOrder) {
      console.log(currentOrder);
    }
  }, [currentOrder]);

  return (
    <AdminLayout title="Список заказов">
      <Filters />
      <section className={styles.grid}>
        <List selectOrder={setCurrentOrder} />
      </section>
    </AdminLayout>
  );
}

export default OrdersPage;
