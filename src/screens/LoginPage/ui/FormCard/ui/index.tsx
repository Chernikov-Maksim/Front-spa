import Image from "next/image";

import { AuthForm } from "@/features/AuthForm";

import style from "./styles.module.scss";

const FormCard = () => {
    return (
        <div className={style.authForm}>
            <div className={style.container}>
                <h2 className={style.title}>
                    <span>Добро пожаловать</span>
                    <span>в Квартирографию!</span>
                </h2>
                <p className={style.subTitle}>
                    Для начала работы с сервисом необходимо авторизироваться
                </p>
                <AuthForm />
                <div className={style.help}>
                    <span className={style.text}>
                        По всем вопросам обращаться:
                    </span>
                    <div className={style.whatsApp}>
                        <a className={style.phone} href="tel:+7 922 476-87-75">
                            +7 922 476-87-75
                        </a>
                        <a
                            target="_blank"
                            href="https://wa.me/79205468039?text=Здравствуйте%2C+у+меня+есть+вопрос"
                        >
                            <Image
                                src="/images/auth/whatsApp.svg"
                                alt="whatsApp"
                                width={36}
                                height={36}
                            />
                        </a>
                    </div>
                    <div className={style.manager}>
                        <span className={style.nameManager}>
                            Юлия Садейская
                        </span>
                        <span> — Менеджер проекта</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FormCard };
