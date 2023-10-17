"use client";

import classNames from "classnames";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { paths } from "../config";
import { routes } from "@/shared/constants/routes";

import styles from "./styles.module.scss";

const Menu = () => {
    const pathName = usePathname();

    if (![routes.quartergraphy, routes.main, routes.competitors].includes(pathName)) {
        return null;
    }

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                {Object.entries(paths).map(([href, { title, activePaths }]) => (
                    <li key={href} className={styles.item}>
                        <Link
                            href={href}
                            className={classNames(styles.link, activePaths.includes(pathName) && styles.linkActive)}
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export { Menu };
