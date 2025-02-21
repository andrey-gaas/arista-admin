import { AdminLayout } from '../../layouts';
import { Filters } from './components';

function ClientsPage() {
  return (
    <AdminLayout title="Список клиентов">
      <Filters />
    </AdminLayout>
  );
}

export default ClientsPage;
