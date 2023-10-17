import { routes } from "@/shared/constants/routes";

export const paths: Record<
    string,
    { title: string; activePaths: Array<ValueOf<typeof routes>> }
> = {
    [routes.main]: {
        title: "Поиск",
        activePaths: [routes.main, routes.competitors, routes.quartergraphy],
    },
    [routes.competitors]: {
        title: "Конкуренты",
        activePaths: [routes.competitors, routes.quartergraphy],
    },
    [routes.quartergraphy]: {
        title: "Квартирография",
        activePaths: [routes.quartergraphy],
    },
};
