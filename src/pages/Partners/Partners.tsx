import { useState } from 'react';

import { AdminLayout } from '../../layouts';
import { List } from './components';
import styles from './Partners.module.scss';

function PartnersPage() {
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  return (
    <AdminLayout title="Заявки партнеров">
      <div className={styles.grid}>
        <List selectPartner={setCurrentPartner} />
      </div>
    </AdminLayout>
  );
}

export default PartnersPage;
