import { useState } from 'react';

import { AdminLayout } from '../../layouts';
import { List, Filters, Order } from './components';
import styles from './Orders.module.scss';

function OrdersPage() {
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);

  return (
    <AdminLayout title="Список заказов">
      <Filters />
      <section className={styles.grid}>
        <List selectOrder={setCurrentOrder} />
        {
          currentOrder &&
          <Order id={currentOrder} />
        }
      </section>
    </AdminLayout>
  );
}

export default OrdersPage;
