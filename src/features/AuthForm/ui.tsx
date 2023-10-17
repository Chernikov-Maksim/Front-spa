"use client";

import { useEffect, useMemo } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useFormik } from "formik";

import { object, string } from "yup";

import { useLoginMutation } from "@/features/AuthProvider/api";
import { Credential } from "@/shared/types/credential";
import { Button, InputLogin, InputPassword } from "@/shared/ui";
import Cookies from "js-cookie";

import styles from "./styles.module.scss";

const LoginSchema = object().shape({
    email: string().email("Не верный формал почты").required("Это обязательное поле"),
    password: string()
        .min(4, "Слишком короткий пароль")
        .max(50, "Слишком длинный пароль")
        .required("Это обязательное поле"),
});

const AuthForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [login, { data: loginData, isSuccess: loginSuccess, isLoading: loginLoading }] = useLoginMutation();

    const { values, errors, handleSubmit, handleChange, isSubmitting } = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: LoginSchema,
        validateOnMount: true,
        onSubmit: (values: Credential) => {
            login(values);
        },
    });

    const loginDisabled = useMemo(() => {
        if (!loginLoading && !isSubmitting && Object.keys(errors).length === 0) {
            return false;
        }

        return true;
    }, [isSubmitting, errors, loginLoading]);

    useEffect(() => {
        if (loginSuccess && loginData) {
            Cookies.set("accessToken", loginData.accessToken, {
                path: "/",
                expires: 1,
            });
            Cookies.set("refreshToken", loginData.refreshToken, {
                path: "/",
                expires: 365,
            });

            const from = searchParams?.get("from");

            if (from) {
                router.replace(from);
            } else {
                router.refresh();
            }
        }
    }, [loginSuccess, loginData]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputLogin name="email" value={values.email} onChange={handleChange} />
            <InputPassword name="password" value={values.password} onChange={handleChange} />
            <Button disabled={loginDisabled}>Войти</Button>
        </form>
    );
};

export { AuthForm };
