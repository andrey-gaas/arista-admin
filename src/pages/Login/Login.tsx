import { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
//import authStore from '../../store/authStore';
import { Input, Button } from '../../components';
import styles from './Login.module.scss';

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setForm(state => ({
      ...state,
      [name]: value
    }));
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.photo} />
        <form className={styles.form}>
          <h1>Ариста</h1>
          <p>Служба доставки</p>
          <Input
            value={form.email}
            onChange={handleChange}
            label="Email"
            placeholder="Введите ваш Email"
            type="email"
            name="email"
            className={styles.input}
          />
          <Input
            value={form.password}
            onChange={handleChange}
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            name="password"
            className={styles.input}
          />
          <Button className={styles.button}>Войти</Button>
        </form>
      </section>
    </main>
  );
}

export default observer(LoginPage);