import { City } from "./City"
import { DistanceUnit } from "./DistanceUnit"

export type TrackPoint = {
    origin: City,
    end:  City,
    measure: DistanceUnit,
    distance:  number
}

export function createTrackPoint(params: Omit<TrackPoint, 'measure'>): TrackPoint {
    return {
        measure: DistanceUnit.Kilometers,
        ...params
    };
}