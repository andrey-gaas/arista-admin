import { observer } from 'mobx-react-lite';
import statisticsStore from '../../../../store/statisticsStore';

import styles from './Statistics.module.scss';
import { Loader } from '../../../../components';

function Statistics() {
  const orders = statisticsStore.orders;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Статистика</h1>
      {
        statisticsStore.loading &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        statisticsStore.error &&
        <p className={styles.error}>{statisticsStore.error}</p>
      }
      {
        orders &&
        <section className={styles.table}>
          <header className={styles['table-header']}>
            <span>Номер заказа</span>
            <span>ПВЗ</span>
            <span>Дата выдачи</span>
            <span>Стоимость</span>
            <span>Прибыль</span>
          </header>
          <article className={styles.general}>
            <span></span>
            <span></span>
            <span></span>
            <span>{orders.reduce((sum, item) => sum + item.price, 0).toFixed(2)} ₽</span>
            <span>{orders.reduce((sum, item) => sum + item.profit, 0).toFixed(2)} ₽</span>
          </article>
          {
            orders.map(order => (
              <article key={order._id} className={`${styles.row} ${order.market === 'ozon' ? styles['row-ozon'] : styles['row-wb']}`}>
                <span>{order.id}</span>
                <span>{order.address.address}</span>
                <span>{order.dateIssued && new Date(order.dateIssued).toLocaleDateString('ru-RU')}</span>
                <span>{order.price.toFixed(2)}</span>
                <span>{order.profit.toFixed(2)}</span>
              </article>
            ))
          }
        </section>

      }
    </section>
  );
}

const ObserverStatistics = observer(Statistics);

export default ObserverStatistics;
