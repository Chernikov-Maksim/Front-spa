import { SearchForm } from "@/features/MainPageSearchForm";
import { routes } from "@/shared/constants/routes";
import { BtnInfo, Version, Wrapper } from "@/shared/ui";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import styles from "./styles.module.scss";

const MainPage = () => {
    return (
        <>
            <Header />

            <main>
                <section className={styles.mainPage}>
                    <Wrapper className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles.za}>
                                <div className={styles.za_container}>
                                    <div>
                                        <h1 className={styles.title}>
                                            <span>Сервис разработки</span>
                                            <span>квартирографии</span>
                                        </h1>
                                        <div className={styles.subTitle}>
                                            <p>
                                                Для начала работы и поиска
                                                конкурентов введите адрес
                                            </p>
                                            <p>
                                                или кадастровый номер участка и
                                                параметры будущего проекта
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <SearchForm />
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <Version />
                                    <BtnInfo href={routes.main} />
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </section>
            </main>

            <Footer />
        </>
    );
};

export { MainPage };
