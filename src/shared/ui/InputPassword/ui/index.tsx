"use client";

import classNames from "classnames";

import { useState, useCallback, InputHTMLAttributes } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = (props: InputPasswordProps) => {
    const { className, ...rest } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <>
            <div className={styles.item}>
                <input
                    {...rest}
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    className={classNames(
                        styles.password,
                        !!props?.value && styles.active
                    )}
                />
                <span className={styles.errorText}>Некорректный пароль</span>
                <button
                    onClick={handleShowPasswordClick}
                    type="button"
                    className={styles.watch}
                >
                    {showPassword ? (
                        <Image
                            className={styles.visibility}
                            src="/images/auth/visibility.svg"
                            alt="visibility"
                            width={24}
                            height={24}
                        />
                    ) : (
                        <Image
                            className={styles.visibilityOff}
                            src="/images/auth/visibilityOff.svg"
                            alt="visibilityOff"
                            width={24}
                            height={24}
                        />
                    )}
                </button>
            </div>
        </>
    );
};

export { InputPassword, type InputPasswordProps };
