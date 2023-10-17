import {JSXElementConstructor, memo, ReactElement, useCallback, useMemo, useRef, useState} from "react";
import {LngLat, LngLatBounds, YMap, YMapProps} from "@yandex/ymaps3-types";
import {ReactifyApi, useMap} from "@/features/Providers/MapProvider";
import {Competitor, Competitors} from "@/shared/types/competitors";
import {Loader} from "@/shared/ui";

import '@/shared/styles/blocks/map.scss';
import {Feature} from "@yandex/ymaps3-types/packages/clusterer";
import {numericFormatter} from "react-number-format";
import Image from "next/image";
import {YMapLocation} from "@yandex/ymaps3-types/imperative/YMap";
import {MapMarker} from "@/entitites/MapMarker";

interface CompetitorsMapProps {
    competitors: Competitors;
    reactifyApi: ReactifyApi;
}

const LOCATION = {center: [49.106414, 55.796127], zoom: 10};

const CompetitorsMap = memo((props: CompetitorsMapProps) => {
    const {competitors, reactifyApi} = props;
    
    const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
    const [location, setLocation] = useState<YMapProps['location']>(LOCATION);
    
    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapClusterer,
        clusterByGrid,
    } = reactifyApi;
    
    const gridSizedMethod = useMemo(() => clusterByGrid({gridSize: 128}), []);
    
    const coordinates: Array<Competitor & {isMain: boolean}> = useMemo(() => {
        return Object.entries(competitors).map(([type, comprs]: [string, Array<Competitor & {isMain: boolean}>]) => {
            const isMain = type === 'main_competitors';
            
            if (isMain) {
                comprs = comprs.map(competitor => {
                    competitor.isMain = true
                    
                    return competitor
                })
            }
            
            return comprs;
        }).flat(1);
    }, [competitors]);
    
    const points: Feature[] = useMemo(() => (
        coordinates.map(lnglat => ({
            type: 'Feature',
            id: String(lnglat.id),
            geometry: {
                type: 'Point',
                coordinates: [
                    Number(lnglat.latitude),
                    Number(lnglat.longitude)
                ]
            },
            properties: {
                ...lnglat,
            }
        }))
    ), [coordinates]);
    
    const marker = useCallback(
        (feature: Feature & { properties: Competitor }) => (
            <MapMarker feature={feature}/>
        ),
        []
    );
    
    const handleClusterClick = useCallback((e: React.MouseEvent<HTMLDivElement>, features: Feature[]) => {
        const bounds = features.map(f => f.geometry.coordinates).slice(0, 2) as LngLatBounds
        
        setLocation({
            bounds: bounds,
            duration: 1000,
        })
    }, [mapRef])
    
    const cluster = useCallback(
        (coordinates: LngLat, features: Feature[]) => (
            <YMapMarker coordinates={coordinates}>
                <div className="cluster"
                     onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClusterClick(e, features)}>
                    {features.length}
                </div>
            </YMapMarker>
        ),
        []
    );
    
    return (
        <YMap location={location} ref={mapRef}>
            <YMapDefaultSchemeLayer/>
            <YMapDefaultFeaturesLayer/>
            
            <YMapClusterer
                marker={marker}
                cluster={cluster}
                method={gridSizedMethod}
                features={points}
            />
        </YMap>
    );
});

export {CompetitorsMap};