export const getSearchParams = (searchParams: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(searchParams).map(([paramKey, paramValue]) => {
            if (["area", "price", "city_id", "id"].includes(paramKey)) {
                return [paramKey, Number(paramValue)];
            }
            
            if (paramKey === "competitors") {
                return [paramKey, paramValue.map(Number)];
            }

            return [paramKey, paramValue];
        })
    );
};
