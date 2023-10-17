import style from "./styles.module.scss";

export const TITLE_CARDS = [
    { name: "дата" },
    { name: "Рабочее название проекта" },
    { name: "Адрес проекта" },
    { name: "Информация по конкурентам" },
    { name: "Итоговая квартирография" },
];

const ProfileQuartergraphyTableHead = () => {
    return (
        <div className={style.titleCards}>
            <ul className={style.list}>
                {TITLE_CARDS.map((item, id) => (
                    <li key={`${item.name}_${id}`} className={style.item}>
                        <h4 className={style.title}>{item.name}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { ProfileQuartergraphyTableHead };
