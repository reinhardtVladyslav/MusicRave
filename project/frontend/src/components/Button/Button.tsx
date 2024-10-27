import React from 'react';
import style from './Button.module.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({onClick, className, text}) => {
    return (
        <button onClick={onClick} className={`${style.defaultButtonClass} ${className || ''}`}>
            {text}
        </button>
    );
};

export default Button;
