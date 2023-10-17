import classNames from "classnames";

import { ButtonHTMLAttributes } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

interface IBtnDelitProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BtnDelit = (props: IBtnDelitProps) => {
    const { className, ...otherProps } = props;

    return (
        <button className={classNames(styles.delit, className)} {...otherProps}>
            <span>Не учитывать</span>
            <Image
                src="/images/competitors/circle.svg"
                alt="description"
                width={19}
                height={19}
            />
        </button>
    );
};
