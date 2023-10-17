import styles from "./styles.module.scss";

const ItemInfo = () => (
    <p className={styles.procent}>
        <span>± 20%</span>
        <span>
            — к объему жилой площади и стоимости за м<sup>2</sup>
        </span>
    </p>
);

export { ItemInfo };
