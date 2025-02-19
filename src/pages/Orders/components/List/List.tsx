import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import { Loader, Pagination } from '../../../../components';
import styles from './List.module.scss';
import { TOrderStatus } from '../../../../types/orders';

type TListProps = {
  selectOrder: (order: string) => void;
}

function List(props: TListProps) {
  const { selectOrder } = props;

  const [page, setPage] = useState(0);

  const getStatus = (status: TOrderStatus): string => {
    switch (status) {
      case 'added': return 'Добавлен';
      case 'works': return 'В работе';
      case 'delivered': return 'Готов к выдаче';
      case 'issued': return 'Выдан';
      case 'rejected': return 'Отклонен';
      default: return '';
    }
  };

  const getOrderColor = (status: TOrderStatus): string => {
    switch (status) {
      case 'added': return styles.added;
      case 'works': return styles.works;
      case 'delivered': return styles.delivered;
      case 'issued': return styles.issued;
      case 'rejected': return styles.rejected;
      default: return '';
    }
  }

  return (
    <div>
      <section className={styles.orders}>
        <h3 className={styles.title}>Список заказов</h3>
        <div className={styles.list}>
          {
            ordersStore.loading.list &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
          {
            ordersStore.errors.list &&
            <p className={styles.message}>{ordersStore.errors.list}</p>
          }
          {
            ordersStore.orders?.length === 0 &&
            <p className={styles.message}>Список заказов пуст</p>
          }
          {
            ordersStore.orders &&
            ordersStore.orders.slice(page * 10, page * 10 + 10).map(order => (
              <article
                key={order.id}
                className={`${styles.order} ${ordersStore.order && (ordersStore.order._id === order._id && styles.active)}`}
                onClick={() => selectOrder(order._id)}
              >
                <div className={styles['top-container']}>
                  <h1 className={styles['order-title']}>Заказ №{order.id}</h1>
                  <span className={`${styles.status} ${getOrderColor(order.status)}`}>{getStatus(order.status)}</span>
                </div>
                <p className={styles['order-text']}>
                  Клиент: {order.user.phone}
                  <span>#{order.user.code}</span>
                </p>
              </article>
            ))
          }
        </div>
      </section>
      {
        ordersStore.orders &&
        <Pagination
          listSize={ordersStore.orders.length}
          page={page}
          setPage={setPage}
        />
      }
    </div>
  );
}

const ObserverList = observer(List);

export default ObserverList;
