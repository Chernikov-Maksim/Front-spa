import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

interface IBtnCreateProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BtnCreate = (props: IBtnCreateProps) => {
    const { className, ...otherProps } = props;

    return (
        <button className={classNames(styles.delit, className)} {...otherProps}>
            <span>Добавить</span>
            <Image
                src="/images/competitors/create.svg"
                alt="description"
                width={19}
                height={19}
            />
        </button>
    );
};
