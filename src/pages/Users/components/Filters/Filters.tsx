import { useCallback } from "react";

import { Dropdown, Button, Input } from "../../../../components";
import styles from './Filters.module.scss';

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

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  }, [setName]);

  return (
    <section className={styles.container}>
      <Dropdown
        options={roles}
        title="Роли:"
        defaultValue={role}
        onSelect={setRole}
      />
      <Input
        value={name}
        onChange={handleChangeName}
        className={styles.input}
        type="search"
        placeholder="Поиск по имени"
      />
      <Button variant="success" className={styles.button}>Создать пользователя</Button>
    </section>
  );
}

export default Filters;
