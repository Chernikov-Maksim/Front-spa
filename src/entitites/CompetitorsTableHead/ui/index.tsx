import { TABLE_TITLE } from "../model/constants";

import style from "./styles.module.scss";

export const CompetitorsTableHead = () => {
    return (
        <div className={style.tableTitle}>
            <ul className={style.list}>
                {TABLE_TITLE.map((item, id) => (
                    <li key={`${item.name}_${id}`} className={style.item}>
                        <h4 className={style.title}>{item.name}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
};
