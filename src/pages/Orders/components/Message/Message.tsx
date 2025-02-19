import { useCallback, useState, memo } from 'react';

import { Button } from '../../../../components';
import styles from './Message.module.scss';

type TMessageProps = {
  message: string;
  setMessage: (value: string) => void;
  loading: boolean;
  error: string;
};

function Message(props: TMessageProps) {
  const { message, setMessage, loading, error } = props;

  const [localMessage, setLocalMessage] = useState(message);

  const handleClick = useCallback(() => {
    setMessage(localMessage);
  }, [localMessage, setMessage]);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Сообщение пользователю</h3>
      <div className={styles.grid}>
        <div className={`${styles['input-container']} ${error && styles.error}`}>
          <label htmlFor="message-input">Сообщение:</label>
          <input
            id="message-input"
            value={localMessage}
            onChange={event => setLocalMessage(event.target.value)}
            placeholder="Введите сообщение пользователю"
          />
        </div>
        <Button variant="success" onClick={handleClick} disabled={loading}>Сохранить</Button>
      </div>
      <p className={styles.description}>
        Чтобы удалить сообщение, удалите текст и нажмите сохранить
      </p>
      {
        error &&
        <p className={styles['error-message']}>Ошибка сохранения сообщения пользователю</p>
      }
    </section>
  );
}

export default memo(Message);
