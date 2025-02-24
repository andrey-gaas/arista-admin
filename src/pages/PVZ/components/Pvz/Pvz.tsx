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
  const [ozonCells, setOzonCells] = useState(0);
  const [wbCells, setWbCells] = useState(0);

  const pvz = pvzStore.pvz;

  useEffect(() => {
    pvzStore.fetchPvz(id);
  }, [id]);

  useEffect(() => {
    if (pvz) {
      setAddress(pvz.address);
      setOzonCells(pvz.ozon.max);
      setWbCells(pvz.wb.max);
    }
  }, [pvz]);

  const savePvz = useCallback(async () => {
    if (pvz) {
      const body = {
        ...(pvz.address !== address) && { address },
        ...(pvz.ozon.max !== ozonCells && { ozon: +ozonCells }),
        ...(pvz.wb.max !== wbCells && { wb: +wbCells }),
      };

      await pvzStore.fetchEditPvz(pvz?._id, body);
    }
  }, [pvz, address, ozonCells, wbCells]);

  return (
    <section className={styles.container}>
      {
        (pvzStore.loading.pvz) &&
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
            <Input
              value={address}
              onChange={event => setAddress(event.target.value)}
              placeholder="Введите адрес ПВЗ"
              label="Адрес ПВЗ"
              className={styles.input}
            />
            <section className={styles.cells}>
              <h4 className={styles['cell-title']}>Ячейки ПВЗ</h4>
              <Input
                value={ozonCells.toString()}
                onChange={event => setOzonCells(+event.target.value)}
                placeholder="Введите количество ячеек Ozon"
                label="Ячейки Ozon"
                className={styles.input}
                type="number"
              />
              <Input
                value={wbCells.toString()}
                onChange={event => setWbCells(+event.target.value)}
                placeholder="Введите количество ячеек WildBerries"
                label="Ячейки WildBerries"
                className={styles.input}
                type="number"
              />
            </section>
            <Button variant="danger" className={styles['delete-button']}>Удалить ПВЗ</Button>
            {
              (
                pvz.address !== address
                || +pvz.ozon.max !== +ozonCells
                || +pvz.wb.max !== +wbCells
              ) &&
              <div className={styles['save-button-container']}>
                <Button variant="success" onClick={savePvz} disabled={pvzStore.loading.edit}>Сохранить изменения</Button>
                {
                  pvzStore.loading.edit &&
                  <div className={styles['save-loader']}>
                    <Loader />
                  </div>
                }
              </div>
            }
          </section>
        </div>
      }
    </section>
  );
}

const ObserverPvz = observer(Pvz);

export default memo(ObserverPvz);
