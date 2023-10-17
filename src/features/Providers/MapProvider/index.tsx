import React, {createContext, useContext, useMemo, useState} from "react";
import ReactDOM from "react-dom";
import Script from "next/script";
import {ReactifiedModule} from "@yandex/ymaps3-types/reactify";

export type ReactifyApi = ReactifiedModule<
    typeof import("@yandex/ymaps3-types") &
    typeof import("@yandex/ymaps3-types/packages/markers") &
    typeof import("@yandex/ymaps3-types/packages/clusterer")
>;

type MountedMapsContextValue = {
    reactifyApi: ReactifyApi | null;
};

export const MountedMapsContext = createContext<MountedMapsContextValue>({
    reactifyApi: null,
});

export interface MapProviderProps {
    children?: React.ReactNode;
    apiUrl: string;
}

export const MapProvider = (props: MapProviderProps) => {
    const [reactifyApi, setReactifyApi] = useState<ReactifyApi | null>(null);
    
    const contextValue = useMemo(() => ({reactifyApi}), [reactifyApi]);
    
    return (
        <MountedMapsContext.Provider value={contextValue}>
            <Script
                src={props.apiUrl}
                onLoad={async () => {
                    const [ymaps3React] = await Promise.all([
                        ymaps3.import("@yandex/ymaps3-reactify"),
                        ymaps3.ready,
                    ]);
                    
                    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
                    
                    setReactifyApi({
                        ...reactify.module(ymaps3),
                        ...reactify.module(await ymaps3.import('@yandex/ymaps3-markers@0.0.1')),
                        ...reactify.module(await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1')),
                    });
                }}
            />
            {props.children}
        </MountedMapsContext.Provider>
    );
};

export const useMap = () => useContext(MountedMapsContext);