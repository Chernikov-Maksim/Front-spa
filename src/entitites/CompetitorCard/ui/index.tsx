import { ReactNode } from "react";
import { numericFormatter } from "react-number-format";

import Image from "next/image";

import { classes } from "@/shared/constants/competitors";
import { Competitor, CompetitorClass } from "@/shared/types/competitors";

import styles from "./styles.module.scss";

interface CompetitorsCardProps {
    competitor: Competitor;
    buttonNode: ReactNode;
}

const CompetitorCard = (props: CompetitorsCardProps) => {
    const { competitor, buttonNode } = props;

    let distance = String(competitor.distance);

    if (distance[0] === "0") {
        distance =
            numericFormatter(String(+distance * 1000), {
                valueIsNumericString: true,
                thousandSeparator: ",",
                decimalSeparator: ",",
                decimalScale: 3,
            }) + " м";
    } else {
        distance =
            numericFormatter(distance, {
                valueIsNumericString: true,
                thousandSeparator: ",",
                decimalSeparator: ",",
                decimalScale: 1,
            }) + " км";
    }

    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <div className={styles.item}>
                    <div className={styles.list}>
                        <span>{competitor.name}</span>
                    </div>
                    <div className={styles.list}>
                        <span>{competitor.developer}</span>
                    </div>
                    <div className={styles.list}>
                        <span>{competitor.address}</span>
                        <div className={styles.column}>
                            <Image
                                className={styles.flags}
                                src="/images/competitors/flags.svg"
                                alt="flags"
                                width={11.17}
                                height={13.37}
                            />
                            <span className={styles.distance}>{distance}</span>
                            <span className={styles.text}>от вашего объекта</span>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <span>{competitor.stage.name}</span>
                    </div>
                    <div className={styles.list}>
                        <span>{classes[competitor.class.toLowerCase() as CompetitorClass]}</span>
                    </div>
                    <div className={styles.list}>
                        <span>
                            {numericFormatter(String(competitor.area), {
                                valueIsNumericString: true,
                                suffix: " м²",
                                thousandSeparator: " ",
                                decimalScale: 0,
                            })}
                        </span>
                    </div>
                    <div className={styles.list}>
                        <span>
                            {numericFormatter(String(competitor.price), {
                                valueIsNumericString: true,
                                suffix: " ₽",
                                thousandSeparator: " ",
                                decimalScale: 0,
                            })}
                        </span>
                    </div>
                </div>
            </div>
            {buttonNode}
        </div>
    );
};

export { CompetitorCard };
