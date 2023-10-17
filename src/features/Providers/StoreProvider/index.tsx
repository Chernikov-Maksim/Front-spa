"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";

import { setupStore } from "@/shared/store";

interface StoreProviderProps {
    children: ReactNode;
}

export const store = setupStore();

const StoreProvider = (props: StoreProviderProps) => {
    const { children } = props;

    return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };
