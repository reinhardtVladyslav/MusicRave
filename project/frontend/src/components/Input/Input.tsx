import React from 'react';
import style from './Input.module.scss';

interface InputProps {
    label: string;
    id: string;
    className?: string;
    helpText?: string;
    value: string;
    setValue: (value: string) => void;
    type?: string;
    autoComplete?: string;
    icon?: React.ReactNode;
    error?: string; // Додаємо проп для повідомлення про помилку
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         className = '',
                                         id,
                                         value,
                                         setValue,
                                         type = 'text',
                                         autoComplete = 'none',
                                         icon,
                                         error
                                     }) => {
    return (
        <div className={`${style.formGroup} ${error ? style.error : ''}`}>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={label}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={className}
                autoComplete={autoComplete}
            />
            <label htmlFor={id}>{label}</label>
            {icon && <div className={style.iconContainer}>{icon}</div>}
            {error && <p className={style.errorMessage}>{error}</p>} {/* Відображення повідомлення про помилку */}
        </div>
    );
};

export default Input;
