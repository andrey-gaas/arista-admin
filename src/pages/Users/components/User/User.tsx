import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { observer } from 'mobx-react-lite';
import valudator from 'validator';
import usersStore from '../../../../store/usersStore';

import { Loader, Input, Dropdown, Button } from '../../../../components';
import styles from './User.module.scss';

type TOption = {
  value: string;
  label: string;
};

type TUserProps = {
  id: string;
};

function User(props: TUserProps) {
  const { id } = props;
  const roles = useMemo(() => [
    { value: 'manager', label: 'Менеджер' },
    { value: 'partner', label: 'Партнер' },
    { value: 'admin', label: 'Администратор' },
  ], []);

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [role, setRole] = useState<TOption | null>(null);
  const [loading, setLoading] = useState(false);

  const user = usersStore.user;

  useEffect(() => {
    usersStore.fetchUser(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setState({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      const userRole = (roles.find(role => role.value === user.role)) || roles[0];
      setRole(userRole);

      setErrors({
        name: '',
        email: '',
        password: '',
      });
    }
  }, [user, roles]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setState(state => ({
      ...state,
      [name]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    const errors = {
      name: '',
      email: '',
      password: '',
    };
    if (!state.name) {
      errors.name = "Введите имя пользователя";
    }
    if (!state.email) {
      errors.email = "Введите Email пользователя";
    } else if (!valudator.isEmail(state.email)) {
      errors.email = "Введите корректный Email";
    }
    if (!state.password) {
      errors.password = "Введите пароль для пользователя";
    } else if (state.password.length < 6 || state.password.length > 16) {
      errors.password = "Пароль должен содержать от 6 до 16 символов";
    }

    if (Object.values(errors).some(error => error)) {
      setErrors(errors);
      return;
    }
  }, [state]);

  return (
    <section className={styles.container}>
      {
        usersStore.loading.user &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        usersStore.errors.user &&
        <p className={styles.message}>{usersStore.errors.user}</p>
      }
      {
        user &&
        <div>
          <header className={styles.header}>
            Информация о пользователе
          </header>
          <section className={styles.info}>
            <Input
              value={state.name}
              onChange={handleChange}
              name="name"
              label="ФИО"
              placeholder="Введите имя пользователя"
              className={styles.input}
              error={errors.name}
            />
            <Input
              value={state.email}
              onChange={handleChange}
              name="email"
              label="Email"
              placeholder="Введите Email пользователя"
              className={styles.input}
              error={errors.email}
            />
            <Input
              value={state.password}
              onChange={handleChange}
              name="password"
              label="Пароль"
              placeholder="Введите пароль для пользователя"
              className={styles.input}
              error={errors.password}
            />
            {
              role &&
              <Dropdown
                title="Роль пользователя"
                options={roles}
                value={role}
                onSelect={setRole}
                className={styles.dropdown}
              />
            }
            {
              (
                user.role !== role?.value
                || user.name !== state.name
                || user.email !== state.email
                || user.password !== state.password
              ) &&
              <Button
                variant="success"
                className={styles['save-button']}
                onClick={handleSave}
              >
                Сохранить изменения
              </Button>
            }
          </section>
        </div>
      }
    </section>
  );
}

const ObserverUser = observer(User);

export default memo(ObserverUser);
