import { observer } from "mobx-react-lite";
import transporationsStore from "../../../../store/transportationsStore";
import { Car, CircleCheckBig } from "lucide-react";

import { Loader } from "../../../../components";
import styles from './List.module.scss';

function List() {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Список перевозок</h3>
      {
        transporationsStore.loading.list &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        transporationsStore.errors.list &&
        <p className={styles.message}>{transporationsStore.errors.list}</p>
      }
      {
        (transporationsStore.list && transporationsStore.list.length === 0) &&
        <p className={styles.message}>Список пуст</p>
      }
      {
        transporationsStore.list &&
        transporationsStore.list.map(item => (
          <article key={item._id} className={styles.transportation}>
            {item.status === 'active' ? <Car color="#eb890e" size={26} /> : <CircleCheckBig color="#42b883" size={26} />}
            <p className={styles['transportation-text']}>
              {item.from !== 'Fulfillment center' && item.from.address}
              {item.to !== 'Fulfillment center' && item.to.address}
              <span>({item.from === 'Fulfillment center' ? "Доставка" : "Возврат"})</span>
            </p>
          </article>
        ))

      }
    </section>
  );
}

const ObserverList = observer(List);

export default ObserverList;
