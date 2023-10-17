"use client";

import { memo, ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useGetCurrentUserQuery } from "@/features/AuthProvider/api";
import { privateRoutes, privateRoutesForUser, routes } from "@/shared/constants/routes";
import { PageLoader } from "@/widgets/PageLoader";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = memo(({ children }: AuthProviderProps) => {
    const router = useRouter();
    const pathname = usePathname() || "";

    const { isLoading: authLoading, isError: authError, isSuccess: authSuccess } = useGetCurrentUserQuery();

    if (authError && privateRoutes.includes(pathname)) {
        router.push(routes.login);

        return <PageLoader />;
    }

    if (authSuccess && privateRoutesForUser.includes(pathname)) {
        router.push(routes.main);

        return <PageLoader />;
    }

    if (authLoading) {
        return <PageLoader />;
    }

    return children;
});

export { AuthProvider };
