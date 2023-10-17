"use client";

import classNames from "classnames";

import { useCallback, useState } from "react";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProfileBases } from "@/entitites/ProfileBases";
import { ProfileQuartergraphy } from "@/entitites/ProfileQuartergraphy";
import { logout } from "@/features/AuthProvider/model/authSlice";
import { routes } from "@/shared/constants/routes";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { Base } from "@/shared/types/bases";
import { Quartergraphy } from "@/shared/types/quartergraphy";
import { Wrapper } from "@/shared/ui";
import { Back } from "@/shared/ui/Back";
import { BtnExit } from "@/shared/ui/BtnExit";
import { Container } from "@/shared/ui/Container";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { ProfilePageType, setActivePage } from "@/screens/ProfilePage/model/profileSlice";

import style from "./styles.module.scss";

interface ProfilePageProps {
    quartergraphy: Quartergraphy[];
    bases: Base[];
}

const ProfilePage = ({ quartergraphy, bases }: ProfilePageProps) => {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.profile.activePage);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = useCallback((type: ProfilePageType) => {
        dispatch(setActivePage(type));

        const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentSearchParams.set("page", type);

        const search = currentSearchParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`, { scroll: false });
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, []);

    return (
        <>
            <Header />

            <main>
                <section className={style.accoutn}>
                    <Wrapper>
                        <Container>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <div className={style.item}>
                                        <Back />
                                        <h2 className={style.title}>Личный кабинет</h2>
                                    </div>
                                    <BtnExit onClick={handleLogout}>
                                        <Image
                                            src="/images/account/logout.svg"
                                            alt="logout"
                                            width={18.96}
                                            height={18.96}
                                        />
                                        <span className={style.exit}>Выйти</span>
                                    </BtnExit>
                                </div>
                                <div className={style.column}>
                                    <div className={style.link}>
                                        <button
                                            className={classNames(activePage === "quartergraphy" && style.active)}
                                            onClick={() => handlePageChange("quartergraphy")}
                                        >
                                            <span>Квартирографии</span>
                                        </button>
                                        <button
                                            className={classNames(activePage === "bases" && style.active)}
                                            onClick={() => handlePageChange("bases")}
                                        >
                                            <span>Базы</span>
                                            <span>({bases.length})</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {activePage === "quartergraphy" && <ProfileQuartergraphy quartergraphy={quartergraphy} />}
                            {activePage === "bases" && <ProfileBases bases={bases} />}
                        </Container>
                    </Wrapper>
                </section>
            </main>

            <Footer />
        </>
    );
};

export { ProfilePage };
