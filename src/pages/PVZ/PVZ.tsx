import { useState } from 'react';

import { AdminLayout } from '../../layouts';
import { Filters, List } from './components';
import styles from './PVZ.module.scss';

function PVZPage() {
  const [currentClient, setCurrentClient] = useState<string | null>(null);

  return (
    <AdminLayout title="Пункты выдачи заказов">
      <Filters />
      <div className={styles.grid}>
        <List selectPvz={setCurrentClient} />
      </div>
    </AdminLayout>
  );
}

export default PVZPage;
