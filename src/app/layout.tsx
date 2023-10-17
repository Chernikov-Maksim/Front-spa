import { ReactNode } from "react";

import type { Metadata } from "next";

import { AuthProvider } from "@/features/AuthProvider/ui";
import { StoreProvider } from "@/features/Providers/StoreProvider";
import { ThemeProvider } from "@/features/Providers/ThemeProvider";

import "@/shared/styles/type.css";
import "@/shared/styles/index.scss";

export const metadata: Metadata = {
    title: "GMK",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <body>
                <StoreProvider>
                    <ThemeProvider>
                        <AuthProvider>{children}</AuthProvider>
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
