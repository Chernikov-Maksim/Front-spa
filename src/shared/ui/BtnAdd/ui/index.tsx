import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface BtnAddProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BtnAdd = (props: BtnAddProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <button
            className={classNames(styles.btnAdd, className)}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export { BtnAdd };
