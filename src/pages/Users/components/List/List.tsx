import { memo } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../../store/usersStore';

import { Loader, Pagination } from '../../../../components';
import styles from './List.module.scss';
import { TRole } from '../../../../types/users';

function getRoleName(role: TRole): string {
  switch (role) {
    case 'admin':
      return 'Администратор';
    case 'partner':
      return 'Партнер';
    case 'manager':
      return 'Менеджер';
  }
}

type TListProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  listItemsCount: number;
  selectUser: React.Dispatch<React.SetStateAction<string | null>>;
};

function List(props: TListProps) {
  const { page, setPage, listItemsCount, selectUser } = props;

  return (
    <div>
      <section className={styles.container}>
        <h3 className={styles.title}>Список пользователей</h3>
        <div>
          {
            usersStore.loading.list &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
          {
            usersStore.errors.list &&
            <p className={styles.message}>
              {usersStore.errors.list}
            </p>
          }
          {
            usersStore.count === 0 &&
            <p className={styles.message}>
              Список пользователей пуст
            </p>
          }
          {
            usersStore.list &&
            usersStore.list.map(user => (
              <article
                key={user._id}
                className={`${styles.user} ${usersStore.user?._id === user._id && styles.active}`}
                onClick={() => selectUser(user._id)}
              >
                <span className={styles['user-text']}><b>{user.name}</b></span>
                <span className={styles['user-text']}><i>{getRoleName(user.role)}</i></span>
              </article>
            ))
          }
        </div>
      </section>
      {
        usersStore.count !== null &&
        <Pagination
          listSize={usersStore.count}
          page={page}
          setPage={setPage}
          count={listItemsCount}
        />
      }
    </div>
  );
}

const ObserverList = observer(List);

export default memo(ObserverList);
