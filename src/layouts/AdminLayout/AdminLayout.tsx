import { Nav, Header } from '../../components';
import styles from './AdminLayout.module.css';

type TAdminLayout = {
  children: React.ReactNode;
  title: string;
};

function AdminLayout(props: TAdminLayout) {
  const { children, title } = props;

  return (
    <section className={styles.layout}>
      <Nav />
      <Header title={title} />
      <main className={styles.main}>
        {children}
      </main>
    </section>
  );
}

export default AdminLayout;
