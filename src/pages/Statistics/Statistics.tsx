import { AdminLayout } from '../../layouts';
import { Filters } from './components';

// import styles from './Statistics.module.scss';

function StatisticsPage() {
  return (
    <AdminLayout title="Статистика">
      <Filters />
    </AdminLayout>
  );
}

export default StatisticsPage;
