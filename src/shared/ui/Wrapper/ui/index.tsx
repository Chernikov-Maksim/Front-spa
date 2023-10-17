import classNames from "classnames";

import { HTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {}

const Wrapper = (props: WrapperProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <div className={classNames(styles.root, className)} {...otherProps}>
            {children}
        </div>
    );
};

export { Wrapper, type WrapperProps };
