import { AdminLayout } from '../../layouts';
import { Filters, List } from './components';

function TransportationPage() {
  return (
    <AdminLayout title="Статистика">
      <Filters />
      <List />
    </AdminLayout>
  );
}

export default TransportationPage;
