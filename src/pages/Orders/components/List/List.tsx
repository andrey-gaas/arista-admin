import { Loader } from '../../../../components';
import styles from './List.module.scss';

function List() {
  return (
    <section className={styles.orders}>
      <h3 className={styles.title}>Список заказов</h3>
      <div className={styles.list}>
        <Loader />
      </div>
    </section>
  );
}

export default List;
