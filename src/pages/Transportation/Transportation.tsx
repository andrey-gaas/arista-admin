import { useState, useCallback } from 'react';

import { AdminLayout } from '../../layouts';
import { Filters, List, Create } from './components';

function TransportationPage() {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);

  const closeModal = useCallback(() => {
    setOpenCreateModal(false);
  }, []);

  const openModal = useCallback(() => {
    setOpenCreateModal(true);
  }, []);

  return (
    <AdminLayout title="Статистика">
      <Filters openModal={openModal} />
      <List />
      <Create isOpen={isOpenCreateModal} close={closeModal} />
    </AdminLayout>
  );
}

export default TransportationPage;
