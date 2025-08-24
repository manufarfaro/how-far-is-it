import { City } from "./City"
import { TrackPoint } from "./TrackPoint"

export type DistanceCalculationResult = {
    totalDistance:  number,
    origin: City,
    destination: City,
    tracks: TrackPoint[],
    passengerQty: number,
    date: Date
}