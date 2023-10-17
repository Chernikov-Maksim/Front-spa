import Image from "next/image";

import styles from "./styles.module.scss";

const Version = () => {
    return (
        <div className={styles.version}>
            <Image
                src="/images/auth/bracketLeft.svg"
                alt="bracketLeft"
                width={10}
                height={20}
            />
            <span className={styles.ver}>ver 1.0</span>
            <Image
                src="/images/auth/bracketRight.svg"
                alt="bracketRight"
                width={10}
                height={20}
            />
        </div>
    );
};

export { Version };
