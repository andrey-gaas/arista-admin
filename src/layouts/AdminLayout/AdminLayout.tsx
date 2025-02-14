import styles from './AdminLayout.module.css';

type TAdminLayout = {
  children: React.ReactNode;
};

function AdminLayout(props: TAdminLayout) {
  const { children } = props;

  return (
    <section className={styles.layout}>
      <nav className={styles.nav}>
        Навигация
      </nav>
      <header className={styles.header}>
        Шапка страницы
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </section>
  );
}

export default AdminLayout;
