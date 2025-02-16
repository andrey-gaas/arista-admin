import { Button } from '../../../../components';
import { TOrderStatus } from '../../../../types/orders';

import styles from './StatusPanel.module.scss';

type TStatusPanelProps = {
  id: string;
  status: TOrderStatus;
}

function StatusPanel(props: TStatusPanelProps) {
  const { id, status } = props;

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${status === 'added' && styles.active}`}>Добавлен</button>
        <button className={`${styles.button} ${status === 'works' && styles.active}`}>В работе</button>
        <button className={`${styles.button} ${status === 'delivered' && styles.active}`}>Готов к выдаче</button>
        <button className={`${styles.button} ${status === 'issued' && styles.active}`}>Выдан</button>
        <button className={`${styles.button} ${status === 'rejected' && styles.active}`}>Отклонен</button>
      </div>
      <Button className={styles['remove-button']} variant="danger">Удалить заказ</Button>
    </section>
  );
}

export default StatusPanel;
