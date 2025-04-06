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
import pvzStore from '../../../../store/pvzStore';

type TOrderProps = {
  id: string;
};

function Order(props: TOrderProps) {
  const { id } = props;
  const order = ordersStore.order;

  const [products, setProducts] = useState<TProduct[]>(order?.products || []);
  const [totalPrice, setTotalPrice] = useState('');
  const [profit, setProfit] = useState<number | null>(null);

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  const fetchOrder = async (id: string) => {
    await ordersStore.fetchOrder(id);
    setTotalPrice(ordersStore.order?.price.toString() || '0');
    setProducts(ordersStore.order?.products || []);
    setProfit(ordersStore.order?.profit || null);
  };

  const setMessage = useCallback(async (value: string) => {
    if (order) {
      const result = await ordersStore.setMessage(value, order._id);

      if (result) {
        alert("Сообщение сохранено!");
      }
    }
  }, [order]);

  const changeStatus = useCallback(async (status: TOrderStatus, _id: string) => {
    if (order) {
      if (status === order.status) {
        return;
      }

      // СТАТУС 'Добавлен'
      if (status === 'added') {
        await pvzStore.fetchRemoveCell(order.address._id, { type: order.market, order: order._id });
        await ordersStore.fetchEditOrder(_id, { status });
      }

      // СТАТУС 'В работе'
      if (status === 'works') {
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

        if (order.status === 'added' || order.status === 'issued' || order.status === 'rejected') {
          await pvzStore.fetchSetCell(order.address._id, { order: order._id, type: order.market });
        }
        await ordersStore.fetchEditOrder(_id, {
          products,
          price: Number(totalPrice),
          profit,
          status,
        });
      }

      // СТАТУС 'Готов к выдаче'
      if (status === 'delivered') {
        if (order.status === 'added') {
          ordersStore.setError("Заказ не может быть доставлен, пока он не будет отправлен", "status");
          return;
        }

        const findedProducts = order.products.find(product => product.status !== 'delivered');

        if (findedProducts) {
          ordersStore.setError("Для перехода в статус 'Доставлено' все товары должны быть доставлены!", "status");
          return;
        }

        await ordersStore.fetchEditOrder(_id, { status });
      }

      // СТАТУС 'Выдан'
      if (status === 'issued') {
        if (order.status !== 'delivered') {
          ordersStore.setError("Заказ не может быть выдан, пока он не будет доставлен", "status");
          return;
        }

        await pvzStore.fetchRemoveCell(order.address._id, { type: order.market, order: order._id });
        await ordersStore.fetchEditOrder(_id, { status });
      }

      // СТАТУС 'Отклонен'
      if (status === 'rejected') {
        await pvzStore.fetchRemoveCell(order.address._id, { type: order.market, order: order._id });
        await ordersStore.fetchEditOrder(_id, { status });
      }
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
                status={order.status}
                orderId={order.address._id}
              />
              <Price
                marketplace={order.market}
                productsCount={products.length}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                profit={profit}
                setProfit={setProfit}
                status={order.status}
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
