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
};

function List(props: TListProps) {
  const { page, setPage, listItemsCount } = props;

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
                className={styles.user}
              >
                <span className={styles['user-text']}>{user.name}</span>
                <span className={styles['user-text']}><b>{getRoleName(user.role)}</b></span>
              </article>
            ))
          }
        </div>
      </section>
      {
        usersStore.count &&
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
