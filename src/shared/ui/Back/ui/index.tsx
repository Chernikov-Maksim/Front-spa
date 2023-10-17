'use client';

import {AnchorHTMLAttributes, ButtonHTMLAttributes} from "react";

import Image from "next/image";
import Link, { LinkProps } from "next/link";

import styles from "./styles.module.scss";
import {useRouter} from "next/navigation";

interface BackProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Back = (props: BackProps) => {
    const router = useRouter();
    
    const { className, ...otherProps } = props;

    return (
        <button className={styles.back} onClick={() => router.back()} {...otherProps}>
            <Image
                src="/images/competitors/exit.svg"
                alt="exit"
                width={16.42}
                height={16.42}
            />
        </button>
    );
};

export { Back };
