import { useEffect, memo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import clientsStore from '../../../../store/clientsStore';

import { Button, Loader } from '../../../../components';
import styles from './Client.module.scss';

type TClientProps = {
  id: string;
};

function Client(props: TClientProps) {
  const { id } = props;

  const client = clientsStore.client;

  useEffect(() => {
    clientsStore.fetchClient(id);
  }, [id]);

  const block = useCallback(() => {
    clientsStore.fetchEditClient(id, { isBlocked: client?.isBlocked ? false : true });
  }, [id, client]);

  return (
    <section className={styles.container}>
      {
        clientsStore.loading.client &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        clientsStore.errors.client &&
        <p className={styles.message}>{clientsStore.errors.client}</p>
      }
      {
        client &&
        <div className={styles.client}>
          <header className={styles.header}>
            Данные клиента
          </header>
          <div className={styles['client-info']}>
            <p className={styles.info}>
              ФИО: <b>{client.name}</b>
            </p>
            <p className={styles.info}>
              Телефон: <b>{client.phone}</b>
            </p>
            <p className={styles.info}>
              Пароль: <b>{client.password}</b>
            </p>
            <div className={styles['block-button']}>
              {clientsStore.loading.edit && <Loader />}
              <Button onClick={block} disabled={clientsStore.loading.edit}>
                {
                  client.isBlocked ?
                    "Разблокировать" :
                    "Заблокировать"
                }
              </Button>
            </div>
          </div>
        </div>
      }
    </section>
  );
}

const ObserverClient = observer(Client);

export default memo(ObserverClient);
