import { useEffect, memo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import Info from '../Info/Info';
import StatusPanel from '../StatusPanel/StatusPanel';
import Products from '../Products/Products';
import Price from '../Price/Price';
import { Loader } from '../../../../components';
import styles from './Order.module.scss';
import { TProduct } from '../../../../types/orders';

type TOrderProps = {
  id: string;
};

function Order(props: TOrderProps) {
  const { id } = props;

  const [products, setProducts] = useState<TProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [profit, setProfit] = useState<number | null>(null);

  const order = ordersStore.order;

  useEffect(() => {
    ordersStore.fetchOrder(id);

    setTotalPrice('');
    setProducts([]);
    setProfit(null);
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
          <div>
            <StatusPanel id={order._id} status={order.status} />
            <Info order={order} />
            <div className={styles['products-and-price']}>
              <Products
                products={products}
                setProducts={setProducts}
              />
              <Price
                marketplace={order.market}
                productsCount={products.length}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                profit={profit}
                setProfit={setProfit}
              />
            </div>
          </div>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
