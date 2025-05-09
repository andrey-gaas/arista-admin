import { memo, useState, useEffect, useCallback, useRef } from "react";
import { observer } from "mobx-react-lite";
import pvzStore from "../../../../store/pvzStore";
import transporationsStore from "../../../../store/transportationsStore";
import { TProduct } from '../../../../types/orders';

import { Trash2 } from "lucide-react";
import { Modal, Dropdown, Loader, Button } from "../../../../components";
import styles from './Create.module.scss';

type TOption = { value: string; label: string };

type TCreateModalProps = {
  isOpen: boolean;
  close: () => void;
  updateList: () => void;
};

function CreateModal(props: TCreateModalProps) {
  const { isOpen, close, updateList } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [options, setOptions] = useState<TOption[]>([{ value: "Fulfillment center", label: "Центр выдачи заказов" }]);
  const [from, setFrom] = useState(options[0]);
  const [to, setTo] = useState(options[0]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [error, setError] = useState("");

  const [isOpenModal, setOpenModal] = useState(false);
  const [modalProducts, setModalProducts] = useState<TProduct[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pvzStore.fetchList("");
  }, []);

  useEffect(() => {
    if (pvzStore.list && options.length === 1) {
      const options = pvzStore.list.map((item) => ({ value: item._id, label: item.address }));
      setOptions(state => [...state, ...options]);
    }
  }, [pvzStore.list, options.length]);

  useEffect(() => {
    if (isOpenModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (!isOpen) return;

    const handleBlur = () => {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [isOpen]);

  const toggleModal = useCallback(() => {
    if (isOpenModal) {
      setModalProducts([]);
    }
    setOpenModal(value => !value);
  }, [isOpenModal]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      if (value.trim() !== '') {
        setModalProducts(prev => [...prev, { code: value, status: 'in_transit', place: 'Fulfillment center' }]);
        setInputValue('');
      }
    }, 500);
  };

  const addProducts = useCallback(() => {
    const newProducts = products.concat(modalProducts);
    setProducts(newProducts);
    setOpenModal(false);
    setModalProducts([]);
    setError("");
  }, [products, modalProducts, setProducts]);

  const create = useCallback(async () => {
    if (from === to) {
      setError('Пункт отправки и назначения не могут совпадать');
      return;
    }

    if (products.length === 0) {
      setError('Необходимо добавить товары');
      return;
    }

    const body = {
      from: from.value,
      to: to.value,
      products: products.map(item => item.code),
    };

    const result = await transporationsStore.fetchCreate(body);

    if (result) {
      await updateList();
      close();
    }
  }, [from, to, products, close, updateList]);

  return (
    <Modal isOpen={isOpen} close={close} title="Создать перевозку">
      <div className={styles.container}>
        {
          pvzStore.loading.list &&
          <Loader />
        }
        {
          pvzStore.list &&
          <>
            <h6 className={styles.title}>Пункт отправки</h6>
            <Dropdown
              options={options}
              onSelect={setFrom}
              value={from}
              className={styles.dropdown}
            />
            <h6 className={styles.title}>Пункт назначения</h6>
            <Dropdown
              options={options}
              onSelect={setTo}
              value={to}
              className={styles.dropdown}
            />
            <section className={styles.list}>
              <Button
                className={styles['add-products-button']}
                onClick={toggleModal}
              >
                Добавить товары
              </Button>
              {
                products.length > 0 &&
                <>
                  <section className={styles.products}>
                    {
                      products.map((item, i) => (
                        <article key={item.code} className={styles.product}>
                          Товар №{i + 1}, код - {item.code}
                          <button onClick={() => setProducts(products => products.filter(prod => prod.code !== item.code))}><Trash2 size={16} /></button>
                        </article>
                      ))
                    }
                  </section>
                  <p className={styles['products-count']}>Товаров: {products.length}</p>
                </>
              }
              <Modal
                isOpen={isOpenModal}
                close={toggleModal}
                title="Добавление товаров"
              >
                <div className={styles.container}>
                  <p className={styles['modal-text']}>
                    Товаров добавлено: {modalProducts.length}
                  </p>
                  <input
                    ref={inputRef}
                    className={styles['modal-input']}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  {loading && <div className={styles['modal-loader']}><Loader /></div>}
                </div>
                <div className={styles['modal-buttons']}>
                  <Button variant="danger" onClick={toggleModal}>Отмена</Button>
                  <Button variant="primary" onClick={addProducts}>Добавить</Button>
                </div>
              </Modal>
            </section>
          </>
        }
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <footer className={styles['footer-buttons']}>
        <Button variant="danger" onClick={close}>Отмена</Button>
        <Button variant="success" onClick={create}>Создать</Button>
      </footer>
    </Modal>
  );
}

const ObserverCreateModal = observer(CreateModal);

export default memo(ObserverCreateModal);
