import { City } from "../models/City"
import { DistanceCalculationResult } from "../models/DistanceCalculationResult"
import { TrackPoint } from "../models/TrackPoint"
import { calculateTrackDistance } from "../lib/haversine"

type GetDistanceCalculationParam = {
    cityOrigin: City,
    cityDestination: City,
    intermediateCities: City[],
    passengerQty: number,
    date: Date
}

export const getDistanceCalculation = ({ cityOrigin, cityDestination, intermediateCities, passengerQty, date }: GetDistanceCalculationParam): DistanceCalculationResult => {

    const tracksSchedule: City[] = [cityOrigin, ...intermediateCities, cityDestination];
    let totalDistance = 0;
    const tracks: TrackPoint[] = [];
    
    for (let i = 0; i < tracksSchedule.length - 1; i++) {
        const calculatedTrack = calculateTrackDistance(tracksSchedule[i], tracksSchedule[i + 1])
        tracks.push(calculatedTrack);
        totalDistance += calculatedTrack.distance;
    }

    return {
        origin: cityOrigin,
        destination: cityDestination,
        tracks,
        totalDistance,
        passengerQty,
        date
    };
}