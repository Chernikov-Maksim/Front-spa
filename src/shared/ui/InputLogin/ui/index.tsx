"use client";

import classNames from "classnames";

import { InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface InputLoginProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputLogin = (props: InputLoginProps) => {
    const { className, ...rest } = props;

    return (
        <>
            <input
                className={classNames(
                    styles.login,
                    !!props?.value && styles.active
                )}
                type="email"
                placeholder="Почта"
                {...rest}
            />
            <span className={styles.errorText}>Почта не зарегистрирована</span>
        </>
    );
};

export { InputLogin, type InputLoginProps };
