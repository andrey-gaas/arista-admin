import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AdminLayout } from '../../layouts';
import { Filters, List } from './components';
import styles from './Clients.module.scss';

function ClientsPage() {
  const [searchParams] = useSearchParams();

  const [currentClient, setCurrentClient] = useState<string | null>(searchParams.get('client') || null);

  return (
    <AdminLayout title="Список клиентов">
      <Filters />
      <div className={styles.grid}>
        <List selectClient={currentClient} />
      </div>
    </AdminLayout>
  );
}

export default ClientsPage;
