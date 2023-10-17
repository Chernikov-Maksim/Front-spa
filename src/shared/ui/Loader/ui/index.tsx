import classNames from "classnames";

import { HTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

const Loader = (props: LoaderProps) => {
    const { className } = props;

    return <div className={classNames(styles.root, className)}></div>;
};

export { Loader };
