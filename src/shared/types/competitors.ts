export interface Competitors {
    main_competitors: Competitor[];
    other_competitors: Competitor[];
}

export interface Competitor {
    id: number;
    name: string;
    address: string;
    city_id: number;
    latitude: string;
    longitude: string;
    area: number;
    price: number;
    class: CompetitorClass;
    stage_id: number;
    developer: string;
    stage: CompetitorStage;
    distance: number;
    deals_count: number;
}

export type CompetitorClass = "business" | "comfort" | "standard";

export interface CompetitorStage {
    id: number;
    code: string;
    sort: number;
    name: string;
}
