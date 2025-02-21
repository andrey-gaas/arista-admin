import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clientsStore from '../../../../store/clientsStore';

import { Loader, Pagination } from '../../../../components';
import styles from './List.module.scss';

type TListProps = {
  selectClient: React.Dispatch<React.SetStateAction<string | null>>;
};

function List(props: TListProps) {
  const { selectClient } = props;

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (clientsStore.loading.list) {
      setPage(0);
    }
  }, [clientsStore.loading.list])

  return (
    <div>
      <section className={styles.clients}>
        <h3 className={styles.title}>Список клиентов</h3>
        <div>
          {
            clientsStore.loading.list &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
          {
            clientsStore.errors.list &&
            <p className={styles.message}>{clientsStore.errors.list}</p>
          }
          {
            clientsStore.clients?.length === 0 &&
            <p className={styles.message}>Список заказов пуст</p>
          }
          {
            clientsStore.clients &&
            clientsStore.clients.slice(page * 6, page * 6 + 6).map(client => (
              <article
                key={client._id}
                className={`${styles.client} ${clientsStore.client && (clientsStore.client._id === client._id && styles.active)}`}
                onClick={() => selectClient(client._id)}
              >
                <p className={styles['client-text']}>ФИО: <b>{client.name}</b></p>
                <p className={styles['client-text']}>Код: <b>{client.code}</b></p>
                <p className={styles['client-text']}>Телефон: <b>{client.phone}</b></p>
              </article>
            ))
          }
        </div>
      </section>
      {
        clientsStore.clients &&
        <Pagination
          listSize={clientsStore.clients.length}
          page={page}
          setPage={setPage}
          count={6}
        />
      }
    </div>
  );
}

const ObserverList = observer(List);

export default ObserverList;
