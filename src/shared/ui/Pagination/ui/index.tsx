"use client";

import React, { useMemo } from "react";
import {
    default as ReactJsPagination,
    ReactJsPaginationProps,
} from "react-js-pagination";

import Image from "next/image";

import styles from "./styles.module.scss";
import "@/shared/styles/blocks/pagination.scss";

interface IPaginationProps extends ReactJsPaginationProps {
    itemsCountPerPage?: number;
    onMoreClick?: () => void;
}

const Pagination = (props: IPaginationProps) => {
    const {
        innerClass = "pagination-list",
        itemClass = "pagination-item",
        linkClass = "pagination-link",
        itemClassLast = "pagination-last",
        itemClassFirst = "pagination-first",
        activeLinkClass = "pagination-active",
        prevPageText = (
            <Image
                src="/images/pagination/left.svg"
                alt="left"
                width={6.71}
                height={11.31}
            />
        ),
        nextPageText = (
            <Image
                src="/images/pagination/right.svg"
                alt="right"
                width={6.71}
                height={11.31}
            />
        ),
        firstPageText = "В начало",
        lastPageText = "В конец",
        activePage,
        totalItemsCount,
        itemsCountPerPage = 10,
        onMoreClick,
        ...rest
    } = props;

    const lastPage = useMemo(
        () => Math.ceil(totalItemsCount / itemsCountPerPage),
        [totalItemsCount, itemsCountPerPage]
    );

    if (lastPage === 1 || totalItemsCount === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.show}>
                <span>Показано</span>
                <span>
                    {activePage < lastPage
                        ? activePage * itemsCountPerPage
                        : totalItemsCount}
                </span>
                <span>из</span>
                <span>{totalItemsCount}</span>
            </div>
            <div className={styles.progressBar}>
                <span
                    style={{
                        width: `${
                            ((activePage * itemsCountPerPage) /
                                totalItemsCount) *
                            100
                        }%`,
                    }}
                ></span>
            </div>
            {activePage < lastPage && (
                <div className={styles.downloadMore}>
                    <button onClick={onMoreClick} className={styles.more}>
                        Загрузить ещё
                    </button>
                </div>
            )}
            <ReactJsPagination
                innerClass={innerClass}
                itemClass={itemClass}
                linkClass={linkClass}
                itemClassLast={itemClassLast}
                itemClassFirst={itemClassFirst}
                activeLinkClass={activeLinkClass}
                prevPageText={prevPageText}
                nextPageText={nextPageText}
                firstPageText={firstPageText}
                lastPageText={lastPageText}
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                {...rest}
            />
        </div>
    );
};

export { Pagination };
