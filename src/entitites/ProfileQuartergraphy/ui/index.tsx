"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

import Image from "next/image";

import {ProfileQuartergraphyCard} from "@/entitites/ProfileQuartergraphy/ui/Card";
import {ProfileQuartergraphySort} from "@/entitites/ProfileQuartergraphy/ui/Sort";
import {ProfileQuartergraphyTableHead} from "@/entitites/ProfileQuartergraphyTableHead/ui";
import {Quartergraphy} from "@/shared/types/quartergraphy";
import {Modal, Pagination} from "@/shared/ui";
import {ItemInfo} from "@/shared/ui/ItemInfo";
import {useModal} from "@/shared/ui/Modal";
import {usePagination} from "@/shared/ui/Pagination";

import {useDeleteQuartergraphyByIdMutation} from "@/screens/ProfilePage/api";
import {ProfileSortType, removeQuartergraphyById, sortQuartergraphy} from "@/screens/ProfilePage/model/profileSlice";

import style from "./styles.module.scss";

const ITEMS_PER_PAGE = 10;

interface ProfileQuartergraphyProps {
    quartergraphy: Quartergraphy[];
}

const ProfileQuartergraphy = ({quartergraphy}: ProfileQuartergraphyProps) => {
    const dispatch = useDispatch();
    
    const [deleteQuartergraphyById, {data: deleteQuartergraphyByIdData, isSuccess: deleteQuartergraphyByIdSuccess}] =
        useDeleteQuartergraphyByIdMutation();
    
    const tableRef = useRef<HTMLDivElement | null>(null);
    
    const [isActiveModal, openModal, closeModal] = useModal(false);
    const [activeModalId, setActiveModalId] = useState<number | null>(null);
    
    const {handlePageChange, activePage, handleMoreClick, offset} = usePagination({
        scrollTo: tableRef,
        itemsPerPage: ITEMS_PER_PAGE,
        searchPageText: "quartergraphyPage",
    });
    
    useEffect(() => {
        if (deleteQuartergraphyByIdSuccess && deleteQuartergraphyByIdData?.success && activeModalId) {
            dispatch(removeQuartergraphyById(activeModalId));
            
            setActiveModalId(null);
            closeModal();
        }
    }, [deleteQuartergraphyByIdSuccess, deleteQuartergraphyByIdData]);
    
    const handleDeleteQuartergraphy = useCallback(() => {
        if (activeModalId) {
            deleteQuartergraphyById(activeModalId);
        }
    }, [activeModalId]);
    
    const handleOpenModal = useCallback((id: number) => {
        openModal();
        setActiveModalId(id);
    }, []);
    
    const handleCloseModal = useCallback(() => {
        closeModal();
        setActiveModalId(null);
    }, []);
    
    const handleSelectSort = useCallback((value: ProfileSortType) => {
        dispatch(sortQuartergraphy(value))
    }, [])
    
    return (
        <>
            <p className={style.subTitle}>
                Вы можете изменить список конкурентов, сформировать и сохранить новую квартирографию для текущего
                проекта в личном кабинете. Для корректного расчета квартирографии рекомендуется учитывать не менее 5
                конкурентов с параметрами приближенными к вашему проекту:
            </p>
            <ItemInfo/>
            <div className={style.rowContent}>
                <h3 className={style.title}>Разработанные квартирографии</h3>
                <ProfileQuartergraphySort title="по дате" items={[{name: "Сначала старые", value: 'desc'}, {
                    name: "Сначала новые",
                    value: 'asc'
                }]} onSelect={handleSelectSort}/>
            </div>
            <div className={style.rowCards} ref={tableRef}>
                <ProfileQuartergraphyTableHead/>
                <div className={style.columnCards}>
                    {quartergraphy.slice(offset, activePage * ITEMS_PER_PAGE).map((quartergraph) => (
                        <div key={quartergraph.id} className={style.column}>
                            <ProfileQuartergraphyCard quartergraphy={quartergraph}/>
                            <div className={style.delete} onClick={() => handleOpenModal(quartergraph.id)}>
                                <Image src="/images/account/delete.svg" alt="delete" width={15} height={16.88}/>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    activePage={activePage}
                    onChange={handlePageChange}
                    totalItemsCount={quartergraphy.length}
                    onMoreClick={handleMoreClick}
                />
            </div>
            
            {isActiveModal && (
                <Modal onClose={handleCloseModal}>
                    <h2 className={style.titleModal}>Удалить квартирографию</h2>
                    <p className={style.subTitileModal}>
                        Этот расчёт будет немедленно удалён. Это действие нельзя отменить.
                    </p>
                    <div className={style.btnSelection}>
                        <button className={style.btnCancel} onClick={handleCloseModal}>
                            Отменить
                        </button>
                        <button className={style.btnDelete} onClick={handleDeleteQuartergraphy}>
                            Удалить
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export {ProfileQuartergraphy};
