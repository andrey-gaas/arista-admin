import { ChangeEvent, memo } from "react";

import styles from './Input.module.scss';

type TInputProps = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'date';
	name?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
}

function Input(props: TInputProps) {
	const {
		value,
		onChange,
		label,
		placeholder,
		name,
		type = "text",
		className,
		error,
		disabled = false,
	} = props;

	return (
		<label className={`${styles.container} ${error && styles.error} ${className || ''}`}>
			{label && <span className={`${styles.label} ${error && styles.error}`}>{label}</span>}
			<input
				value={value}
				onChange={onChange}
				className={`${styles.input} ${type === 'search' && styles.search} ${error && styles.error} ${disabled && styles.disabled}`}
				placeholder={placeholder}
				name={name}
				type={type}
				disabled={disabled}
			/>
			{
				error &&
				<p className={styles['error-message']}>{error}</p>
			}
		</label>
	);
}

export default memo(Input);
