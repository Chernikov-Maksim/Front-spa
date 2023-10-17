import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface BtnSearchProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BtnSearch = (props: BtnSearchProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <button
            className={classNames(styles.search, className)}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export { BtnSearch, type BtnSearchProps };
