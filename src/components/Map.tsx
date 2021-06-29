import { FC, useState, useCallback } from 'react'
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { LeafletEvent } from 'leaflet'
import '../leaflet.config.js'
import { zIndex } from '../lib/theme'

const MapWrapper = styled(MapContainer)`
    height: 100px;
`

const MapWrapperExpanded = styled(MapWrapper)`
    height: 400px;
`

const ExpandButton = styled(Button)`
    &.ui.icon.button {
        position: absolute;
        z-index: ${zIndex.expandButtonOnLeafletMap};
        top: 10px;
        right: 5px;
        padding: 7px;
        background: #fff;
        color: #000;
        cursor: pointer;

        &:hover {
            background: #f4f4f4;
        }
    }
`

interface Props {
    // Stringified GeoJSON.FeatureCollection
    featureCollection: string
}

const Map: FC<Props> = props => {
    const [mapExpanded, setMapExpanded] = useState<boolean>(false)
    const featureCollection: GeoJSON.FeatureCollection = JSON.parse(
        props.featureCollection
    )

    const handleIconClick = useCallback(() => {
        setMapExpanded(!mapExpanded)
    }, [mapExpanded])

    if (featureCollection.features.length === 0) {
        return null
    }

    const handleDataAdd = (event: LeafletEvent) => {
        const leafletLayer = event.target
        const features = Object.values(leafletLayer._layers)

        if (
            features.length === 1 &&
            // FIXME: Type is currently not defined by DefinitelyTyped?
            // @ts-ignore
            features[0].feature.geometry.type === 'Point'
        ) {
            // @ts-ignore
            const coords = features[0].feature.geometry.coordinates
            leafletLayer._map.setView([coords[1], coords[0]], 13)
        } else {
            leafletLayer._map.fitBounds(leafletLayer.getBounds())
        }
    }

    const Wrapper = mapExpanded ? MapWrapperExpanded : MapWrapper

    return (
        <Wrapper center={[0, 0]} scrollWheelZoom={false} zoom={1}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON
                data={featureCollection}
                eventHandlers={{
                    add: handleDataAdd,
                }}
            />
            <ExpandButton
                icon={mapExpanded ? 'compress' : 'expand'}
                onClick={handleIconClick}
            />
        </Wrapper>
    )
}

export default Map
