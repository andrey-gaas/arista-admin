import { memo } from 'react';

import styles from './Header.module.scss';

type THeaderProps = {
  title: string;
}

function Header(props: THeaderProps) {
  const { title } = props;
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
}

export default memo(Header);
