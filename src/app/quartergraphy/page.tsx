"use client";

import {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";

import {getSearchParams} from "@/shared/lib/getSearchParams";
import {QuartergraphyType} from "@/shared/types/quartergraphy";
import {PageLoader} from "@/widgets/PageLoader";

import {NotFoundPage} from "@/screens/NotFoundPage";
import {QuartergraphyPage} from "@/screens/QuartergraphyPage";
import {useCalculateQuartergraphyQuery} from "@/screens/QuartergraphyPage/api";
import {CalculateQuartergraphyRequestArgs} from "@/screens/QuartergraphyPage/api/types";
import {setQuartergraphyType} from "@/screens/QuartergraphyPage/model/quartergraphySlice";
import {notFound, usePathname, useSearchParams} from "next/navigation";
import queryString from "query-string";


const Quartergraphy = () => {
    const iSearchParams = useSearchParams();
    
    const searchParams = useMemo(() => {
        return queryString.parseUrl(`?${iSearchParams.toString()}`).query
    }, [])
    
    const newSearchParams = getSearchParams(searchParams) as CalculateQuartergraphyRequestArgs & {
        page?: QuartergraphyType
    };
    const dispatch = useDispatch();
    
    const {
        data: quartergraphyData,
        isLoading: quartergraphyLoading,
        isError: quartergraphyError,
        isSuccess: quartergraphySuccess,
    } = useCalculateQuartergraphyQuery(newSearchParams);
    
    useEffect(() => {
        if (quartergraphySuccess && quartergraphyData) {
            if (searchParams.page) {
                // @ts-ignore
                dispatch(setQuartergraphyType(searchParams.page));
            }
        }
    }, [quartergraphySuccess, quartergraphyData]);
    
    if (quartergraphyLoading) {
        return <PageLoader/>;
    }
    
    if (quartergraphyError || !quartergraphyData) {
        notFound();
    }
    
    return <QuartergraphyPage searchParams={newSearchParams} quartergraphy={quartergraphyData}/>;
};

export default Quartergraphy;
