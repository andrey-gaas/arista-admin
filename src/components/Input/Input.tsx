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
	error?: string;
}

function Input(props: TInputProps) {
	const { value, onChange, label, placeholder, name, type="text", className, error } = props;
	return (
		<label className={`${styles.container} ${error && styles.error} ${className || ''}`}>
			<span className={`${styles.label} ${error && styles.error}`}>{label}</span>
			<input
				value={value}
				onChange={onChange}
				className={`${styles.input} ${error && styles.error}`}
				placeholder={placeholder}
				name={name}
				type={type}
			/>
			{
				error &&
				<p className={styles['error-message']}>{error}</p>
			}
		</label>
	);
}

export default memo(Input);
