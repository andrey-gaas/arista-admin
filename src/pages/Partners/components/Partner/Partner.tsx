import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import parnersStore from '../../../../store/partnersStore';

import { Loader } from '../../../../components';
import styles from './Partner.module.scss';

type TPartnerProps = {
  id: string;
};

function Partner(props: TPartnerProps) {
  const { id } = props;

  const partner = parnersStore.partner;

  useEffect(() => {
    parnersStore.fetchPartner(id);
  }, [id]);

  return (
    <section className={styles.container}>
      {
        parnersStore.loading.partner &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        parnersStore.errors.partner &&
        <p className={styles.message}>{parnersStore.errors.partner}</p>
      }
      {
        partner &&
        <div className={styles.partner}>
          <header className={styles.header}>
            Информация о заявке
          </header>
          <div className={styles['partner-info']}>
            <p className={styles.info}>
              ФИО: <b>{partner.name}</b>
            </p>
            <p className={styles.info}>
              Телефон: <b>{partner.phone}</b>
            </p>
            <p className={styles.info}>
              Город: <b>{partner.city}</b>
            </p>
            <p className={styles.info}>
              Автомобиль: <b>{partner.car ? 'Есть' : 'Нет'}</b>
            </p>
            <p className={styles.info}>
              Помещение: <b>{partner.name ? 'Есть' : 'Нет'}</b>
            </p>
          </div>
        </div>
      }
    </section>
  );
}

const ObserverPartner = observer(Partner);

export default ObserverPartner;
