import Image from "next/image";

import { Wrapper } from "@/shared/ui";

import styles from "./styles.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Wrapper>
                <div className={styles.container}>
                    <div className={styles.company}>
                        <span>ООО «Маркетинг-Консультант», 1999—2023</span>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.questions}>
                            <span className={styles.questionsText}>
                                По всем вопросам обращаться:
                            </span>
                            <a
                                className={styles.phone}
                                href="tel:+7 922 476-87-75"
                            >
                                +7 922 476-87-75
                            </a>
                            <a
                                className={styles.contactWhatsApp}
                                target="_blank"
                                href="https://wa.me/79205468039?text=Здравствуйте%2C+у+меня+есть+вопрос"
                            >
                                <Image
                                    className={styles.whatsApp}
                                    src="/images/footer/whatsApp.svg"
                                    alt="whatsApp"
                                    width={19.41}
                                    height={19.5}
                                />
                            </a>
                        </div>
                        <span className={styles.manager}>
                            Юлия Садейская — Менеджер проекта
                        </span>
                    </div>
                </div>
            </Wrapper>
        </footer>
    );
};

export { Footer };
