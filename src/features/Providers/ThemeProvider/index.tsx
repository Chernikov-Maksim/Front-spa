"use client";

import { ReactNode } from "react";

import { CssVarsProvider } from "@mui/joy/styles";

import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
            <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

export { ThemeProvider };
