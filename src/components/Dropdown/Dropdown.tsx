import { useState, useRef, useEffect, memo } from 'react';

import Icon from '../Icon/Icon';
import styles from './Dropdown.module.scss';

type TOption = {
  value: string;
  label: string;
};

type TDropdownProps = {
  options: TOption[];
  onSelect: (value: TOption) => void;
  placeholder?: string;
  title?: string;
  value: TOption;
  className?: string;
};

function Dropdown(props: TDropdownProps) {
  const { options, onSelect, placeholder, title, value, className } = props;

  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option: TOption) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${isOpen && styles.open} ${className}`} onClick={() => setOpen(value => !value)}>
      {title && <span className={styles.title}>{title}</span>}
      <span className={styles.label}>{value.label || placeholder}</span>
      <Icon type="arrow" className={isOpen ? styles.open : styles.close} />
      {
        isOpen &&
        <ul className={styles.list}>
          {options.map(option => (
            <li key={option.value} onClick={(event) => { event.stopPropagation(); handleSelect(option) }}>{option.label}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default memo(Dropdown);
