import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface BtnExitProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BtnExit = (props: BtnExitProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <button
            className={classNames(styles.btnExit, className)}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export { BtnExit };
