import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AdminLayout } from '../../layouts';
import { Filters, List, Client } from './components';
import styles from './Clients.module.scss';

function ClientsPage() {
  const location = useLocation();
  const [currentClient, setCurrentClient] = useState<string | null>(location.state?.id || null);

  return (
    <AdminLayout title="Список клиентов">
      <Filters />
      <div className={styles.grid}>
        <List selectClient={setCurrentClient} />
        {
          currentClient &&
          <Client id={currentClient} />
        }
      </div>
    </AdminLayout>
  );
}

export default ClientsPage;
