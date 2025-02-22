import { useEffect, memo, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import pvzStore from '../../../../store/pvzStore';

import { Button, Loader, Input } from '../../../../components';
import styles from './Pvz.module.scss';

type TPvzProps = {
  id: string;
};

function Pvz(props: TPvzProps) {
  const { id } = props;

  const [address, setAddress] = useState("");
  const [ozonCells, setOzonCells] = useState("");
  const [wbCells, setWbCells] = useState("");

  const pvz = pvzStore.pvz;

  useEffect(() => {
    pvzStore.fetchPvz(id);
  }, [id]);

  useEffect(() => {
    if (pvz) {
      setAddress(pvz.address);
    }

    if (pvz?.type === 'arista') {
      setOzonCells(pvz.ozon.max);
      setWbCells(pvz.wb.max);
    }
  }, [pvz]);

  return (
    <section className={styles.container}>
      {
        pvzStore.loading.pvz &&
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      }
      {
        pvzStore.errors.pvz &&
        <p className={styles.message}>{pvzStore.errors.pvz}</p>
      }
      {
        pvz &&
        <div className={styles.pvz}>
          <header className={styles.header}>
            Данные пункта выдачи товаров
          </header>
          <section className={styles.content}>
            <div className={styles['input-container']}>
              <Input
                value={address}
                onChange={event => setAddress(event.target.value)}
                placeholder="Введите адрес ПВЗ"
                label="Адрес ПВЗ"
                className={styles.input}
              />
              {
                pvz.address !== address &&
                <Button>Сохранить</Button>
              }
              <div className={styles['input-loader']}>
                <Loader />
              </div>
            </div>
            {
              pvz.type === 'arista' &&
              <section className={styles.cells}>
                <h4 className={styles['cell-title']}>Ячейки ПВЗ</h4>
                <div className={styles['input-container']}>
                  <Input
                    value={ozonCells}
                    onChange={event => setOzonCells(event.target.value)}
                    placeholder="Введите количество ячеек Ozon"
                    label="Ячейки Ozon"
                    className={styles.input}
                    type="number"
                  />
                  {
                    pvz.ozon.max !== ozonCells &&
                    <Button>Сохранить</Button>
                  }
                  <div className={styles['input-loader']}>
                    <Loader />
                  </div>
                </div>
                <div className={styles['input-container']}>
                  <Input
                    value={wbCells}
                    onChange={event => setWbCells(event.target.value)}
                    placeholder="Введите количество ячеек WildBerries"
                    label="Ячейки WildBerries"
                    className={styles.input}
                    type="number"
                  />
                  {
                    pvz.wb.max !== wbCells &&
                    <Button>Сохранить</Button>
                  }
                  <div className={styles['input-loader']}>
                    <Loader />
                  </div>
                </div>
              </section>
            }
            <Button variant="danger" className={styles['delete-button']}>Удалить ПВЗ</Button>
          </section>
        </div>
      }
    </section>
  );
}

const ObserverPvz = observer(Pvz);

export default memo(ObserverPvz);
