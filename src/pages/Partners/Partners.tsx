import { useState } from 'react';

import { AdminLayout } from '../../layouts';
import { List, Partner } from './components';
import styles from './Partners.module.scss';

function PartnersPage() {
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  return (
    <AdminLayout title="Заявки партнеров">
      <div className={styles.grid}>
        <List selectPartner={setCurrentPartner} />
        {currentPartner && <Partner id={currentPartner} />}
      </div>
    </AdminLayout>
  );
}

export default PartnersPage;
