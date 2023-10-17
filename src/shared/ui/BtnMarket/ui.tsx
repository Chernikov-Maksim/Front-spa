import classNames from "classnames";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import Link, { LinkProps } from "next/link";

import styles from "./styles.module.scss";

interface BtnMarketProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BtnMarket = (props: BtnMarketProps) => {
    const { children, className, ...otherProps } = props;

    return (
        <button className={classNames(styles.btnMarket, className)} {...otherProps}>
            {children}
        </button>
    );
};

export { BtnMarket };
