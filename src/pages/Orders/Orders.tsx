import { AdminLayout } from '../../layouts';
import { List, Filters } from './components';

import styles from './Orders.module.scss';

function OrdersPage() {
  return (
    <AdminLayout title="Список заказов">
      <Filters />
      <section className={styles.grid}>
        <List />
      </section>
    </AdminLayout>
  );
}

export default OrdersPage;
