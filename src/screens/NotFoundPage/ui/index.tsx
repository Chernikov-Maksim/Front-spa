import Link from "next/link";

import { Animation } from "./Animatioin";
import { routes } from "@/shared/constants/routes";
import { Wrapper } from "@/shared/ui";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import styles from "./styles.module.scss";

const NotFoundPage = () => {
    return (
        <>
            <Header />

            <main>
                <section className={styles.notFound}>
                    <Wrapper className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles.row}>
                                <Animation />
                                <h2 className={styles.title}>
                                    К сожалению, по вашему запросу ничего не
                                    найдено
                                </h2>
                                <p className={styles.subTitle}>
                                    Возможно в вашем городе пока не работает
                                    Квартирография.Мы делаем всё возможное,
                                    чтобы в ближайшее время это изменилось!
                                </p>
                                <Link
                                    href={routes.main}
                                    className={styles.return}
                                >
                                    Вернуться на главную
                                </Link>
                            </div>
                        </div>
                    </Wrapper>
                </section>
            </main>

            <Footer />
        </>
    );
};

export { NotFoundPage };
