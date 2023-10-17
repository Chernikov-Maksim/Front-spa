import classNames from "classnames";

import { HTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

const Container = (props: ContainerProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <div className={classNames(styles.root, className)} {...otherProps}>
            {children}
        </div>
    );
};

export { Container };
