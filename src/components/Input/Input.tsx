import { ChangeEvent, memo } from "react";

import styles from './Input.module.scss';

type TInputProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password';
	name: string;
	className?: string;
}

function Input(props: TInputProps) {
	const { value, onChange, label, placeholder, name, type="text", className } = props;
	return (
		<label className={`${styles.container} ${className || ''}`}>
			<span className={styles.label}>{label}</span>
			<input
				value={value}
				onChange={onChange}
				className={styles.input}
				placeholder={placeholder}
				name={name}
				type={type}
			/>
		</label>
	);
}

export default memo(Input);
