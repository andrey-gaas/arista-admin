import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';
import { Button, Loader } from '../../../../components';
import { TOrderStatus } from '../../../../types/orders';

import styles from './StatusPanel.module.scss';

type TStatusPanelProps = {
  id: string;
  status: TOrderStatus;
  changeStatus: (status: TOrderStatus, _id: string) => void;
}

function StatusPanel(props: TStatusPanelProps) {
  const { id, status, changeStatus } = props;

  const removeOrder = async (_id: string) => {
    const result = confirm("Вы действительно хотите удалить заказ?");

    if (result) {
      await ordersStore.removeOrder(_id);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.status}>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${status === 'added' && styles.active}`}
            onClick={() => changeStatus('added', id)}
            disabled={ordersStore.loading.status}
          >
            Добавлен
          </button>
          <button
            className={`${styles.button} ${status === 'works' && styles.active}`}
            onClick={() => changeStatus('works', id)}
            disabled={ordersStore.loading.status}
          >
            В работе
          </button>
          <button
            className={`${styles.button} ${status === 'delivered' && styles.active}`}
            onClick={() => changeStatus('delivered', id)}
            disabled={ordersStore.loading.status}
          >
            Готов к выдаче
          </button>
          <button
            className={`${styles.button} ${status === 'issued' && styles.active}`}
            onClick={() => changeStatus('issued', id)}
            disabled={ordersStore.loading.status}
          >
            Выдан
          </button>
          <button
            className={`${styles.button} ${status === 'rejected' && styles.active}`}
            onClick={() => changeStatus('rejected', id)}
            disabled={ordersStore.loading.status}
          >
            Отклонен
          </button>
        </div>
        {
          ordersStore.loading.status &&
          <div className={styles.loader}>
            <Loader />
          </div>
        }
      </div>
      <Button className={styles['remove-button']} variant="danger" onClick={() => removeOrder(id)}>Удалить заказ</Button>
    </section>
  );
}

const ObserverStatusPanel = observer(StatusPanel);

export default ObserverStatusPanel;
