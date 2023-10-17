"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import Image from "next/image";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { QuartergraphyTable } from "@/entitites/QuartergraphyTable";
import { useAppSelector } from "@/shared/store/hooks";
import {
    QuartergraphyData,
    QuartergraphyGMKFullRoomDefault,
    QuartergraphyGMKFullRoomStandart,
    QuartergraphyGMKRoom,
    QuartergraphyMarketRoom,
    QuartergraphyResponse,
    QuartergraphyType,
} from "@/shared/types/quartergraphy";
import { Wrapper } from "@/shared/ui";
import { DisplayText } from "@/shared/ui/DispalayText/ui";
import { Export } from "@/shared/ui/Export";
import { Header } from "@/widgets/Header";

import { useExportQuartergraphyMutation } from "@/screens/QuartergraphyPage/api";
import { CalculateQuartergraphyRequestArgs } from "@/screens/QuartergraphyPage/api/types";
import { setQuartergraphyType } from "@/screens/QuartergraphyPage/model/quartergraphySlice";

import style from "./styles.module.scss";
import {Back} from "@/shared/ui/Back";

interface QuartergraphyPageProps {
    searchParams: CalculateQuartergraphyRequestArgs;
    quartergraphy: QuartergraphyResponse;
}

const QuartergraphyPage = ({ searchParams, quartergraphy }: QuartergraphyPageProps) => {
    const { data: quartergraphyData, name, id, address, user_id } = quartergraphy;
    const { avg_apt_area, ...quartergraphyDataRest } = quartergraphyData;

    const data = JSON.parse(JSON.stringify(quartergraphyDataRest)) as Omit<QuartergraphyData, "avg_apt_area">;

    const dispatch = useDispatch();
    const hooksSearchParams = useSearchParams() as ReadonlyURLSearchParams;
    const router = useRouter();
    const pathname = usePathname();

    const [
        quartergraphyExport,
        { data: quartergraphyExportData, isLoading: quartergraphyExportLoading, isSuccess: quartergraphyExportSuccess },
    ] = useExportQuartergraphyMutation();

    const typeQuartergraphy = useAppSelector((state) => state.quartergraphy.type);

    useEffect(() => {
        if (quartergraphyExportSuccess && quartergraphyExportData) {
            const a = document.createElement("a");
            a.download = "Квартирография.xlsx";
            a.href = `${process.env.BASE_API_URL}/${quartergraphyExportData.file_path}`;
            a.target = "_blank";
            a.click();
        }
    }, [quartergraphyExportSuccess, quartergraphyExportData]);

    const filteredData = useMemo(() => {
        const obj: {
            [key: string]:
                | QuartergraphyMarketRoom[]
                | QuartergraphyGMKRoom[]
                | QuartergraphyGMKFullRoomDefault[]
                | QuartergraphyGMKFullRoomStandart[];
        } = {};

        Object.entries(data[typeQuartergraphy]).forEach(([roomName, room]) => {
            const count = roomName.split("_")[1];

            room.isEuro = roomName?.split("_")?.[2] === "plus";

            if (obj[count]) {
                if (room.parts.length) {
                    obj[count] = [...obj[count], room];
                }
            } else {
                if (room.parts.length) {
                    obj[count] = [room];
                }
            }
        });

        return obj;
    }, [data, typeQuartergraphy]);

    const handleSetQuartergraphyType = useCallback((type: QuartergraphyType) => {
        dispatch(setQuartergraphyType(type));

        const currentSearchParams = new URLSearchParams(Array.from(hooksSearchParams.entries()));
        currentSearchParams.set("page", type);

        const search = currentSearchParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`, { scroll: false });
    }, []);

    const handleDownloadClick = useCallback(() => {
        quartergraphyExport({
            type: typeQuartergraphy,
            apt_graph_id: id,
        });
    }, [typeQuartergraphy, id]);

    return (
        <>
            <Header />

            <main>
                <section className={style.marketCartography}>
                    <Wrapper>
                        <div className={style.container}>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <div className={style.item}>
                                        {typeQuartergraphy === "market" && (
                                            <Back/>
                                        )}
                                        {typeQuartergraphy === "gmk" && (
                                            <button
                                                className={style.exit}
                                                onClick={() => handleSetQuartergraphyType("market")}
                                            >
                                                <Image
                                                    src="/images/competitors/exit.svg"
                                                    alt="exit"
                                                    width={16.42}
                                                    height={16.42}
                                                />
                                            </button>
                                        )}
                                        {typeQuartergraphy === "gmk_full" && (
                                            <button
                                                className={style.exit}
                                                onClick={() => handleSetQuartergraphyType("gmk")}
                                            >
                                                <Image
                                                    src="/images/competitors/exit.svg"
                                                    alt="exit"
                                                    width={16.42}
                                                    height={16.42}
                                                />
                                            </button>
                                        )}
                                        <h2 className={style.title}>
                                            <span>
                                                {typeQuartergraphy === "market" && "Рыночная квартирография"}
                                                {typeQuartergraphy === "gmk" && "Квартирография с рекомендациями GMK"}
                                                {typeQuartergraphy === "gmk_full" && "Квартирография GMK"}—
                                            </span>
                                            <span>«{name}»</span>
                                        </h2>
                                        <button type="button" className={style.edit}>
                                            <Image
                                                src="/images/marketСartography/edit.svg"
                                                alt="edit"
                                                width={17.68}
                                                height={18}
                                            />
                                        </button>
                                    </div>
                                    <div className={style.item}>
                                        <DisplayText onClick={() => handleSetQuartergraphyType("gmk_full")} />
                                    </div>
                                    <div className={style.item}>
                                        <span>
                                            {String(avg_apt_area).replace(".", ",")} м<sup>2</sup>
                                        </span>
                                        <span>— средняя площадь квартир</span>
                                    </div>
                                </div>
                                <div className={style.column}>
                                    {typeQuartergraphy === "market" && (
                                        <button
                                            className={style.nextButton}
                                            onClick={() => handleSetQuartergraphyType("gmk")}
                                        >
                                            Показать рекомендации GMK
                                        </button>
                                    )}
                                    {typeQuartergraphy === "gmk" && (
                                        <div className={style.blockBtn}>
                                            <button
                                                onClick={() => handleSetQuartergraphyType("market")}
                                                type="button"
                                                className={style.btnBack}
                                            >
                                                <Image
                                                    className={style.expand}
                                                    src="/images/reference/back.svg"
                                                    alt="back"
                                                    width={8.3}
                                                    height={12.9}
                                                />
                                                Назад
                                            </button>
                                            <button onClick={() => handleSetQuartergraphyType("gmk_full")}>
                                                Принять рекомендации
                                            </button>
                                        </div>
                                    )}
                                    {typeQuartergraphy === "gmk_full" && (
                                        <div className={style.blockBtn}>
                                            <button
                                                onClick={() => handleSetQuartergraphyType("gmk")}
                                                type="button"
                                                className={style.btnBack}
                                            >
                                                <Image
                                                    className={style.expand}
                                                    src="/images/reference/back.svg"
                                                    alt="back"
                                                    width={8.3}
                                                    height={12.9}
                                                />
                                                Назад
                                            </button>
                                        </div>
                                    )}
                                    <div className={style.box}>
                                        <span className={style.market}>
                                            {typeQuartergraphy === "market" && (
                                                <>
                                                    Рыночная <br /> квартирография
                                                </>
                                            )}
                                            {typeQuartergraphy === "gmk" && (
                                                <>
                                                    Квартирография <br /> c экспертной оценкой GMK
                                                </>
                                            )}
                                            {typeQuartergraphy === "gmk_full" && (
                                                <>
                                                    Эталонная <br /> квартирография
                                                </>
                                            )}
                                        </span>
                                        <Export onClick={handleDownloadClick} />
                                    </div>
                                </div>
                            </div>
                            <div className={style.rowCards}>
                                {typeQuartergraphy === "gmk" && (
                                    <div className={style.explanation}>
                                        <div className={style.item}>
                                            <span className={style.circle}></span>
                                            <span className={style.text}>— Не входящие в квартирографию GMK</span>
                                        </div>
                                        <div className={style.item}>
                                            <span className={style.circle}></span>
                                            <span className={style.text}>— Входит в эталонную квартирографию GMK</span>
                                        </div>
                                        <div className={style.item}>
                                            <span className={style.circle}></span>
                                            <span className={style.text}>
                                                — Рекомендуемые к проектированию, но не входящие в рыночную
                                                квартирографию
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className={style.titleType}>
                                    <span className={style.type}>Доля типа</span>
                                    <span className={style.type}>Типы квартир</span>
                                </div>
                                <QuartergraphyTable data={filteredData} typeQuartergraphy={typeQuartergraphy} />
                            </div>
                        </div>
                    </Wrapper>
                </section>
            </main>
        </>
    );
};

export { QuartergraphyPage };
