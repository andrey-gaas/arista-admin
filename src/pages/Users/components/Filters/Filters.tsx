import { useCallback, memo, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import pvzStore from "../../../../store/pvzStore";
import usersStore from "../../../../store/usersStore";

import { Dropdown, Button, Input, Modal } from "../../../../components";
import styles from './Filters.module.scss';
import { TRole } from "../../../../types/users";

type TOption = {
  value: string;
  label: string;
};

type TFiltersProps = {
  roles: TOption[];
  role: TOption;
  setRole: React.Dispatch<React.SetStateAction<TOption>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

function Filters(props: TFiltersProps) {
  const { roles, role, setRole, name, setName } = props;

  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userRole, setUserRole] = useState<TOption>({ value: 'all', label: "Выберите роль" });
  const [userPvz, setUserPvz] = useState<TOption>({ value: "not selected", label: "Выберите ПВЗ" });
  const [error, setError] = useState("");

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  }, [setName]);

  const toggleModal = useCallback(() => {
    setOpenCreateModal((prev) => !prev);
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const createUser = useCallback(async () => {
    const { name, email, password } = user;
    setError("");

    if (!name) {
      setError("Введите имя пользователя");
      return;
    }

    if (!email) {
      setError("Введите email пользователя");
      return;
    }

    if (!password) {
      setError("Введите пароль пользователя");
      return;
    }

    if (userRole.value === 'all') {
      usersStore.setErrors("Выберите роль пользователя", 'create');
      return;
    }

    await usersStore.fetchCreateUser({
      name,
      email,
      password,
      role: userRole.value as TRole,
      pvz: userPvz.value === 'not selected' ? undefined : userPvz.value
    });
    toggleModal();
  }, [user, userRole.value, userPvz.value, toggleModal]);

  useEffect(() => {
    pvzStore.fetchList("");
  }, []);

  return (
    <section className={styles.container}>
      <Dropdown
        options={roles}
        title="Роли:"
        value={role}
        onSelect={setRole}
      />
      <Input
        value={name}
        onChange={handleChangeName}
        className={styles.input}
        type="search"
        placeholder="Поиск по имени"
      />
      <Button variant="success" className={styles.button} onClick={toggleModal}>Создать пользователя</Button>
      <Modal
        isOpen={isOpenCreateModal}
        close={toggleModal}
        title="Создание пользователя"
      >
        <div className={styles['modal-content']}>
          <Input
            value={user.name}
            onChange={handleChange}
            name="name"
            className={styles['modal-input']}
            label="ФИО"
            placeholder="Введите ФИО пользователя"
          />
          <Input
            value={user.email}
            onChange={handleChange}
            name="email"
            className={styles['modal-input']}
            label="Email"
            placeholder="Введите Email пользователя"
          />
          <Input
            value={user.password}
            onChange={handleChange}
            name="password"
            className={styles['modal-input']}
            label="Пароль"
            placeholder="Введите пароль пользователя"
          />
          <div className={styles.dropdowns}>
            <Dropdown
              options={roles.filter(item => item.value !== 'all')}
              title="Роль:"
              value={userRole}
              onSelect={setUserRole}
            />
            {
              pvzStore.list &&
              <Dropdown
                options={pvzStore.list.map(item => ({ value: item._id, label: item.address }))}
                title="ПВЗ:"
                value={userPvz}
                onSelect={setUserPvz}
              />
            }
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <Button variant="danger" onClick={toggleModal}>Отмена</Button>
          <Button variant="success" onClick={createUser}>Создать пользователя</Button>
        </div>
      </Modal>
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default memo(ObserverFilters);
