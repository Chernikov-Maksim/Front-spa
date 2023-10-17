"use client";

import {useCallback, useEffect, useMemo, useRef} from "react";

import Image from "next/image";
import {useRouter} from "next/navigation";

import {Autocomplete, AutocompleteOption} from "@mui/joy";

import {Formik, useFormik} from "formik";

import {CompetitorCard} from "@/entitites/CompetitorCard";
import {CompetitorsTableHead} from "@/entitites/CompetitorsTableHead";
import {routes} from "@/shared/constants/routes";
import {useAppDispatch} from "@/shared/store/hooks";
import {Competitor, Competitors} from "@/shared/types/competitors";
import {Loader, Modal, Pagination, Wrapper} from "@/shared/ui";
import {Back} from "@/shared/ui/Back";
import {BtnAdd} from "@/shared/ui/BtnAdd";
import {BtnCreate} from "@/shared/ui/BtnCreate";
import {BtnDelit} from "@/shared/ui/BtnDelit";
import {Export} from "@/shared/ui/Export";
import {ItemInfo} from "@/shared/ui/ItemInfo";
import {useModal} from "@/shared/ui/Modal";
import {usePagination} from "@/shared/ui/Pagination";
import {Footer} from "@/widgets/Footer";
import {Header} from "@/widgets/Header";
import queryString from "query-string";

import {useExportCompetitorsMutation} from "@/screens/CompetitorsPage/api";
import {CompetitorsRequestArgs} from "@/screens/CompetitorsPage/api/types";
import {addCompetitorsById} from "@/screens/CompetitorsPage/model/competitorsSlice";

import styles from "./styles.module.scss";
import {CompetitorsMap} from "@/features/CompetitorsMap";
import {MapProvider, useMap} from "@/features/Providers/MapProvider";

const ITEMS_PER_PAGE = 10;

interface CompetitorsPageProps {
    searchParams: CompetitorsRequestArgs & { otherPage?: string };
    competitors: Competitors;
}

const CompetitorsPage = ({searchParams, competitors}: CompetitorsPageProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const {reactifyApi} = useMap();
    
    const mainDealsCount = useMemo(() => {
        return competitors.main_competitors.reduce((acc, curr) => acc + curr.deals_count, 0) || 0;
    }, [competitors.main_competitors]);
    
    const [
        exportCompetitors,
        {data: exportCompetitorsData, isLoading: exportCompetitorsLoading, isSuccess: exportCompetitorsSuccess},
    ] = useExportCompetitorsMutation();
    
    const [isOpenModal, openModal, closeModal] = useModal(false);
    
    const otherTableRef = useRef<HTMLDivElement | null>(null);
    
    const {activePage, handlePageChange, offset, handleMoreClick} = usePagination({
        searchPageText: "otherPage",
        itemsPerPage: 10,
        scrollTo: otherTableRef,
    });
    
    const {values, setFieldValue, handleSubmit} = useFormik<{
        searchValue: Competitor | null;
        searchInputValue: string;
    }>({
        initialValues: {
            searchValue: null,
            searchInputValue: "",
        },
        onSubmit: (values) => {
            if (!values.searchValue) return;
            
            dispatch(
                addCompetitorsById({
                    id: values.searchValue.id,
                    from: "other_competitors",
                    to: "main_competitors",
                })
            );
            
            setFieldValue("searchValue", null);
            setFieldValue("searchInputValue", "");
        },
    });
    
    const handleDeleteClick = useCallback((id: number) => {
        dispatch(
            addCompetitorsById({
                id: id,
                from: "main_competitors",
                to: "other_competitors",
            })
        );
    }, []);
    
    const handleAddClick = useCallback((id: number) => {
        dispatch(
            addCompetitorsById({
                id: id,
                from: "other_competitors",
                to: "main_competitors",
            })
        );
    }, []);
    
    const mainCompetitors = useMemo(() => {
        return competitors.main_competitors.map((competitor) => (
            <CompetitorCard
                key={competitor.id}
                competitor={competitor}
                buttonNode={<BtnDelit type="button" onClick={() => handleDeleteClick(competitor.id)}/>}
            />
        ));
    }, [competitors.main_competitors]);
    
    const otherCompetitors = useMemo(() => {
        return competitors.other_competitors
            .slice(offset, activePage * ITEMS_PER_PAGE)
            .map((competitor) => (
                <CompetitorCard
                    key={competitor.id}
                    competitor={competitor}
                    buttonNode={<BtnCreate type="button" onClick={() => handleAddClick(competitor.id)}/>}
                />
            ));
    }, [competitors.other_competitors, activePage, offset]);
    
    const filterOptions = useCallback((options: Competitor[], state: { inputValue: string }) => {
        const value = state.inputValue.toLowerCase();
        
        return options.filter((item) => {
            if (item.address.toLowerCase().includes(value) || item.name.toLowerCase().includes(value)) {
                return true;
            }
            
            return false;
        });
    }, []);
    
    const handleSubmitCreate = useCallback(
        (values: { project_name: string }) => {
            const query = {
                ...searchParams,
                name: values.project_name,
                competitors: competitors.main_competitors.map((competitor) => competitor.id),
            };
            
            delete query.otherPage;
            
            router.push(`${routes.quartergraphy}/?${queryString.stringify(query)}`);
        },
        [searchParams, competitors.main_competitors]
    );
    
    const handleDownloadClick = useCallback(() => {
        exportCompetitors({
            competitors_ids: competitors.main_competitors.map((competitor) => competitor.id),
        });
    }, [competitors.main_competitors]);
    
    useEffect(() => {
        if (exportCompetitorsSuccess && exportCompetitorsData) {
            const a = document.createElement("a");
            a.download = "Конкуренты.xlsx";
            a.href = `${process.env.BASE_API_URL}/${exportCompetitorsData.file_path}`;
            a.target = "_blank";
            a.click();
        }
    }, [exportCompetitorsSuccess, exportCompetitorsData]);
    
    return (
        <>
            <Header/>
            
            <main>
                <Wrapper>
                    <div className={styles.map}>
                        {reactifyApi ? (
                            <CompetitorsMap competitors={competitors} reactifyApi={reactifyApi}/>
                        ) : (
                            <Loader/>
                        )}
                    </div>
                </Wrapper>
                <section className={styles.competitors}>
                    <Wrapper>
                        <div className={styles.container}>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <div className={styles.item}>
                                        <Back/>
                                        <h2 className={styles.title}>
                                            <span>Конкуренты </span>
                                            <span>— в вашей локации найдено {competitors.main_competitors.length}</span>
                                        </h2>
                                    </div>
                                    <button
                                        className={styles.create}
                                        disabled={!(mainCompetitors?.length >= 5 && mainDealsCount > 500)}
                                        onClick={openModal}
                                    >
                                        Сформировать квартирографию
                                    </button>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.item}>
                                        <div className={styles.box}>
                                            <Image
                                                src="/images/competitors/releases.svg"
                                                alt="releases"
                                                width={20.65}
                                                height={19.73}
                                            />
                                            <span className={styles.text}>Используются в рассчете квартирографии</span>
                                        </div>
                                        <p className={styles.annotations}>
                                            Для корректного расчета квартирографии рекомендуется учитывать конкурентов с
                                            параметрами приближенными к новому проекту:
                                        </p>
                                        <ItemInfo/>
                                    </div>
                                    <div className={styles.item}>
                                        <p className={styles.data}>
                                            Данные по ценам и сделкам для расчета квартирографии выбранных конкурентов.
                                        </p>
                                        <Export
                                            disabled={!competitors.main_competitors.length || exportCompetitorsLoading}
                                            onClick={handleDownloadClick}
                                        />
                                    </div>
                                </div>
                                {!!mainCompetitors?.length && (
                                    <div className={styles.table}>
                                        <CompetitorsTableHead/>
                                        <div className={styles.columnCards}>{mainCompetitors}</div>
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.rowTex}>
                                <p className={styles.strong}>Вы можете изменить перечень конкурентов.</p>
                                <p className={styles.simple}>
                                    Воспользуйтесь поиском или выберите их из предложенного ниже списка.
                                </p>
                            </div>
                            <div className={styles.rowCreate}>
                                <div className={styles.column}>
                                    <form className={styles.item} onSubmit={handleSubmit}>
                                        <Autocomplete
                                            sx={{
                                                border: "0.1rem solid #DADADA",
                                                marginRight: "0.8rem",
                                                flexBasis: "60.8rem",
                                            }}
                                            placeholder="Введите адрес или название ЖК"
                                            freeSolo
                                            value={values.searchValue}
                                            inputValue={values.searchInputValue}
                                            getOptionLabel={(option) =>
                                                typeof option === "string" ? option : "ЖК " + option?.name
                                            }
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            options={competitors.other_competitors}
                                            onChange={(e, value, reason) => {
                                                setFieldValue("searchValue", value);
                                            }}
                                            onInputChange={(e, value, reason) => {
                                                setFieldValue("searchInputValue", value);
                                            }}
                                            filterOptions={filterOptions}
                                            slotProps={{
                                                listbox: {
                                                    style: {
                                                        border: "0.1rem solid #DADADA",
                                                    },
                                                },
                                            }}
                                            renderOption={(props, option) => (
                                                <AutocompleteOption
                                                    {...props}
                                                    key={option.id}
                                                    sx={{
                                                        color: "#A6A6A6",
                                                    }}
                                                >
                                                    <div>
                                                        <p
                                                            style={{
                                                                marginBottom: "0.8rem",
                                                            }}
                                                        >
                                                            ЖК {option.name}
                                                        </p>
                                                        <p>{option.address}</p>
                                                    </div>
                                                </AutocompleteOption>
                                            )}
                                        />
                                        <BtnAdd disabled={!values.searchValue}>Добавить</BtnAdd>
                                    </form>
                                    <div className={styles.itemm}>
                                        <div className={styles.warning}>
                                            <Image
                                                src="/images/competitors/warning.svg"
                                                alt="description"
                                                width={24}
                                                height={24}
                                            />
                                            <span>Не используются в рассчете квартирографии</span>
                                        </div>
                                        <p className={styles.explain}>
                                            Данные объекты не соответствуют критериям вашего запроса и имеют следующие
                                            параметры:
                                        </p>
                                        <div className={styles.box}>
                                            <div className={styles.itemInfo}>
                                                <span>&gt; 2 км</span>
                                                <span>— удаленность от объекта</span>
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <span>&gt; 20%</span>
                                                <span>
                                                    — разброс по стоимости за м<sup>2</sup> и объему жилой площади
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {!!otherCompetitors?.length && (
                                    <div className={styles.table} ref={otherTableRef}>
                                        <CompetitorsTableHead/>
                                        <div className={styles.columnCards}>{otherCompetitors}</div>
                                        <Pagination
                                            activePage={activePage}
                                            onChange={handlePageChange}
                                            totalItemsCount={competitors.other_competitors.length}
                                            onMoreClick={handleMoreClick}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Wrapper>
                </section>
                
                {isOpenModal && (
                    <Modal onClose={closeModal}>
                        <h2 className={styles.titleModal}>Создание квартирографии</h2>
                        <p className={styles.subTitleModal}>
                            Вы сможете переименовать или отредактировать квартирографию в личном кабинете
                        </p>
                        <Formik
                            initialValues={{
                                project_name: "",
                            }}
                            onSubmit={handleSubmitCreate}
                        >
                            {({values, handleChange, handleSubmit}) => (
                                <form className={styles.inputBox} onSubmit={handleSubmit}>
                                    <div className={styles.datePicker}>
                                        <input
                                            className={styles.date}
                                            type="text"
                                            value={new Date().toLocaleDateString()}
                                            readOnly
                                        />
                                        <span className={styles.textDate}>Дата</span>
                                    </div>
                                    <input
                                        name="project_name"
                                        className={styles.nameProject}
                                        value={values.project_name}
                                        onChange={handleChange}
                                        placeholder="Рабочее название проекта"
                                        type="text"
                                    />
                                    <button disabled={values.project_name.length < 3} className={styles.createModal}>
                                        Сформировать
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </Modal>
                )}
            </main>
            
            <Footer/>
        </>
    );
};

export {CompetitorsPage};
