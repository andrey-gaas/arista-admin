import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import pvzStore from '../../../../store/pvzStore';

import { Input, Button, Modal, Loader } from '../../../../components';
import styles from './Filters.module.scss';

type TFiltersProps = {
  setCurrentPvz: React.Dispatch<React.SetStateAction<string>>;
};

function Filters(props: TFiltersProps) {
  const { setCurrentPvz } = props;
  const [search, setSearch] = useState('');
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const [createState, setCreateState] = useState({
    title: "",
    ozon: "",
    wb: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    ozon: "",
    wb: "",
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  }, []);

  const openCreateModal = useCallback(() => {
    setOpenCreateModal(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setOpenCreateModal(false);
  }, []);

  const handleChangeCreateModal = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const createPvz = useCallback(async () => {
    const { title, ozon, wb } = createState;
    const errors = {
      title: "",
      ozon: "",
      wb: "",
    };

    if (!title) {
      errors.title = "Поле не может быть пустым";
    }

    if (!ozon) {
      errors.ozon = "Поле не может быть пустым";
    }

    if (!wb) {
      errors.wb = "Поле не может быть пустым";
    }

    if (errors.title || errors.ozon || errors.wb) {
      setErrors(errors);
      return;
    }

    const body = { address: title, ozon: +ozon, wb: +wb };

    const result = await pvzStore.fetchCreatePvz(body);

    if (result) {
      closeCreateModal();
      setCurrentPvz(result._id);
    }
  }, [createState, closeCreateModal, setCurrentPvz]);

  useEffect(() => {
    pvzStore.fetchList(search);
  }, [search]);

  return (
    <section className={styles.container}>
      <Input
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Поиск по адресу"
        className={styles.input}
      />
      <Button
        onClick={openCreateModal}
        className={styles.button}
      >
        Создать ПВЗ
      </Button>
      <Modal isOpen={isOpenCreateModal} close={closeCreateModal} title="Создание ПВЗ">
        <div className={styles['modal-container']}>
          <Input
            label="Адрес"
            value={createState.title}
            placeholder="Введите адрес ПВЗ"
            onChange={handleChangeCreateModal}
            name="title"
            className={styles['modal-input']}
            error={errors.title}
          />
          <Input
            label="Количество ячеек OZON"
            value={createState.ozon}
            placeholder="Введите количество ячеек OZON в ПВЗ"
            onChange={handleChangeCreateModal}
            name="ozon"
            className={styles['modal-input']}
            type="number"
            error={errors.ozon}
          />
          <Input
            label="Количество ячеек Wildberries"
            value={createState.wb}
            placeholder="Введите количество ячеек Wildberries в ПВЗ"
            onChange={handleChangeCreateModal}
            name="wb"
            className={styles['modal-input']}
            type="number"
            error={errors.wb}
          />
          {
            pvzStore.loading.create &&
            <div className={styles['loader-container']}>
              <Loader />
            </div>
          }
        </div>
        <footer className={styles['modal-footer']}>
          <Button variant="danger" onClick={closeCreateModal} disabled={pvzStore.loading.create}>Отмена</Button>
          <Button variant="success" onClick={createPvz} disabled={pvzStore.loading.create}>Создать ПВЗ</Button>
        </footer>
      </Modal>
    </section>
  );
}

const ObserverFilters = observer(Filters);

export default ObserverFilters;
