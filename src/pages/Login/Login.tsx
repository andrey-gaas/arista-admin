import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import authStore from '../../store/authStore';
import { Input, Button } from '../../components';
import styles from './Login.module.scss';

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setForm(state => ({
      ...state,
      [name]: value
    }));

    setErrors(state => ({
      ...state,
      [name]: "",
    }));
  }, [])

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email) {
      return setErrors(state => ({
        ...state,
        "email": "Введите Email",
      }));
    }

    if (!validator.isEmail(form.email)) {
      return setErrors(state => ({
        ...state,
        "email": "Введите валидный Email",
      }));
    }

    if (!form.password) {
      return setErrors(state => ({
        ...state,
        "password": "Введите пароль",
      }));
    }

    await authStore.fetchLogin(form.email, form.password);

    if (authStore.user) {
      navigate('/orders');
    }
  }, [form]);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.photo} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Ариста</h1>
          <p>Служба доставки</p>
          <Input
            value={form.email}
            onChange={handleChange}
            label="Email"
            placeholder="Введите ваш Email"
            name="email"
            className={styles.input}
            error={errors.email}
          />
          <Input
            value={form.password}
            onChange={handleChange}
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            name="password"
            className={styles.input}
            error={errors.password}
          />
          <Button
            className={styles.button}
          >
            Войти
          </Button>
        </form>
      </section>
    </main>
  );
}

export default observer(LoginPage);