import classNames from "classnames";

import { HTMLAttributes } from "react";
import { createPortal } from "react-dom";

import Image from "next/image";

import styles from "./styles.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
}

const Modal = (props: ModalProps) => {
    const { children, className, onClose } = props;

    return createPortal(
        <div className={classNames(styles.modal, className, "active")}>
            <div className={styles.container}>
                <div className={styles.modalContent}>{children}</div>
                <button className={styles.close} onClick={onClose}>
                    <Image src="/images/modal/close.svg" alt="close" width={14.9} height={14.9} />
                </button>
            </div>
        </div>,
        document.body
    );
};

export { Modal };
