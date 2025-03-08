import { AdminLayout } from '../../layouts';
import { Filters, Statistics } from './components';

// import styles from './Statistics.module.scss';

function StatisticsPage() {
  return (
    <AdminLayout title="Статистика">
      <Filters />
      <Statistics />
    </AdminLayout>
  );
}

export default StatisticsPage;
