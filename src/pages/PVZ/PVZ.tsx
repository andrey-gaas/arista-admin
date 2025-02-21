import { AdminLayout } from '../../layouts';
import { Filters } from './components';

function PVZPage() {
  return (
    <AdminLayout title="Пункты выдачи заказов">
      <Filters />
    </AdminLayout>
  );
}

export default PVZPage;
