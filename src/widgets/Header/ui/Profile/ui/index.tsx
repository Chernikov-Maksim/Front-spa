"use client";

import Image from "next/image";
import Link from "next/link";

import { routes } from "@/shared/constants/routes";
import { useAppSelector } from "@/shared/store/hooks";

import styles from "@/widgets/Header/ui/styles.module.scss";

const Profile = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Link href={routes.profile} className={styles.profileButton}>
            <Image src="/images/header/user.svg" alt="user" width={24} height={24} />
            <span>{user?.name}</span>
        </Link>
    );
};

export { Profile };
