import { useEffect, useState, memo } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import { Loader, Icon } from '../../../../components';
import styles from './Order.module.scss';

type TOrderProps = {
  id: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

function Order(props: TOrderProps) {
  const { id } = props;

  const [photo, setPhoto] = useState<string | null>(null);

  const order = ordersStore.order;

  console.log(order);

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate() < 10 ? `0${date.getDate()}}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
  };


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
            <div>
              <section className={styles['order-info']}>
                <h6 className={styles['order-info-title']}>Информация о заказе:</h6>
                <p className={styles['order-info-data']}>Адрес ПВЗ Ариста: <b>{order.address.address}</b></p>
                <p className={styles['order-info-data']}>Дата создания: <b>{getDate(order.date)}</b></p>
                <p className={styles['order-info-data']}>Клиент: <b>{order.user.phone}</b></p>
                <p className={styles['order-info-data']}>Код клиента: <b>{order.user.code}</b></p>
              </section>
              <section className={styles['screenshot-container']}>
                <h6 className={styles['order-info-title']}>Скриншот заказа:</h6>
                <img src={`${apiUrl}/admin${order.img}`} alt="" />
                <button onClick={() => setPhoto(order.img)}>
                  <Icon type="increase" />
                </button>
              </section>
            </div>
          </div>
        </div>
      }
      {
        photo &&
        <div className={styles['screenshot-overlay']} onClick={() => setPhoto(null)}>
          <img className={styles.photo} src={`${apiUrl}/admin${photo}`} alt="" />
          <button onClick={() => setPhoto(null)}>
            <Icon type="decrease" />
          </button>
        </div>
      }
    </section>
  );
}

const ObserverOrder = observer(Order);

export default memo(ObserverOrder);
