import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <button
            className={classNames(styles.authBtn, className)}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export { Button, type ButtonProps };
