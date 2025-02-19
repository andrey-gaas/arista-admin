import styles from './Pagination.module.scss';

type TPaginationProps = {
  listSize: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination(props: TPaginationProps) {
  const { listSize, page, setPage } = props;

  const prev = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const next = () => {
    if (page === Math.ceil(listSize / 10) - 1) return;
    setPage(page + 1);
  };

  return (
    <section className={styles.container}>
      <button onClick={prev} className={styles.button}>Назад</button>
      <p className={styles.pages}>
        {page + 1} / {Math.ceil(listSize / 10) || 1}
      </p>
      <button onClick={next} className={styles.button}>Вперед</button>
    </section>
  );
}

export default Pagination;
