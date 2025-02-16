import { useEffect, memo } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import { Loader } from '../../../../components';
import styles from './Order.module.scss';

type TOrderProps = {
  id: string;
};

function Order(props: TOrderProps) {
  const { id } = props;

  const order = ordersStore.order;

  useEffect(() => {
    ordersStore.fetchOrder(id);
  }, [id]);

  return (
    <section className={styles.container}>
      {
        ordersStore.loading.order &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        ordersStore.errors.order &&
        <p className={styles.message}>{ordersStore.errors.order}</p>
      }
      {
        order &&
        <div className={styles.order}>
          <header className={styles.header}>
            Данные заказа №{order.id}
          </header>
          <section className={styles['order-info']}>
            <h6 className={styles['order-info-title']}>Информация о заказе:</h6>
            <p className={styles['order-info-data']}>ID заказа: <b>{order.id}</b></p>
            <p className={styles['order-info-data']}>Клиент: <b>{order.user.phone}</b></p>
            <p className={styles['order-info-data']}>Код клиента: <b>{order.user.code}</b></p>
          </section>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
