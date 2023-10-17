import Image from "next/image";
import Link from "next/link";

import { Menu } from "./Menu";
import { Profile } from "./Profile";
import { routes } from "@/shared/constants/routes";
import { Wrapper } from "@/shared/ui";

import styles from "./styles.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <Wrapper>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Link href={routes.main}>
                            <Image
                                src="/images/header/logo.svg"
                                alt="logo"
                                width={317}
                                height={24}
                            />
                        </Link>
                    </div>
                    <Menu />
                    <Profile />
                </div>
            </Wrapper>
        </header>
    );
};

export { Header };
