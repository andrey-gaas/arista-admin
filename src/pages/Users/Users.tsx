import { useState, useMemo, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/usersStore';

import { AdminLayout } from '../../layouts';
import { Filters, List, User } from './components';
import { TUsersListQuery } from '../../types/users';
import styles from './Users.module.scss';

type TOption = {
  value: string;
  label: string;
};

function UsersPage() {
  const roles: TOption[] = useMemo(() => [
    { value: 'all', label: 'Все' },
    { value: 'admin', label: 'Администраторы' },
    { value: 'partner', label: 'Партнеры' },
    { value: 'manager', label: 'Менеджеры' },
  ], []);
  const listItemsCount = useMemo(() => 6, []);

  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [role, setRole] = useState(roles[0]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);

  const fetchList = useCallback(async () => {
    const query = {
      ...(role.value === 'all' ? {} : { role: role.value }),
      ...(name && { name }),
      skip: listItemsCount * page,
      limit: listItemsCount,
    } as TUsersListQuery;

    await usersStore.fetchList(query);
  }, [role, listItemsCount, page, name]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <AdminLayout title="Список пользователей">
      <Filters
        roles={roles}
        role={role}
        setRole={setRole}
        name={name}
        setName={setName}
      />
      <div className={styles.grid}>
        <List
          page={page}
          setPage={setPage}
          listItemsCount={listItemsCount}
          selectUser={setCurrentUser}
        />
        {
          currentUser &&
          <User id={currentUser} updateList={fetchList} />
        }
      </div>
    </AdminLayout>
  );
}

const ObserverUsers = observer(UsersPage);

export default ObserverUsers;
