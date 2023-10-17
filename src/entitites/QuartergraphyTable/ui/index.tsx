"use client";

import classNames from "classnames";

import {
    QuartergraphyGMKFullRoomDefault,
    QuartergraphyGMKFullRoomStandart,
    QuartergraphyGMKRoom,
    QuartergraphyMarketRoom,
    QuartergraphyType,
} from "@/shared/types/quartergraphy";

import style from "./styles.module.scss";

interface QuartergraphyTableProps {
    data: Record<
        string,
        | QuartergraphyGMKRoom[]
        | QuartergraphyGMKFullRoomDefault[]
        | QuartergraphyGMKFullRoomStandart[]
        | QuartergraphyMarketRoom[]
    >;
    typeQuartergraphy: QuartergraphyType;
}

const QuartergraphyTable = ({ data, typeQuartergraphy }: QuartergraphyTableProps) => {
    return (
        <div className={style.containerCard}>
            {Object.entries(data).map((item, index) => {
                const [type, apts] = item;

                let fraction = apts.reduce((acc, curr) => acc + curr.calculated_coefficient_percent, 0).toFixed(1);

                if (fraction[fraction.length - 1] === "0") {
                    fraction = fraction.slice(0, -2);
                }

                return (
                    <div key={index} className={style.column}>
                        <div className={style.typeShare}>
                            <div className={style.fraction}>
                                <span>{String(fraction).replace(".", ",")}%</span>
                                <span>от 100%</span>
                                <span
                                    className={style.fractionProgress}
                                    style={{
                                        height: `${fraction}%`,
                                    }}
                                ></span>
                            </div>
                        </div>
                        {apts.map((apt, index) => {
                            const maxPartPercent =
                                apt.parts
                                    ?.sort(
                                        (a, b) =>
                                            (a.calculated_coefficient_percent || 0) -
                                            (b.calculated_coefficient_percent || 0)
                                    )
                                    ?.at(-1)?.calculated_coefficient_percent || 0;

                            return (
                                <div key={index} className={style.apartments}>
                                    <div className={style.card}>
                                        <div className={style.box}>
                                            <div className={style.visibility}>
                                                {apt.isEuro ? (
                                                    <>
                                                        <span>
                                                            {type === "0" ? "Студии" : `${type}-комнатные`}
                                                            <span className={style.euro}>ЕВРО</span>—
                                                        </span>
                                                        <span className={style.watch}>
                                                            Квартиры без внутренних перегородок между кухней и жилой
                                                            комнатой.
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>
                                                            {type === "0" ? "Студии" : `${type}-комнатные`}
                                                            <span className={style.euro}>КЛАССИКА</span>—
                                                        </span>
                                                        <span className={style.watch}>
                                                            Квартиры без внутренних перегородок между кухней и жилой
                                                            комнатой.
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <span>{String(apt.calculated_coefficient_percent).replace(".", ",")}%</span>
                                        </div>
                                        <div className={style.title}>
                                            <span>
                                                Диапазон, м<sup>2</sup>
                                            </span>
                                            <span>Доля диапазона</span>
                                        </div>
                                        {apt.parts.sort((a, b) => a.from - b.from).map((part, index) => {
                                            const percent =
                                                ((part.calculated_coefficient_percent || maxPartPercent) /
                                                    maxPartPercent) *
                                                100;

                                            let className = "";
                                            let styleObj = {};

                                            if (typeQuartergraphy === "gmk") {
                                                if ("market" in part) {
                                                    className = classNames(
                                                        part.market && part.recommend && style.color_gmk,
                                                        !part.market && part.recommend && style.color_recommend,
                                                        part.market && !part.recommend && style.color_not_gmk
                                                    );
                                                }
                                            } else {
                                                styleObj = {
                                                    background: `rgba(47, 176, 249, ${percent / 100})`,
                                                };
                                            }

                                            return (
                                                <div key={index} className={style.item}>
                                                    <span>
                                                        {part.from} — {part.to}
                                                    </span>
                                                    {typeQuartergraphy === "gmk" ? (
                                                        <span className={className}>
                                                            <span
                                                                className={style.itemProgress}
                                                                style={{
                                                                    width: `${percent}%`,
                                                                    ...styleObj,
                                                                }}
                                                            ></span>
                                                            {"market" in part && !part.market && part.recommend ? (
                                                                <span className={style.itemText}>Рекомендуем</span>
                                                            ) : (
                                                                <span className={style.itemText}>
                                                                    {String(
                                                                        part.calculated_coefficient_percent
                                                                    ).replace(".", ",")}
                                                                    %
                                                                </span>
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span className={className}>
                                                            <span
                                                                className={style.itemProgress}
                                                                style={{
                                                                    width: `${percent}%`,
                                                                    ...styleObj,
                                                                }}
                                                            ></span>
                                                            <span className={style.itemText}>
                                                                {String(part.calculated_coefficient_percent).replace(
                                                                    ".",
                                                                    ","
                                                                )}
                                                                %
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export { QuartergraphyTable };
