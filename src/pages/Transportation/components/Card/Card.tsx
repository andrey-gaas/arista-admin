import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import transporationsStore from '../../../../store/transportationsStore';

import { ArrowBigDown, Package, CircleCheckBig } from 'lucide-react';
import { Button, Modal, Loader } from '../../../../components';
import styles from './Card.module.scss';
import { TTransportation } from '../../../../types/transportations';

type TCardProps = {
  transportation: TTransportation | null;
  close: (value?: TTransportation) => void;
  updateList: () => void;
};

function Card(props: TCardProps) {
  const { transportation, close, updateList } = props;

  const [error, setError] = useState("");

  const [isOpenModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleModal = useCallback(() => {
    setOpenModal(value => !value);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setLoading(true);
    setScanError("");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      if (value.trim() !== '' && transportation) {
        if (products.length === transportation.products.length) {
          setScanError("Все товары уже просканированы");
        } else if (products.includes(value)) {
          setScanError("Товар уже просканирован");
        } else if (transportation.products.includes(value)) {
          setProducts(products => [...products, value]);
          setInputValue('');
        } else {
          setScanError(`Товара нет в списке`);
          setInputValue('');
        }
      }
    }, 500);
  };

  const complateTransportation = useCallback(async () => {
    setError("");
    if (transportation) {
      if (products.length !== transportation.products.length) {
        return setError("Для завершения перевозки необходимо просканировать все товары");
      }

      const result = await transporationsStore.fetchFinish(transportation._id, products);

      if (result) {
        close();
        updateList();
      } else {
        setError(transporationsStore.errors.finish);
      }
    }
  }, [transportation, products, close, updateList]);

  useEffect(() => {
    if (isOpenModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (!isOpenModal) return;

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
  }, [isOpenModal]);

  return (
    <Modal isOpen={!!transportation} close={close} title="Информация о перевозке">
      {
        transportation && (
          <div className={styles.container}>
            <div className={styles['top-info']}>
              <span className={styles.user}>Создал: <b>{transportation.creator.name}</b></span>
              <span className={styles.date}>{new Date(transportation.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.info}>
              <div className={styles.transportation}>
                {
                  transportation.from === 'Fulfillment center' ?
                    'Центр выдачи заказов' : transportation.from.address
                }
                <ArrowBigDown />
                {
                  transportation.to === 'Fulfillment center' ?
                    'Центр выдачи заказов' : transportation.to.address
                }
              </div>
              <Button
                className={styles.button}
                onClick={toggleModal}
              >
                Сканировать товары
              </Button>
              <section className={styles.list}>
                {
                  transportation.products.map(product => (
                    <article key={product} className={styles.product}>
                      <span>Товар #{product}</span>
                      {
                        products.includes(product) ?
                          <CircleCheckBig size={20} color="#42b883" /> : <Package size={20} color="#aaa" />
                      }
                    </article>
                  ))
                }
              </section>
              {error && <p className={styles['modal-error']}>{error}</p>}
              <div className={styles['modal-buttons']}>
                <Button variant='danger' onClick={close}>Отмена</Button>
                <Button variant='success' onClick={complateTransportation}>Завершить перевозку</Button>
              </div>
              <Modal isOpen={isOpenModal} close={toggleModal} title="Просканируйте товары">
                <p className={styles['modal-text']}>
                  Просканировано {products.length} из {transportation.products.length}
                </p>
                <input
                  ref={inputRef}
                  className={styles['modal-input']}
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {loading && <div className={styles['modal-loader']}><Loader /></div>}
                {scanError && <p className={styles['modal-error']}>{scanError}</p>}
                <div className={styles['modal-button']}>
                  <Button onClick={toggleModal}>Завершить</Button>
                </div>
              </Modal>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

const ObserverCard = observer(Card);

export default memo(ObserverCard);
