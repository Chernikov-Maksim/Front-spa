import classNames from "classnames";

import { useCallback, useEffect, useRef, useState } from "react";
import Files from "react-files";
import { useDispatch } from "react-redux";

import Image from "next/image";

import { ProfileQuartergraphySort } from "@/entitites/ProfileQuartergraphy/ui/Sort";
import { routes } from "@/shared/constants/routes";
import { Base } from "@/shared/types/bases";
import { Modal, Pagination } from "@/shared/ui";
import { useModal } from "@/shared/ui/Modal";
import { usePagination } from "@/shared/ui/Pagination";
import Cookies from "js-cookie";

import {
    useDeleteBaseByIdMutation,
    useUpdateProfileBasesMutation,
    useUploadBaseMutation
} from "@/screens/ProfilePage/api";
import {
    ProfileSortType,
    removeBaseById,
    setBaseRemoveId, sortBases,
    sortQuartergraphy
} from "@/screens/ProfilePage/model/profileSlice";

import style from "./styles.module.scss";
import {useAppSelector} from "@/shared/store/hooks";

interface ProfileBasesProps {
    bases: Base[];
}

const ITEMS_PER_PAGE = 10;

// @ts-ignore
export const ProfileBases = ({ bases }: ProfileBasesProps) => {
    const dispatch = useDispatch();

    const [deleteBaseById, { data: deleteBaseByIdData, isSuccess: deleteBaseByIdSuccess }] =
        useDeleteBaseByIdMutation();
    
    const [getBases] = useUpdateProfileBasesMutation();

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);

    const tableRef = useRef<HTMLDivElement | null>(null);

    const [isActiveModal, openModal, closeModal] = useModal(false);

    const [isActiveModalSuccess, openModalSuccess, closeModalSuccess] = useModal(false);
    const [isActiveModalError, openModalError, closeModalError] = useModal(false);

    const activeModalId = useAppSelector(state => state.profile.baseRemoveId);

    const { handlePageChange, activePage, handleMoreClick, offset } = usePagination({
        scrollTo: tableRef,
        itemsPerPage: ITEMS_PER_PAGE,
        searchPageText: "basePage",
    });

    const handleDeleteBase = useCallback(() => {
        if (activeModalId) {
            deleteBaseById(activeModalId);
        }
    }, [activeModalId, deleteBaseById]);

    const handleOpenModal = useCallback((id: number) => {
        openModal();
        dispatch((setBaseRemoveId(id)))
    }, [openModal]);

    const handleCloseModal = useCallback(() => {
        closeModal();
        dispatch((setBaseRemoveId(null)))
    }, [closeModal]);

    const handleFilesChange = useCallback((files: File[]) => {
        if (files.length !== 2) {
            openModalError();
        } else {
            setUploadingFile(true);
            const xhr = new XMLHttpRequest();

            const formData = new FormData();
            formData.append("file1", files[0]);
            formData.append("file2", files[1]);

            xhr.addEventListener("load", loadHandler, false);
            xhr.addEventListener("error", errorHandler, false);
            xhr.open("POST", process.env.BASE_API_URL + routes.api.uploadBase);
            xhr.setRequestHeader("authorization", `Bearer ${Cookies.get("accessToken")}`);
            xhr.send(formData);
        }
    }, []);

    const loadHandler = useCallback(() => {
        getBases();
        openModalSuccess();
        setUploadingFile(false);
    }, []);

    const errorHandler = useCallback(() => {
        openModalError();
        setUploadingFile(false);
    }, []);

    const handleFilesError = useCallback(() => {
        openModalError();
    }, []);
    
    const handleSelectSort = useCallback((value: ProfileSortType) => {
        dispatch(sortBases(value))
    }, [])

    return (
        <>
            <Files
                accepts={[".xlsx"]}
                multiple
                maxFileSize={Infinity}
                minFileSize={0}
                className={style.ragging}
                onChange={handleFilesChange}
                onError={handleFilesError}
                clickable
                maxFiles={2}
                dragActiveClassName={style.draging}
            >
                {(isDragging) => (
                    <>
                        <Image
                            className={style.placeItem}
                            src="/images/account/placeItem.svg"
                            alt="placeItem"
                            width={30}
                            height={35}
                        />
                        <div className={style.item}>
                            <button className={style.selectFile}>Выберите</button>
                            <span className={style.drag}>или перетащите файлы .xlsx</span>
                        </div>
                        {(isDragging || uploadingFile) && (
                            <div className={classNames(style.dragOverlay, uploadingFile && style.dragLoading)}>
                                <div className={style.dragContainer}>
                                    {isDragging && <h2 className={style.dragTitle}>Перетащите файлы .xls сюда</h2>}
                                    {uploadingFile && (
                                        <div>
                                            <h2 className={style.dragTitle}>Файлы загружаются...</h2>
                                            <div className={style.dragProgress}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Files>
            
            {!!bases.length && (
                <>
                    <div className={style.rowContent}>
                        <h3 className={style.title}>Загруженные базы данных</h3>
                        <ProfileQuartergraphySort title="по дате" items={[{name: "Сначала старые", value: 'desc'}, {
                            name: "Сначала новые",
                            value: 'asc'
                        }]} onSelect={handleSelectSort}/>
                    </div>
                    <div className={style.container} ref={tableRef}>
                        <div className={style.rowTitle}>
                            <h4 className={style.title}>Субъект</h4>
                            <h4 className={style.title}>Дата загрузки</h4>
                            <h4 className={style.title}>дата обновления</h4>
                        </div>
                        <div className={style.rowCards}>
                            {bases.slice(offset, activePage * ITEMS_PER_PAGE).map((base) => {
                                const date = new Date();
                                
                                const start = new Date(date.setDate(date.getDate() - 91)).getTime();
                                const end = Date.now();
                                
                                const range = end - start;
                                
                                const upload = new Date(base.created_at).getTime() - start;
                                
                                const percent = (upload / range) * 100;
                                
                                const grade = 100 / 7;
                                
                                let className = classNames(style.grade_7);
                                
                                if (percent < grade * 6) {
                                    className = classNames(style.grade_6);
                                }
                                if (percent < grade * 5) {
                                    className = classNames(style.grade_5);
                                }
                                if (percent < grade * 4) {
                                    className = classNames(style.grade_4);
                                }
                                if (percent < grade * 3) {
                                    className = classNames(style.grade_3);
                                }
                                if (percent < grade * 2) {
                                    className = classNames(style.grade_2);
                                }
                                if (percent < grade) {
                                    className = classNames(style.grade_1);
                                }
                                
                                return (
                                    <div key={base.id} className={style.column}>
                                        <div className={style.boxRow}>
                                            <div className={style.card}>
                                                <div>
                                                    <span className={style.adress}>{base.city}</span>
                                                    <span className={style.date}>
                                                {new Date(base.created_at).toLocaleDateString()}
                                            </span>
                                                    <div className={style.progrssBar}>
                                                <span className={style.bar}>
                                                    <span className={className} style={{ width: `${percent}%` }}></span>
                                                </span>
                                                        <span className={classNames(style.procent, className)}>
                                                    {new Date(base.updated_at).toLocaleDateString()}
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.delete} onClick={() => handleOpenModal(base.id)}>
                                            <Image src="/images/account/delete.svg" alt="delete" width={15} height={16.88} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Pagination
                            activePage={activePage}
                            onChange={handlePageChange}
                            totalItemsCount={bases.length}
                            onMoreClick={handleMoreClick}
                        />
                    </div>
                </>
            )}

            {isActiveModalError && (
                <Modal onClose={closeModalError}>
                    <div className={style.modalError}>
                        <svg
                            className={style.modalIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                        >
                            <rect width="80" height="80" rx="18" fill="#E40428" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M59.1969 39.9998C59.1969 45.092 57.174 49.9756 53.5733 53.5763C49.9726 57.177 45.089 59.1998 39.9969 59.1998C34.9047 59.1998 30.0211 57.177 26.4204 53.5763C22.8197 49.9756 20.7969 45.092 20.7969 39.9998C20.7969 34.9076 22.8197 30.0241 26.4204 26.4234C30.0211 22.8227 34.9047 20.7998 39.9969 20.7998C45.089 20.7998 49.9726 22.8227 53.5733 26.4234C57.174 30.0241 59.1969 34.9076 59.1969 39.9998ZM42.3969 49.5998C42.3969 50.2363 42.144 50.8468 41.6939 51.2969C41.2438 51.7469 40.6334 51.9998 39.9969 51.9998C39.3604 51.9998 38.7499 51.7469 38.2998 51.2969C37.8497 50.8468 37.5969 50.2363 37.5969 49.5998C37.5969 48.9633 37.8497 48.3528 38.2998 47.9028C38.7499 47.4527 39.3604 47.1998 39.9969 47.1998C40.6334 47.1998 41.2438 47.4527 41.6939 47.9028C42.144 48.3528 42.3969 48.9633 42.3969 49.5998ZM39.9969 27.9998C39.3604 27.9998 38.7499 28.2527 38.2998 28.7027C37.8497 29.1528 37.5969 29.7633 37.5969 30.3998V39.9998C37.5969 40.6363 37.8497 41.2468 38.2998 41.6969C38.7499 42.1469 39.3604 42.3998 39.9969 42.3998C40.6334 42.3998 41.2438 42.1469 41.6939 41.6969C42.144 41.2468 42.3969 40.6363 42.3969 39.9998V30.3998C42.3969 29.7633 42.144 29.1528 41.6939 28.7027C41.2438 28.2527 40.6334 27.9998 39.9969 27.9998Z"
                                fill="white"
                            />
                        </svg>
                        <h2 className={style.titleModal}>Произошла ошибка загрузки файлов</h2>
                        <p className={style.subTitileModal}>Попробуйте ещё раз</p>
                    </div>
                </Modal>
            )}

            {isActiveModalSuccess && (
                <Modal onClose={closeModalSuccess}>
                    <div className={style.modalSuccess}>
                        <svg
                            className={style.modalIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                        >
                            <rect width="80" height="80" rx="18" fill="#00C951" />
                            <path
                                d="M33.3 61L29.5 54.5L21.95 52.95L22.8 45.6L18 40L22.8 34.45L21.95 27.1L29.5 25.55L33.3 19L40 22.1L46.7 19L50.55 25.55L58.05 27.1L57.2 34.45L62 40L57.2 45.6L58.05 52.95L50.55 54.5L46.7 61L40 57.9L33.3 61ZM37.85 46.65L49.2 35.4L46.95 33.35L37.85 42.35L33.1 37.4L30.8 39.65L37.85 46.65Z"
                                fill="white"
                            />
                        </svg>
                        <h2 className={style.titleModal}>Файлы успешно загружены!</h2>
                    </div>
                </Modal>
            )}

            {(isActiveModal && activeModalId) && (
                <Modal onClose={handleCloseModal}>
                    <h2 className={style.titleModal}>Удалить базу данных</h2>
                    <p className={style.subTitileModal}>
                        Этот расчёт будет немедленно удалён. Это действие нельзя отменить.
                    </p>
                    <div className={style.btnSelection}>
                        <button className={style.btnCancel} onClick={handleCloseModal}>
                            Отменить
                        </button>
                        <button className={style.btnDelete} onClick={handleDeleteBase}>
                            Удалить
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};
