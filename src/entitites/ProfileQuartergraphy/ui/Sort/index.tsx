"use client";

import classNames from "classnames";

import { useState } from "react";

import Image from "next/image";

import style from "./styles.module.scss";
import {ProfileSortType} from "@/screens/ProfilePage/model/profileSlice";

interface ProfileQuartergraphySortProps {
    title: string;
    items: Array<{name: string, value: ProfileSortType}>
    onSelect: (value: ProfileSortType) => void;
}

const ProfileQuartergraphySort = ({items, title, onSelect}: ProfileQuartergraphySortProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className={style.sort}>
            <span>Сортировка:</span>
            <span>{title}</span>
            <div className={style.box}>
                <button
                    className={classNames(style.sortCards, isMenuOpen && style.sortCardsActive)}
                    onClick={toggleMenu}
                >
                    <Image src="/images/account/sort.svg" alt="sort" width={13.58} height={8.9} />
                </button>
                {isMenuOpen && (
                    <div className={style.sortMenu}>
                        <div className={style.menu}>
                            {items.map(({name, value}) => (
                                <span className={style.new} onClick={() => onSelect(value)}>{name}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ProfileQuartergraphySort };
