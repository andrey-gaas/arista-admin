import { Button, Icon } from '../../../../components';
import { TProduct } from '../../../../types/orders';
import styles from './Products.module.scss';

type TProductsProps = {
  products: TProduct[];
  setProducts: (products: TProduct[]) => void;
};

function Products(props: TProductsProps) {
  const { products, setProducts } = props;

  const remove = (product: TProduct) => {
    let newProducts = products.filter(item => item.code !== product.code);
    newProducts = newProducts.map((item, i) => ({ ...item, title: `Товар №${i + 1}` }))
    setProducts(newProducts);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Список товаров</h3>
      <div className={styles.grid}>
        <section className={styles.list}>
          {
            products.length === 0 &&
            <p className={styles.message}>Список пуст</p>
          }
          {
            products.length > 0 &&
            <div>
              {
                products.map(product => (
                  <article key={product.code} className={styles.product}>
                    <span>{product.title}</span> <span>Код: {product.code}</span>
                    <button className={styles['remove-button']} onClick={() => remove(product)}>
                      <Icon type="trash" />
                    </button>
                  </article>
                ))
              }
            </div>
          }
          <Button className={styles.button}>Добавить товары</Button>
        </section>
      </div>
    </section>
  );
}

export default Products;
