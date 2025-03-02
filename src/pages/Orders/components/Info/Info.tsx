import { useState, memo } from "react";
import { Link } from "react-router-dom";

import { Icon } from '../../../../components';
import styles from './Info.module.scss';
import { TOrder } from "../../../../types/orders";

type TInfoProps = {
  order: TOrder;
};

const apiUrl = import.meta.env.VITE_API_URL;

function Info(props: TInfoProps) {
  const { order } = props;

  const [photo, setPhoto] = useState<string | null>(null);

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
  };

  return (
    <>
      <div className={styles.grid}>
        <section className={styles['order-info']}>
          <h6 className={styles['order-info-title']}>Информация о заказе:</h6>
          <p className={styles['order-info-data']}>Адрес ПВЗ Ариста: <b>{order.address.address}</b></p>
          <p className={styles['order-info-data']}>Дата создания: <b>{getDate(order.date)}</b></p>
          <p className={styles['order-info-data']}>Торговая площадка: <b>{order.market === 'ozon' ? "OZON" : "Wildberries"}</b></p>
          {order.cell !== undefined && <p className={styles['order-info-data']}>Номер ячейки: <b>{order.cell + 1}</b></p>}
          <h6 className={styles['order-info-title']}>Информация о клиенте:</h6>
          <p className={styles['order-info-data']}>Клиент: <b>{order.user.phone}</b></p>
          <p className={styles['order-info-data']}>Код клиента: <b>{order.user.code}</b></p>
          <Link to="/clients" className={styles['link-profile']} state={{ id: order.user._id }}>Открыть профиль</Link>
        </section>
        <section className={styles['screenshot-container']}>
          <h6 className={styles['order-info-title']}>Скриншот заказа:</h6>
          <img src={`${apiUrl}/admin${order.img}`} alt="" />
          <button onClick={() => setPhoto(order.img)}>
            <Icon type="increase" />
          </button>
        </section>
      </div>
      {
        photo &&
        <div className={styles['screenshot-overlay']} onClick={() => setPhoto(null)}>
          <img className={styles.photo} src={`${apiUrl}/admin${photo}`} alt="" />
          <button onClick={() => setPhoto(null)}>
            <Icon type="decrease" />
          </button>
        </div>
      }
    </>
  );
}

export default memo(Info);
