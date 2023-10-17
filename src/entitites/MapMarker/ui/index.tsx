import {useCallback, useState} from "react";
import {ReactifyApi, useMap} from "@/features/Providers/MapProvider";
import {Loader} from "@/shared/ui";
import {numericFormatter} from "react-number-format";
import Image from "next/image";
import {Feature} from "@yandex/ymaps3-types/packages/clusterer";
import {Competitor} from "@/shared/types/competitors";
import {useModal} from "@/shared/ui/Modal";

interface MapMarkerProps {
    feature: Feature & { properties: Competitor };
}

const MapMarker = (props: MapMarkerProps) => {
    const {feature} = props;
    
    const {reactifyApi} = useMap();
    
    const [isOpenModal, openModal, closeModal] = useModal(false);
    
    if (!reactifyApi) {
        return <Loader/>
    }
    
    const {
        YMapMarker,
    } = reactifyApi
    
    return (
        <YMapMarker coordinates={feature.geometry.coordinates}>
            <div className="marker">
                <div className="marker-wrapper">
                    <div className="marker-hint">
                        <span>ЖК {feature.properties.name}</span>
                        <span className="color-second">•</span>
                        <span className="color-second">
                            {numericFormatter(String(feature.properties.price), {
                                valueIsNumericString: true,
                                suffix: " ₽/м²",
                                thousandSeparator: " ",
                                decimalScale: 0,
                            })}
                        </span>
                    </div>
                    
                    <div className="marker-icon__wrapper" onClick={openModal}>
                        <Image className="marker-icon" src="/images/map/icon.svg" alt="" width={16} height={16}/>
                    </div>
                </div>
                {isOpenModal && (
                    <div className="marker-popup">
                        <div className="marker-popup__top"></div>
                    </div>
                )}
            </div>
        </YMapMarker>
    );
};

export {MapMarker};