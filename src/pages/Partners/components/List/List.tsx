import { memo, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import partnersStore from '../../../../store/partnersStore';

import { Loader, Pagination } from '../../../../components';
import styles from './List.module.scss';

type TListProps = {
  selectPartner: React.Dispatch<React.SetStateAction<string | null>>;
};

function List(props: TListProps) {
  const { selectPartner } = props;
  const partnersCount = 10;

  const [page, setPage] = useState(0);

  useEffect(() => {
    partnersStore.fetchList({ skip: page * partnersCount, limit: partnersCount });
  }, [page]);

  return (
    <div>
      <section className={styles.partners}>
        <h3 className={styles.title}>Список заявок</h3>
        <div>
          {
            partnersStore.loading.list &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
          {
            partnersStore.errors.list &&
            <p className={styles.message}>{partnersStore.errors.list}</p>
          }
          {
            partnersStore.list?.length === 0 &&
            <p className={styles.message}>Список заявок пуст</p>
          }
          {
            partnersStore.list &&
            partnersStore.list.map(partner => (
              <article
                key={partner._id}
                className={`${styles.partner} ${partnersStore.partner?._id === partner._id && styles.active}`}
                onClick={() => selectPartner(partner._id)}
              >
                Заявка №<b>{partner.id}</b>
              </article>
            ))
          }
        </div>
      </section>
      {
        partnersStore.count &&
        <Pagination
          listSize={partnersStore.count}
          page={page}
          setPage={setPage}
          count={partnersCount}
        />
      }
    </div>
  );
}

const ObserverList = observer(List);

export default memo(ObserverList);
