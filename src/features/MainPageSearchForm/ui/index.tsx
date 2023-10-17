"use client";

import classNames from "classnames";

import React, {useEffect, useMemo, useState} from "react";
import {NumericFormat, NumericFormatProps} from "react-number-format";

import {useRouter} from "next/navigation";

import {ArrowDropDown, Check} from "@mui/icons-material";
import {Select, Option, Autocomplete, Input, AutocompleteOption, selectClasses} from "@mui/joy";

import {useFormik} from "formik";

import {object, number, string} from "yup";

import {classOptions} from "../model/config";
import {useGetAddressSuggestionQuery, useGetAllCitiesQuery} from "@/features/MainPageSearchForm/api";
import {routes} from "@/shared/constants/routes";
import {type Address} from "@/shared/types/address";
import {type City} from "@/shared/types/city";
import {type CompetitorClass} from "@/shared/types/competitors";
import {BtnSearch} from "@/shared/ui/BtnSearch";
import queryString from "query-string";

import style from "./styles.module.scss";
import "./styles.scss";

interface Values {
    cityValue: null | City;
    cityInputValue: string;
    
    addresses: Address[];
    addressValue: null | Address;
    addressInputValue: string;
    
    isCadastralNumber: boolean;
    
    cadastralNumber: string;
    
    area: string;
    price: string;
    class: undefined | CompetitorClass;
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const MainFilterSchema = object().shape({
    cityValue: object({
        id: number().required(),
        name: string().required(),
    }).required(),
    area: string().required(),
    price: string().required(),
    class: string().required(),
});

// eslint-disable-next-line react/display-name
const NumericFormatAdapterArea = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const {onChange, ...rest} = props;
    
    return (
        <NumericFormat
            {...rest}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: rest.name,
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
            thousandSeparator=" "
            suffix=" м²"
        />
    );
});

// eslint-disable-next-line react/display-name
const NumericFormatAdapterPrice = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const {onChange, ...rest} = props;
    
    return (
        <NumericFormat
            {...rest}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: rest.name,
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
            thousandSeparator=" "
            suffix=" ₽"
        />
    );
});

// eslint-disable-next-line react/display-name
const NumericFormatAdapterCadastralNumber = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const {onChange, ...rest} = props;
    
    return (
        <NumericFormat
            {...rest}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: rest.name,
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
        />
    );
});

const SearchForm = () => {
    const router = useRouter();
    
    const {values, errors, handleSubmit, handleChange, setFieldValue} = useFormik<Values>({
        initialValues: {
            cityValue: null,
            cityInputValue: "",
            
            addresses: [],
            addressValue: null,
            addressInputValue: "",
            
            isCadastralNumber: false,
            
            cadastralNumber: "",
            
            area: "",
            price: "",
            
            class: undefined,
        },
        validationSchema: MainFilterSchema,
        onSubmit: async (values) => {
            const requestData = {
                city_id: values.cityValue?.id,
                address: values.addressValue?.value,
                cadastral_number: values.cadastralNumber,
                area: +values.area,
                price: +values.price,
                class: values.class,
            };
            
            router.push(`${routes.competitors}?${queryString.stringify(requestData)}`);
        },
    });
    
    const [suggestionQuery, setSuggestionQuery] = useState("");
    
    const {data: citiesData} = useGetAllCitiesQuery();
    
    const {data: suggestionsData} = useGetAddressSuggestionQuery(suggestionQuery, {skip: !suggestionQuery});
    
    useEffect(() => {
        const suggestions = (JSON.parse(suggestionsData?.data || "[]")?.suggestions || []) as Address[];
        
        setFieldValue(
            "addresses",
            suggestions?.map((suggestion) => {
                const value = [];
                
                if (!values.addressValue) {
                    if (suggestion.data.region) {
                        value.push(`${suggestion.data.region} ${suggestion.data.region_type_full}`)
                    }
                    
                    if (suggestion.data.city) {
                        value.push(`${suggestion.data.city_type_full} ${suggestion.data.city}`)
                    }
                }
                
                if (suggestion.data.street) {
                    value.push(`${suggestion.data.street_type_full} ${suggestion.data.street}`);
                }
                
                if (suggestion.data.house) {
                    value.push(`${suggestion.data.house_type_full} ${suggestion.data.house}`);
                }
                
                if (suggestion.data.flat) {
                    value.push(`${suggestion.data.flat_type_full} ${suggestion.data.flat}`)
                }
                
                return {
                    ...suggestion,
                    value: value.join(", "),
                }
            })
        );
    }, [suggestionsData]);
    
    const handleAddressChange = (e: React.SyntheticEvent, value: string, reason: string) => {
        setFieldValue("addressInputValue", value);
        
        if (value.trim().length > 2 && reason === "input") {
            setSuggestionQuery(`${citiesData?.find((city) => city.id === values.cityValue?.id)?.name || ""} ${value}`);
        }
    };
    
    const searchDisabled = useMemo(() => {
        const errorList = Object.keys(errors);
        
        if (errorList.length !== 0) {
            return true;
        }
        
        if (values.addressValue || values.cadastralNumber) {
            return false;
        }
        
        return true;
    }, [errors, values.addressValue, values.cadastralNumber]);
    
    return (
        <>
            <form className={style.searchForm} onSubmit={handleSubmit}>
                <div className={style.column}>
                    <div className={style.item}>
                        <span className={classNames(style.label, !!values.cityInputValue && style.active)}>Город</span>
                        <Autocomplete
                            sx={{
                                "--Input-radius": "1.2rem 0 0 1.2rem",
                            }}
                            slotProps={{
                                listbox: {placement: "bottom"},
                            }}
                            className="filter_city"
                            placeholder="Город"
                            options={citiesData || []}
                            value={values.cityValue}
                            inputValue={values.cityInputValue}
                            getOptionLabel={(option) => option?.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(e, value, reason) => {
                                setFieldValue("cityValue", value);
                                
                                if (reason === "selectOption") {
                                    setFieldValue("addressValue", null);
                                    setFieldValue("addressInputValue", "");
                                    setFieldValue("addresses", []);
                                }
                            }}
                            renderOption={(props, option) => (
                                <AutocompleteOption
                                    {...props}
                                    key={option.name}
                                    sx={{justifyContent: "space-between"}}
                                >
                                    {option.name}
                                    <Check sx={{color: "#3E4550"}}/>
                                </AutocompleteOption>
                            )}
                            clearText="Очистить"
                            noOptionsText={
                                <div className={style.cityNotFound}>
                                    <h3>Не найдено</h3>
                                    <p>
                                        К сожалению в вашем городе <br/> сервис пока не доступен.
                                    </p>
                                </div>
                            }
                            onInputChange={(e, value) => setFieldValue("cityInputValue", value)}
                        />
                    </div>
                    <div className={style.item}>
                        <div className={style.box}>
                            <span className={classNames(!values.isCadastralNumber && style.active)}>Адрес</span>
                            <input
                                type="checkbox"
                                id="switch"
                                name="isCadastralNumber"
                                onChange={() => setFieldValue("isCadastralNumber", !values.isCadastralNumber)}
                                checked={values.isCadastralNumber}
                            />
                            <label htmlFor="switch"></label>
                            <span className={classNames(values.isCadastralNumber && style.active)}>
                                Кадастровый номер
                            </span>
                        </div>
                        {values.isCadastralNumber ? (
                            <Input
                                sx={{
                                    "--Input-radius": "0",
                                }}
                                name="cadastralNumber"
                                placeholder="Введите кадастровый номер"
                                onChange={handleChange}
                                value={values.cadastralNumber}
                                slotProps={{
                                    input: {
                                        component: NumericFormatAdapterCadastralNumber,
                                    },
                                }}
                            />
                        ) : (
                            <Autocomplete
                                sx={{
                                    "--Input-radius": "0",
                                }}
                                placeholder="Введите адрес или название ЖК"
                                freeSolo
                                value={values.addressValue}
                                inputValue={values.addressInputValue}
                                getOptionLabel={(option) => (typeof option === "string" ? option : option?.value)}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                options={values.addresses || []}
                                onChange={(e, value, reason) => {
                                    setFieldValue("addressValue", value);
                                }}
                                filterOptions={(options, state) => options}
                                renderOption={(props, option) => (
                                    <AutocompleteOption
                                        {...props}
                                        key={option.unrestricted_value}
                                        sx={{justifyContent: "space-between"}}
                                    >
                                        {option.value}
                                        <Check sx={{color: "#3E4550"}}/>
                                    </AutocompleteOption>
                                )}
                                onInputChange={handleAddressChange}
                            />
                        )}
                    </div>
                    <div className={style.item}>
                        <span className={classNames(style.label, !!values.area && style.active)}>
                            Общая жилая площадь
                        </span>
                        <Input
                            name="area"
                            sx={{
                                "--Input-radius": "0",
                            }}
                            value={values.area}
                            onChange={handleChange}
                            placeholder="Общая жилая площадь, м²"
                            slotProps={{
                                input: {
                                    component: NumericFormatAdapterArea,
                                },
                            }}
                        />
                    </div>
                    <div className={style.item}>
                        <span className={classNames(style.label, !!values.price && style.active)}>Стоимость за м²</span>
                        <Input
                            sx={{
                                "--Input-radius": "0",
                            }}
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            placeholder="Стоимость за м²"
                            slotProps={{
                                input: {
                                    component: NumericFormatAdapterPrice,
                                },
                            }}
                        />
                    </div>
                    <div className={style.item}>
                        <span className={classNames(style.label, !!values.class && style.active)}>Класс</span>
                        <Select
                            sx={{
                                "--Select-radius": "0 1.2rem 1.2rem 0",
                                [`& .${selectClasses.indicator}`]: {
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: "scaleY(-1)",
                                    },
                                },
                            }}
                            name="class"
                            onChange={(e, value) => setFieldValue("class", value)}
                            placeholder="Класс"
                            indicator={<ArrowDropDown/>}
                        >
                            {classOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <BtnSearch className={style.search} type="submit" disabled={searchDisabled}>
                        Найти
                    </BtnSearch>
                </div>
            </form>
        </>
    );
};

export {SearchForm};
