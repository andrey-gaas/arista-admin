import { useEffect, memo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import Info from '../Info/Info';
import StatusPanel from '../StatusPanel/StatusPanel';
import Products from '../Products/Products';
import { Loader } from '../../../../components';
import styles from './Order.module.scss';
import { TProduct } from '../../../../types/orders';

type TOrderProps = {
  id: string;
};

function Order(props: TOrderProps) {
  const { id } = props;

  const [products, setProducts] = useState<TProduct[]>([
    { code: '123456', title: 'Товар 1' },
    { code: '234567', title: 'Товар 2' },
    { code: '345678', title: 'Товар 3' },
  ]);

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
            <StatusPanel id={order._id} status={order.status} />
            <Info order={order} />
            <Products
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
