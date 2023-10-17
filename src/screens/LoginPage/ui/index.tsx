import Image from "next/image";

import { FormCard } from "./FormCard";
import { routes } from "@/shared/constants/routes";
import { BtnInfo } from "@/shared/ui/BtnInfo";
import { Version } from "@/shared/ui/Version";

import style from "./styles.module.scss";

const LoginPage = () => {
    return (
        <section className={style.auth}>
            <div className={style.column}>
                <Image
                    className={style.leftImage}
                    src="/images/auth/bg.jpg"
                    alt="Фон"
                    width={960}
                    height={1200}
                    priority
                />
            </div>
            <div className={style.container}>
                <div className={style.logoWrapper}>
                    <div className={style.logo}>
                        <Image src="/images/auth/logo.svg" alt="Logo" width={422.66} height={32} priority />
                    </div>
                    <FormCard />
                </div>
                <div className={style.bottomInfo}>
                    <BtnInfo href={routes.main} />
                    <Version />
                </div>
            </div>
        </section>
    );
};

export { LoginPage };
