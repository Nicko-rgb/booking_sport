import React from 'react';
import style from '../../styles/ui/btns.module.css';

export const Button1 = ({ text = '', onClick, Icon }) => {
    return (
        <button className={style.btnPrimary} onClick={onClick}>
            {text}
            {Icon && <Icon className={style.btnIco} />}
        </button>
    )
}

export const Button2 = ({ text = '', onClick, Icon }) => {
    return (
        <button className={style.btnSecondary} onClick={onClick}>
            {text}
            {Icon && <Icon className={style.btnIco} />}
        </button>
    )
}

export const BtnCancel = ({ text = '', onClick, Icon }) => {
    return (
        <button className={style.btnCancel} onClick={onClick}>
            {text}
            {Icon && <Icon className={style.btnIco} />}
        </button>
    )
}

export const BtnSubmit = ({ text = '', onClick, Icon }) => {
    return (
        <button className={style.btnSubmit} onClick={onClick}>
            {text}
            {Icon && <Icon className={style.btnIco} />}
        </button>
    )
}
