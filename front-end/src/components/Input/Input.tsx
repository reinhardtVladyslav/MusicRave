import React from 'react';
import style from './Input.module.scss';

interface InputProps {
    label: string;
    id: string;
    className?: string;
    helpText?: string;
    value: string;
    setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({label, className, id, value, setValue}) => {
    return (
        <div className={style.formGroup}>
            <input type="text" id={id} placeholder={label} value={value} onChange={
                (event) => setValue(event.target.value)
            }/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Input;
