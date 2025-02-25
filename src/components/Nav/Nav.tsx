import { observer } from 'mobx-react-lite';
import { Link, useMatch } from 'react-router-dom';
import authStore from '../../store/authStore';

import styles from './Nav.module.scss';
import logoSrc from '../../assets/images/logo.png';

function Nav() {
  const ordersMatch = useMatch('orders');
  const clientsMatch = useMatch('clients');
  const pvzMatch = useMatch('pvz');
  const statisticsMatch = useMatch('statistics');
  const partnersMatch = useMatch('partners');
  const usersMatch = useMatch('users');
  const transportationMatch = useMatch('transportation');

  const logout = () => {
    authStore.logout();
  };

  return (
    <nav className={styles.nav}>
      <img src={logoSrc} alt="" className={styles.logo} />
      <ul className={styles.list}>
        <li>
          <Link to="/orders" className={ordersMatch ? styles.active : ""}>
            Заказы
          </Link>
        </li>
        <li>
          <Link to="/transportation" className={transportationMatch ? styles.active : ""}>
            Перевозки
          </Link>
        </li>
        <li>
          <Link to="/clients" className={clientsMatch ? styles.active : ""}>
            Клиенты
          </Link>
        </li>
        <li>
          <Link to="/pvz" className={pvzMatch ? styles.active : ""}>
            ПВЗ
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={statisticsMatch ? styles.active : ""}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/partners" className={partnersMatch ? styles.active : ""}>
            Партнеры
          </Link>
        </li>
        <li>
          <Link to="/users" className={usersMatch ? styles.active : ""}>
            Пользователи
          </Link>
        </li>
      </ul>
      <section className={styles.user}>
        {
          authStore.user &&
          <div>
            <p className={styles['user-name']}>
              {authStore.user.name}
            </p>
            <p className={styles['user-email']}>
              {authStore.user.email}
            </p>
            <button className={styles.logout} onClick={logout}>Выход</button>
          </div>
        }
      </section>
    </nav>
  );
}

const ObserverNav = observer(Nav);

export default ObserverNav;
