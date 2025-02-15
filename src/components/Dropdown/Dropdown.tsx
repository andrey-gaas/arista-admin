import { useState, useRef, useEffect } from 'react';

import Icon from '../Icon/Icon';
import styles from './Dropdown.module.scss';

type TOption = {
  value: string;
  label: string;
};

type TDropdownProps = {
  options: TOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  title: string;
  defaultValue?: TOption;
};

function Dropdown(props: TDropdownProps) {
  const { options, onSelect, placeholder, title, defaultValue } = props;

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<TOption | null>(defaultValue || null);
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
    setSelected(option);
    onSelect(option.value);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown} onClick={() => setOpen(value => !value)}>
      <span className={styles.title}>{title}</span>
      <span className={styles.label}>{selected?.label || placeholder}</span>
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

export default Dropdown;
