"use client";

import { useCallback, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { routes } from "@/shared/constants/routes";
import { Quartergraphy } from "@/shared/types/quartergraphy";
import { BtnMarket } from "@/shared/ui/BtnMarket";
import { Export } from "@/shared/ui/Export";
import queryString from "query-string";

import { useExportCompetitorsMutation } from "@/screens/CompetitorsPage/api";

import style from "./styles.module.scss";

interface ProfileQuartergraphyCardProps {
    quartergraphy: Quartergraphy;
}

const ProfileQuartergraphyCard = ({ quartergraphy }: ProfileQuartergraphyCardProps) => {
    const router = useRouter();

    const [exportCompetitors, { data: exportCompetitorsData, isSuccess: exportCompetitorsSuccess }] =
        useExportCompetitorsMutation();

    const handleEditClick = useCallback(() => {
        router.push(
            `${routes.competitors}?${queryString.stringify({
                city_id: quartergraphy.city_id,
                address: quartergraphy.address,
                id: quartergraphy.id,
                cadastral_number: quartergraphy.cadastral_number,
                area: quartergraphy.area,
                price: quartergraphy.price,
                class: quartergraphy.class.toLowerCase(),
            })}`
        );
    }, [quartergraphy]);

    const handleMarketClick = useCallback(() => {
        router.push(
            `${routes.quartergraphy}?${queryString.stringify({
                city_id: quartergraphy.city_id,
                address: quartergraphy.address,
                id: quartergraphy.id,
                cadastral_number: quartergraphy.cadastral_number,
                area: quartergraphy.area,
                price: quartergraphy.price,
                class: quartergraphy.class.toLowerCase(),
                competitors: quartergraphy.competitors.map((competitor) => competitor.competitor.id),
                page: "market",
            })}`
        );
    }, [quartergraphy]);

    const handleGMKClick = useCallback(() => {
        router.push(
            `${routes.quartergraphy}?${queryString.stringify({
                city_id: quartergraphy.city_id,
                address: quartergraphy.address,
                id: quartergraphy.id,
                cadastral_number: quartergraphy.cadastral_number,
                area: quartergraphy.area,
                price: quartergraphy.price,
                class: quartergraphy.class.toLowerCase(),
                competitors: quartergraphy.competitors.map((competitor) => competitor.competitor.id),
                page: "gmk",
            })}`
        );
    }, [quartergraphy]);

    const handleDownloadClick = useCallback(() => {
        exportCompetitors({
            competitors_ids: quartergraphy.competitors.map((competitor) => competitor.competitor.id),
        });
    }, [quartergraphy.competitors]);

    useEffect(() => {
        if (exportCompetitorsSuccess && exportCompetitorsData) {
            const a = document.createElement("a");
            a.download = "Конкуренты.xlsx";
            a.href = `${process.env.BASE_API_URL}/${exportCompetitorsData.file_path}`;
            a.target = "_blank";
            a.click();
        }
    }, [exportCompetitorsSuccess, exportCompetitorsData]);

    return (
        <div className={style.card}>
            <div className={style.item}>
                <span>{new Date(quartergraphy.created_at).toLocaleDateString()}</span>
            </div>
            <div className={style.item}>
                <span>{quartergraphy.name}</span>
                <button className={style.edit}>
                    <Image src="/images/account/edit.svg" alt="edit" width={10} height={10} />
                </button>
            </div>
            <div className={style.item}>
                <span>{quartergraphy.address}</span>
            </div>
            <div className={style.item}>
                <div className={style.info}>
                    {quartergraphy.competitors.map((competitor) => (
                        <span key={competitor.competitor.id}>{competitor.competitor.name}</span>
                    ))}
                    {/*<button className={style.more}>*/}
                    {/*    <Image*/}
                    {/*        src="/images/account/expandMore.svg"*/}
                    {/*        alt="expandMore"*/}
                    {/*        width={9.69}*/}
                    {/*        height={5.64}*/}
                    {/*    />*/}
                    {/*</button>*/}
                </div>
                <div className={style.box}>
                    <button className={style.editSquare} onClick={handleEditClick}>
                        <div className={style.icon}>
                            <Image src="/images/account/editSquare.svg" alt="editSquare" width={15.09} height={15.08} />
                        </div>
                        <span>Редактировать</span>
                    </button>
                    <Export onClick={handleDownloadClick}>
                        <button onClick={handleDownloadClick} className={style.download}>
                            <div className={style.icon}>
                                <Image src="/images/account/download.svg" alt="download" width={11.17} height={12.17} />
                            </div>
                            <span>Скачать (.хls)</span>
                        </button>
                    </Export>
                </div>
            </div>
            <div className={style.item}>
                <BtnMarket onClick={handleMarketClick}>Рыночная</BtnMarket>
                <button className={style.btnRecomend} onClick={handleGMKClick}>
                    C рекоменациями GMK
                </button>
            </div>
        </div>
    );
};

export { ProfileQuartergraphyCard };
