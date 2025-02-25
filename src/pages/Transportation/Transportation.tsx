import { AdminLayout } from '../../layouts';
import { Filters } from './components';

function TransportationPage() {
  return (
    <AdminLayout title="Статистика">
      <Filters />
    </AdminLayout>
  );
}

export default TransportationPage;
