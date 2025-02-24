import { useState } from 'react';

import { AdminLayout } from '../../layouts';
import { Filters, List, Pvz } from './components';
import styles from './PVZ.module.scss';

function PVZPage() {
  const [currentPvz, setCurrentPvz] = useState<string | null>(null);

  return (
    <AdminLayout title="Пункты выдачи заказов">
      <Filters setCurrentPvz={setCurrentPvz} />
      <div className={styles.grid}>
        <List selectPvz={setCurrentPvz} />
        {
          currentPvz &&
          <Pvz id={currentPvz} />
        }
      </div>
    </AdminLayout>
  );
}

export default PVZPage;
