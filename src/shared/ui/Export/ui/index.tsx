"use client";

import React from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

interface ICompetitorsExportProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
}

const Export = (props: ICompetitorsExportProps) => {
    const { onClick, children, ...rest } = props;

    return children ? (
        children
    ) : (
        <button {...rest} className={styles.root} onClick={onClick}>
            <Image
                src="/images/competitors/description.svg"
                alt="description"
                width={11.17}
                height={15.17}
            />
            <span>Скачать (.хls)</span>
        </button>
    );
};

export { Export };
