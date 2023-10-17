import classNames from "classnames";

import { HTMLAttributes } from "react";

import { Loader } from "@/shared/ui";

import styles from "./styles.module.scss";

interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {}

const PageLoader = (props: PageLoaderProps) => {
    const { className, ...otherProps } = props;

    return (
        <div className={classNames(styles.root, className)} {...otherProps}>
            <Loader />
        </div>
    );
};

export { PageLoader };
