"use client";

import { RefObject, useCallback, useState } from "react";

import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface usePaginationConfig {
    searchPageText: string;
    itemsPerPage: number;
    scrollTo?: RefObject<HTMLElement>;
}

const usePagination = (config: usePaginationConfig) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams() as ReadonlyURLSearchParams;

    const [activePage, setActivePage] = useState<number>(Number(searchParams.get(config.searchPageText)) || 1);
    const [offset, setOffset] = useState<number>(
        (Number(searchParams.get(config.searchPageText) || 1) - 1) * config.itemsPerPage
    );

    const handlePageChange = useCallback(
        (page: number) => {
            const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

            currentSearchParams.set(config.searchPageText, String(page));

            setActivePage(page);
            setOffset((page - 1) * config.itemsPerPage);

            const search = currentSearchParams.toString();
            const query = search ? `?${search}` : "";

            router.replace(`${pathname}${query}`, { scroll: false });

            config.scrollTo?.current?.scrollIntoView({ behavior: "smooth" });
        },
        [router, pathname, searchParams]
    );

    const handleMoreClick = useCallback(() => {
        const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

        currentSearchParams.set(config.searchPageText, String(activePage + 1));

        setActivePage(activePage + 1);
        setOffset((activePage - 1) * config.itemsPerPage);

        const search = currentSearchParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`, { scroll: false });
    }, [pathname, searchParams, router, activePage]);

    return {
        offset,
        activePage,
        handleMoreClick,
        handlePageChange,
    };
};

export { usePagination };
