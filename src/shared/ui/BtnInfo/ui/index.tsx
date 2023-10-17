import classNames from "classnames";

import { AnchorHTMLAttributes } from "react";

import Image from "next/image";
import Link, { LinkProps } from "next/link";

import { routes } from "@/shared/constants/routes";

import styles from "./styles.module.scss";

interface BtnInfoProps
    extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
        LinkProps {}

const BtnInfo = (props: BtnInfoProps) => {
    const { children, className, href, ...otherProps } = props;

    return (
        <Link
            className={classNames(styles.btnInfo, className)}
            href={routes.main}
            {...otherProps}
        >
            <span>Как пользоваться сервисом?</span>
            <Image
                src="/images/auth/outward.svg"
                alt="outward"
                width={11}
                height={11}
            />
        </Link>
    );
};

export { BtnInfo, type BtnInfoProps };
