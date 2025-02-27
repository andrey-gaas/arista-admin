import { useState, useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import transporationsStore from '../../store/transportationsStore';

import { AdminLayout } from '../../layouts';
import { Filters, List, Create } from './components';

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

  const [status, setStatus] = useState(statuses[0]);
  const [type, setType] = useState(types[0]);

  const toggleModal = useCallback(() => {
    setOpenCreateModal(value => !value);
  }, []);

  const fetchList = useCallback(async () => {
    const query = {
      ...(status.value !== 'all' && { status: status.value }),
      ...(type.value !== 'all' && { type: type.value }),
    };

    await transporationsStore.fetchList(query);
  }, [status, type]);

  useEffect(() => {
    fetchList();
  }, [status, type, fetchList]);

  return (
    <AdminLayout title="Статистика">
      <Filters
        openModal={toggleModal}
        status={status}
        setStatus={setStatus}
        statuses={statuses}
        type={type}
        setType={setType}
        types={types}
      />
      <List />
      <Create
        isOpen={isOpenCreateModal}
        close={toggleModal}
        updateList={fetchList}
      />
    </AdminLayout>
  );
}

const ObserverTransportationPage = observer(TransportationPage);

export default ObserverTransportationPage;
