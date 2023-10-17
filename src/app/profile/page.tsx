"use client";

import { useEffect } from "react";

import {notFound, useSearchParams} from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { PageLoader } from "@/widgets/PageLoader";

import { NotFoundPage } from "@/screens/NotFoundPage";
import { ProfilePage } from "@/screens/ProfilePage";
import { useGetProfileBasesQuery, useGetProfileQuartergraphyQuery } from "@/screens/ProfilePage/api";
import { ProfilePageType, setActivePage } from "@/screens/ProfilePage/model/profileSlice";

const Profile = () => {
    const { isLoading: profileQuartergraphyLoading, isError: profileQuartergraphyError } =
        useGetProfileQuartergraphyQuery();
    const { isLoading: profileBasesLoading, isError: profileBasesError } = useGetProfileBasesQuery();

    const { bases, quartergraphy } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();

    useEffect(() => {
        const type = searchParams.get("page") as ProfilePageType;

        if (type) {
            dispatch(setActivePage(type));
        }
    }, []);

    if (profileQuartergraphyLoading || profileBasesLoading) {
        return <PageLoader />;
    }

    if (profileQuartergraphyError || profileBasesError || !quartergraphy || !bases) {
        notFound();
    }

    return <ProfilePage quartergraphy={quartergraphy} bases={bases} />;
};

export default Profile;
