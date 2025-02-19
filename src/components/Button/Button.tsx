import { memo } from 'react';

import styles from './Button.module.scss';

type TButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'success' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: TButtonProps) {
  const { children, className, variant = 'primary', disabled, onClick } = props;

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(Button);
