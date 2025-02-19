import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { observer } from 'mobx-react-lite';
import ordersStore from '../../../../store/ordersStore';

import { Button, Icon, Modal, Loader } from '../../../../components';
import { TProduct } from '../../../../types/orders';
import styles from './Products.module.scss';

type TProductsProps = {
  products: TProduct[];
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
};

function Products(props: TProductsProps) {
  const { products, setProducts } = props;

  const [isOpen, setOpen] = useState(false);
  const [modalProducts, setModalProducts] = useState<TProduct[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const remove = (product: TProduct) => {
    let newProducts = products.filter(item => item.id !== product.id);
    newProducts = newProducts.map((item, i) => ({ ...item, title: `Товар №${i + 1}` }));
    setProducts(newProducts);
  };

  const toggleModalOpen = useCallback(() => {
    setOpen(value => !value);
  }, []);

  const cancel = useCallback(() => {
    setOpen(false);
    setModalProducts([]);
  }, []);

  const addProducts = useCallback(() => {
    let newProducts = products.concat(modalProducts);
    newProducts = newProducts.map((item, i) => ({ ...item, title: `Товар №${i + 1}`, id: i }));
    setProducts(newProducts);
    setOpen(false);
    setModalProducts([]);
  }, [products, modalProducts, setProducts]);

  const closeErrorModal = useCallback(() => {
    ordersStore.setError("", "status");
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
        let i = 0;
        setModalProducts(prev => [...prev.map(item => ({ ...item, id: i++ })), { code: value, title: '', id: i++ }]);
        setInputValue('');
      }
    }, 500);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Список товаров</h3>
      <section className={styles.list}>
        {products.length === 0 && <p className={styles.message}>Список пуст</p>}
        {products.length > 0 && (
          <div>
            {products.map(product => (
              <article key={product.id} className={styles.product}>
                <span>{product.title}</span> <span>Код: {product.code}</span>
                <button className={styles['remove-button']} onClick={() => remove(product)}>
                  <Icon type="trash" />
                </button>
              </article>
            ))}
          </div>
        )}
        <Button className={styles.button} onClick={toggleModalOpen}>Добавить товары</Button>
      </section>
      <Modal title="Просканируйте товары" isOpen={isOpen} close={toggleModalOpen}>
        <p className={styles['modal-text']}>Товаров добавлено: {modalProducts.length}</p>
        <input
          ref={inputRef}
          className={styles['modal-input']}
          value={inputValue}
          onChange={handleInputChange}
        />
        {loading && <div className={styles['modal-loader']}><Loader /></div>}
        <div className={styles['modal-buttons']}>
          <Button variant="primary" onClick={addProducts}>Добавить</Button>
          <Button variant="danger" onClick={cancel}>Отмена</Button>
        </div>
      </Modal>
      <Modal
        title="Ошибка изменения статуса заказа"
        isOpen={ordersStore.errors.status !== ""}
        close={closeErrorModal}
      >
        <p className={styles['modal-text']}>{ordersStore.errors.status}</p>
        <div className={styles['modal-error-button']}>
          <Button variant="primary" onClick={closeErrorModal}>Закрыть окно</Button>
        </div>
      </Modal>
    </section>
  );
}

const ObserverProducts = observer(Products);

export default memo(ObserverProducts);