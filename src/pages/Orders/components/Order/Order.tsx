import { useEffect, memo, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import Info from '../Info/Info';
import StatusPanel from '../StatusPanel/StatusPanel';
import Products from '../Products/Products';
import Price from '../Price/Price';
import Message from '../Message/Message';
import { Loader } from '../../../../components';
import styles from './Order.module.scss';
import { TOrderStatus, TProduct } from '../../../../types/orders';

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

  const setMessage = useCallback(async (value: string) => {
    if (order) {
      const result = await ordersStore.setMessage(value, order._id);

      if (result) {
        alert("Сообщение сохранено!");
      }
    }
  }, [order]);

  const changeStatus = useCallback(async (status: TOrderStatus, _id: string) => {
    if (status === 'added') {
      await ordersStore.changeStatus(_id, status);
    }

    if (status === 'works' && order?.status !== 'added') {
      await ordersStore.changeStatus(_id, status);
    }

    if (status === 'works' && order?.status === 'added') {
      if (products.length === 0) {
        ordersStore.setError("Добавьте товары в заказ", "status");
        return;
      }

      if (totalPrice === '') {
        ordersStore.setError("Укажите общую стоимость заказа", "status");
        return;
      }

      if (profit === null) {
        ordersStore.setError("Укажите корректную стоимость товара", "status");
        return;
      }

      await ordersStore.changeStatus(_id, status);
    }
  }, [order, products, totalPrice, profit]);

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
            <StatusPanel id={order._id} status={order.status} changeStatus={changeStatus} />
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
            <Message
              message={order.message || ""}
              setMessage={setMessage}
              loading={ordersStore.loading.message}
              error={ordersStore.errors.message}
            />
          </div>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
