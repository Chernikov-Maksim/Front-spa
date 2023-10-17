import { Competitor, CompetitorClass } from "@/shared/types/competitors";

export type QuartergraphyType = "market" | "gmk" | "gmk_full";

export interface QuartergraphyResponse {
    id: number;
    user_id: number;
    name: string;
    data: QuartergraphyData;
    address: string;
    created_at: Date;
    updated_at: Date;
}

export interface QuartergraphyData {
    gmk: QuartergraphyGMK;
    market: QuartergraphyMarket;
    gmk_full: QuartergraphyGMKFull;
    avg_apt_area: number;
}

export interface QuartergraphyGMK {
    [key: string]: QuartergraphyGMKRoom;
}

export interface QuartergraphyGMKRoom {
    parts: QuartergraphyGMKRoomPart[];
    isEuro: boolean;
    rooms: number;
    base_rooms: number;
    calculated_coefficient_percent: number;
}

export interface QuartergraphyGMKRoomPart {
    to: number;
    from: number;
    market: boolean;
    recommend: boolean;
    absorption_coefficient: number;
    calculated_coefficient?: number;
    calculated_coefficient_percent?: number;
    k?: number;
    green_percent?: number;
}

export interface QuartergraphyGMKFull {
    [key: string]: QuartergraphyGMKFullRoomDefault | QuartergraphyGMKFullRoomStandart;
}

export interface QuartergraphyGMKFullRoomDefault {
    parts: QuartergraphyGMKFullRoomDefaultPart[];
    isEuro: boolean;
    rooms: number;
    sum_k: number;
    green_sum: number;
    have_blue: boolean;
    only_blue: boolean;
    sum_k_new: number;
    base_rooms: number;
    calculated_coefficient_percent: number;
}

export interface QuartergraphyGMKFullRoomDefaultPart {
    to: number;
    from: number;
    k_new?: number;
    market: boolean;
    recommend: boolean;
    absorption_coefficient: number;
    calculated_coefficient_percent: number;
    k?: number;
    green_percent?: number;
    calculated_coefficient?: number;
}

export interface QuartergraphyGMKFullRoomStandart {
    isEuro: boolean;
    parts: QuartergraphyGMKRoomPart[];
    rooms: number;
    green_sum: number;
    have_blue: boolean;
    only_blue: boolean;
    base_rooms: number;
    calculated_coefficient_percent: number;
    sum_k?: number;
    sum_k_new?: number;
}

export interface QuartergraphyMarket {
    [key: string]: QuartergraphyMarketRoom;
}

export interface QuartergraphyMarketRoom {
    parts: QuartergraphyMarketRoomPart[];
    isEuro: boolean;
    rooms: number;
    base_rooms: number;
    calculated_coefficient: number;
    calculated_coefficient_percent: number;
}

export interface QuartergraphyMarketRoomPart {
    to: number;
    from: number;
    absorption_coefficient: number;
    calculated_coefficient: number;
    calculated_coefficient_percent: number;
}

export interface ProfileQuartergraphy {
    address: string;
    created_at: Date;
    id: number;
    name: string;
    competitors: ProfileQuartergraphyCompetitors[];
}

export interface ProfileQuartergraphyCompetitors {
    competitor_id: number;
    apt_graph_id: number;
    created_at: Date;
    updated_at: Date;
    competitor: ProfileQuartergraphyCompetitor;
}

export interface ProfileQuartergraphyCompetitor {
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
    created_at: Date;
    updated_at: Date;
}

export interface BaseQuartergraphyItem {
    city: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}

export interface Quartergraphy {
    address: string;
    cadastral_number: string;
    created_at: Date;
    id: number;
    name: string;
    city_id: number;
    area: number;
    price: number;
    class: string;
    competitors: QuartergraphyCompetitors[];
}

export interface QuartergraphyCompetitors {
    competitor_id: number;
    apt_graph_id: number;
    created_at: Date;
    updated_at: Date;
    competitor: QuartergraphyCompetitor;
}

export interface QuartergraphyCompetitor {
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
    created_at: Date;
    updated_at: Date;
}
