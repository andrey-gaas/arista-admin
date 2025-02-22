import { useEffect, useState, memo } from 'react';
import { observer } from 'mobx-react-lite';
import pvzStore from '../../../../store/pvzStore';

import { Loader, Pagination } from '../../../../components';
import styles from './List.module.scss';

type TListProps = {
  selectPvz: React.Dispatch<React.SetStateAction<string | null>>;
};

function List(props: TListProps) {
  const { selectPvz } = props;

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (pvzStore.loading.list) {
      setPage(0);
    }
  }, [pvzStore.loading.list]);

  return (
    <div>
      <section className={styles.container}>
        <h3 className={styles.title}>Список ПВЗ</h3>
        <div>
          {
            pvzStore.loading.list &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
          {
            pvzStore.errors.list &&
            <p className={styles.message}>{pvzStore.errors.list}</p>
          }
          {
            pvzStore.list?.length === 0 &&
            <p className={styles.message}>Список пуст</p>
          }
          {
            pvzStore.list &&
            pvzStore.list.slice(page * 10, page * 10 + 10).map(pvz => (
              <article
                key={pvz._id}
                className={`${styles['list-item']}`}
                onClick={() => selectPvz(pvz._id)}
              >
                <p className={styles.text}><b>{pvz.address}</b></p>
              </article>
            ))
          }
        </div>
      </section>
      {
        pvzStore.list &&
        <Pagination
          listSize={pvzStore.list.length}
          page={page}
          setPage={setPage}
          count={10}
        />
      }
    </div>
  );
}

const ObserverList = observer(List);

export default memo(ObserverList);
