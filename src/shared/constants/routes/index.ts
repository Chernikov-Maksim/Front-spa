export const routes = {
    api: {
        login: "/auth/login",
        user: "/users/current",
        cities: "/cities",
        competitors: "/competitors",
        calculate: "/calculate",
        competitorsExport: "/competitors-export",
        quartergraphyExport: "/apt-graph-export",
        profileQuartergraphy: "/aptgraph/all",
        quartergraphy: "/aptgraph",
        bases: "/import-stat/all",
        base: "/import-stat",
        refresh: "/auth/refresh",
        uploadBase: "/import/upload",
    },
    dadata: {
        suggestions: "/suggestions/api/4_1/rs/suggest/address",
    },
    endpoints: {
        city: "/city",
    },
    main: "/",
    quartergraphy: "/quartergraphy",
    profile: "/profile",
    competitors: "/competitors",
    login: "/login",
};

export const privateRoutesForUser = ["/login"];

export const privateRoutes = ["/", "/competitors", "/quartergraphy", "/profile"];
