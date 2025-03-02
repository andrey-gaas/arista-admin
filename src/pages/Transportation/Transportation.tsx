import { useState, useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import transporationsStore from '../../store/transportationsStore';

import { AdminLayout } from '../../layouts';
import { Filters, List, Create, Card } from './components';
import { TTransportation, TTransportationsListQuery } from '../../types/transportations';

type TOption = { value: string, label: string };

function TransportationPage() {
  const statuses: TOption[] = useMemo(() => [
    { value: 'active', label: 'Активные' },
    { value: 'delivered', label: 'Доставленные' },
    { value: 'all', label: 'Все' },
  ], [])

  const types: TOption[] = useMemo(() => [
    { value: 'delivery', label: 'Доставка' },
    { value: 'return', label: 'Возврат' },
    { value: 'all', label: 'Все' },
  ], []);

  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const [infoModal, setInfoModal] = useState<TTransportation | null>(null);

  const [status, setStatus] = useState(statuses[0]);
  const [type, setType] = useState(types[0]);

  const toggleCreateModal = useCallback(() => {
    setOpenCreateModal(value => !value);
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModal(null);
  }, []);

  const openInfoModal = useCallback((transportation: TTransportation) => {
    setInfoModal(transportation);
  }, []);

  const fetchList = useCallback(async () => {
    const query = {
      ...(status.value !== 'all' && { status: status.value }),
      ...(type.value !== 'all' && { type: type.value }),
    } as TTransportationsListQuery;

    await transporationsStore.fetchList(query);
  }, [status, type]);

  useEffect(() => {
    fetchList();
  }, [status, type, fetchList]);

  return (
    <AdminLayout title="Статистика">
      <Filters
        openModal={toggleCreateModal}
        status={status}
        setStatus={setStatus}
        statuses={statuses}
        type={type}
        setType={setType}
        types={types}
      />
      <List open={openInfoModal} />
      <Create
        isOpen={isOpenCreateModal}
        close={toggleCreateModal}
        updateList={fetchList}
      />
      <Card transportation={infoModal} close={closeInfoModal} />
    </AdminLayout>
  );
}

const ObserverTransportationPage = observer(TransportationPage);

export default ObserverTransportationPage;
