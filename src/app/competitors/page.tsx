"use client";

import {useEffect, useMemo} from "react";

import {notFound, useRouter, useSearchParams} from "next/navigation";

import { getSearchParams } from "@/shared/lib/getSearchParams";
import { useAppSelector } from "@/shared/store/hooks";
import { PageLoader } from "@/widgets/PageLoader";

import { CompetitorsPage } from "@/screens/CompetitorsPage";
import { useGetCompetitorsQuery } from "@/screens/CompetitorsPage/api";
import { CompetitorsRequestArgs } from "@/screens/CompetitorsPage/api/types";
import { NotFoundPage } from "@/screens/NotFoundPage";
import queryString from "query-string";
import {MapProvider} from "@/features/Providers/MapProvider";

const Competitors = () => {
    const iSearchParams = useSearchParams();
    
    const searchParams = useMemo(() => {
        return queryString.parseUrl(`?${iSearchParams.toString()}`).query
    }, [])
    
    const newSearchParams = getSearchParams(searchParams) as CompetitorsRequestArgs;

    const {
        isLoading: competitorsLoading,
        isError: competitorsError,
        isSuccess: competitorsSuccess,
    } = useGetCompetitorsQuery(newSearchParams);

    const competitors = useAppSelector((state) => state.competitors.competitors);

    useEffect(() => {
        if (competitorsSuccess && competitors) {
            const main = (competitors.main_competitors.reduce((a, c) => {
                return a + c.deals_count
            }, 0) || 0);
            
            const other =(competitors.other_competitors.reduce((a, c) => {
                return a + c.deals_count
            }, 0) || 0);

            const competitorsLength =
                (competitors.other_competitors.length || 0) + (competitors.main_competitors.length || 0);

            
            if (competitorsLength < 5 || ((main + other) < 500)) {
                notFound();
            }
        }
    }, [competitorsSuccess, competitors]);

    if (competitorsLoading) {
        return <PageLoader />;
    }

    if (competitorsError || !competitors) {
        notFound();
    }

    return (
        <MapProvider apiUrl={process.env.YMAPS_API_URL as string}>
            <CompetitorsPage competitors={competitors} searchParams={newSearchParams} />
        </MapProvider>
    );
};

export default Competitors;
