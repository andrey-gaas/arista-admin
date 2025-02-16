import { useEffect, memo } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import Info from '../Info/Info';
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
          <div className={styles['order-info-grid']}>
            <Info order={order} />
          </div>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
