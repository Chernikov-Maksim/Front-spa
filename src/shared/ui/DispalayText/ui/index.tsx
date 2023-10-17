"use client";

import classNames from "classnames";

import { useState } from "react";

import Image from "next/image";

import style from "./styles.module.scss";

export const DisplayText = ({onClick}: {onClick: () => void}) => {
    const [expanded, setExpanded] = useState(false);

    const handleOpenClick = () => {
        setExpanded(true);
    };

    const handleCloseClick = () => {
        setExpanded(false);
    };

    return (
        <>
            <div className={style.subTitle}>
                <p
                    className={classNames(
                        style.baseText,
                        expanded ? style.expandedText : style.text
                    )}
                >
                    Полученная рыночная квартирография сформирована по
                    методологии GMK на основе анализа конкурентов, с учетом
                    спроса, текущего предложения и скорости выбытия. Рыночная
                    квартирография может быть использована для дальнейшей работы
                    по проекту в текущем виде или скорректирована, исходя из
                    функциональности и эргономичности планировочных решений в
                    заданных площадях согласно рекомендаций
                    <span className={style.displayText} onClick={onClick}>
                        <span className={style.vieving}>
                            эталонной квартирографии GMK:
                        </span>
                        <span className={style.invisible}>
                            Перечень рекомендуемых диапазонов для каждого типа
                            квартир, учитывающих особенности каждого помещения и
                            соотношение жилой и нежилой площади в квартире.
                        </span>
                    </span>
                    <button
                        type="button"
                        className={style.btnClose}
                        onClick={handleCloseClick}
                    >
                        <Image
                            className={style.expand}
                            src="/images/marketСartography/expand.svg"
                            alt="expand"
                            width={9.42}
                            height={5.18}
                        />
                    </button>
                </p>
            </div>
            {!expanded && (
                <button
                    type="button"
                    className={style.btnOpen}
                    onClick={handleOpenClick}
                >
                    <Image
                        className={style.expand}
                        src="/images/marketСartography/expand.svg"
                        alt="expand"
                        width={9.42}
                        height={5.18}
                    />
                </button>
            )}
        </>
    );
};
