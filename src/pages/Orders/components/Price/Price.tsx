import { useState, useCallback, useEffect, memo } from 'react';
import { X } from 'lucide-react';

import { Button, Input } from '../../../../components';
import { TMarket, TOrderStatus } from '../../../../types/orders';
import styles from './Price.module.scss';

type TPriceProps = {
  marketplace: TMarket;
  productsCount: number;
  totalPrice: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
  profit: number | null;
  setProfit: React.Dispatch<React.SetStateAction<number | null>>;
  status: TOrderStatus;
};

type TExpensiveProduct = {
  price: number;
  id: number;
};

const ozonMaxPrice = 5000;

function Price(props: TPriceProps) {
  const { marketplace, productsCount, totalPrice, setTotalPrice, profit, setProfit, status } = props;

  const [expensiveProducts, setExpensiveProducts] = useState<TExpensiveProduct[]>([]);
  const [error, setError] = useState("");

  const handleChangePrice = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTotalPrice(value);
  }, [setTotalPrice]);

  useEffect(() => {
    if (status === 'added') {
      setError("");

      if (productsCount > 0 && +totalPrice) {
        if (marketplace === 'wb') {
          setProfit(+totalPrice / 100 * 5);
        } else {
          const expensiveSum = expensiveProducts.reduce((sum, product) => sum + product.price, 0);
          const regularProductsCount = productsCount - expensiveProducts.length;
          const regularSum = +totalPrice - expensiveSum;
          const regularAverage = regularProductsCount > 0 ? regularSum / regularProductsCount : 0;

          if (expensiveSum > +totalPrice) {
            setError("Сумма дорогих товаров не может превышать общую стоимость");
            setProfit(null);
            return;
          }

          if (expensiveProducts.length < productsCount && expensiveSum === +totalPrice) {
            setError("Количество дорогих товаров не соответствует общей стоимости");
            setProfit(null);
            return;
          }

          const hasInvalidExpensiveProduct = expensiveProducts.some(product => product.price < ozonMaxPrice);

          if (hasInvalidExpensiveProduct) {
            setProfit(null);
            return;
          }

          const expensiveProfit = expensiveProducts.reduce((sum) => sum + (ozonMaxPrice / 100 * 5), 0);
          const regularProfit = regularProductsCount > 0
            ? regularProductsCount * Math.min(regularAverage / 100 * 5, 250)
            : 0;

          setProfit(expensiveProfit + regularProfit);
        }
      } else {
        setProfit(null);
      }
    }
  }, [marketplace, totalPrice, expensiveProducts, productsCount, setProfit]);

  const addExpensiveProduct = useCallback(() => {
    if (expensiveProducts.length < productsCount) {
      setExpensiveProducts(state => [...state, { price: 0, id: Math.random() }]);
    }
  }, [expensiveProducts.length, productsCount]);

  const changeExpensiveProduct = (event: React.ChangeEvent<HTMLInputElement>, product: TExpensiveProduct) => {
    const { value } = event.target;

    setExpensiveProducts(prev => prev.map(item => {
      if (item.id !== product.id) return item;

      item.price = +value;
      return item;
    }));
  };

  const removeExpensiveProduct = (product: TExpensiveProduct) => {
    setExpensiveProducts(prev => prev.filter(item => item.id !== product.id));
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Цена</h3>
      <div className={styles['input-container']}>
        <Input
          value={totalPrice}
          onChange={handleChangePrice}
          label="Общая цена заказа"
          placeholder="Введите общую стоимость заказа"
          type="number"
          disabled={productsCount === 0 || status !== 'added'}
        />
      </div>
      {
        expensiveProducts.length > 0 &&
        expensiveProducts.map(product => (
          <div key={product.id} className={`${styles['expensive-input-container']} ${product.price < ozonMaxPrice && styles.error}`}>
            <input
              type="number"
              value={product.price || ""}
              onChange={(event) => changeExpensiveProduct(event, product)}
            />
            <button onClick={() => removeExpensiveProduct(product)}><X /></button>
          </div>
        ))
      }
      {
        (
          marketplace === 'ozon'
          && productsCount !== 0
          && expensiveProducts.length < productsCount
          && totalPrice
          && +totalPrice - expensiveProducts.reduce((sum, product) => sum + product.price, 0) > ozonMaxPrice
          && !expensiveProducts.find(item => item.price < ozonMaxPrice)
          && status === 'added'
        ) &&
        <Button className={styles.button} onClick={addExpensiveProduct}>Добавить товар дороже {ozonMaxPrice} ₽</Button>
      }
      {
        (profit !== null && profit > 0) &&
        <p className={styles.profit}>Прибыль: {profit.toFixed(2)} ₽</p>
      }
      {
        (marketplace === 'ozon' && status === 'added') &&
        <p className={styles['ozon-message']}>Внимание! Если все товары превышают лимит {ozonMaxPrice} ₽, достаточно ввести общую стоимость заказа, не добавляя отдельные стоимости товаров.</p>
      }
      {
        error &&
        <p className={styles['error-message']}>{error}</p>
      }
    </section>
  );
}

export default memo(Price);
