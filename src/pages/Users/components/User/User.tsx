import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { observer } from 'mobx-react-lite';
import valudator from 'validator';
import usersStore from '../../../../store/usersStore';
import pvzStore from '../../../../store/pvzStore';

import { Loader, Input, Dropdown, Button, Modal } from '../../../../components';
import styles from './User.module.scss';
import { TRole } from '../../../../types/users';

type TOption = {
  value: string;
  label: string;
};

type TUserProps = {
  id: string;
  updateList: () => void;
};

function User(props: TUserProps) {
  const { id, updateList } = props;
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
  const [pvz, setPvz] = useState<TOption | null>(null);

  const [messageModal, setMessageModal] = useState("");

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
      if (pvzStore.list) {
        const pvzOption = pvzStore.list.find(pvz => pvz._id === user.pvz);
        setPvz(pvzOption ? { value: pvzOption._id, label: pvzOption.address } : null);
      }
    }
  }, [user, roles]);

  useEffect(() => {
    pvzStore.fetchList("");
  }, []);

  // Уведомление об ошибке "usersStore.errors.edit"
  // В виде модального окна
  useEffect(() => {
    if (usersStore.errors.edit) {
      setMessageModal(usersStore.errors.edit);
    }
  }, [usersStore.errors.edit]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setState(state => ({
      ...state,
      [name]: value,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (user) {
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

      if (!role) {
        usersStore.setErrors("Выберите роль пользователя", 'edit');
        return;
      }

      const query = {
        ...(state.name !== user.name && { name: state.name }),
        ...(state.email !== user.email && { email: state.email }),
        ...(state.password !== user.password && { password: state.password }),
        ...(role.value !== user.role && { role: role.value as TRole }),
      };

      await usersStore.fetchEditUser(user._id, query);
      await updateList();
    }
  }, [state, user, role, updateList]);

  const closeModal = useCallback(() => {
    setMessageModal("");
    usersStore.setErrors("", 'edit');
  }, []);

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
              pvzStore.list &&
              <Dropdown
                title="ПВЗ пользователя"
                options={pvzStore.list.map(pvz => ({ value: pvz._id, label: pvz.address }))}
                value={pvz || { value: 'not selected', label: 'Не выбрано' }}
                onSelect={setPvz}
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
              <div className={styles['save-button-container']}>
                <Button
                  variant="success"
                  className={styles['save-button']}
                  onClick={handleSave}
                  disabled={usersStore.loading.edit}
                >
                  Сохранить изменения
                </Button>
                {
                  usersStore.loading.edit &&
                  <div className={styles['save-loader-container']}>
                    <Loader />
                  </div>
                }
              </div>
            }
          </section>
        </div>
      }
      <Modal isOpen={!!messageModal} close={closeModal} title="Внимание!">
        <div className={styles['modal-content']}>
          <p className={styles['modal-text']}>
            {usersStore.errors.edit}
          </p>
          <Button onClick={closeModal} className={styles['modal-button']}>Закрыть</Button>
        </div>
      </Modal>
    </section>
  );
}

const ObserverUser = observer(User);

export default memo(ObserverUser);
