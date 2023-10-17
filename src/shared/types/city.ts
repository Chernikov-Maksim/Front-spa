export interface City {
    id: number;
    name: string;
}

export interface CityWithDates extends City {
    created_at: string;
    updated_at: string;
}
