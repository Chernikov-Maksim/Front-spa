export type CompetitorsClass = "business" | "comfort" | "standard";

export interface CompetitorsRequestArgs {
    id: number;
    competitors: number[];
    name: string;
    class: CompetitorsClass;
    address: string;
    cadastral_number: string;
    area: number;
    price: number;
    city_id: number;
}
