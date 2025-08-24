/**
 * Haversine Formula Apply
 * Source: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere
 */

import { City } from "../models/City";
import { TrackPoint, createTrackPoint } from "../models/TrackPoint";

const valueToRadian = (value: number) => value * Math.PI / 180.0;

const calculateTrackDistance = (cityOrigin: City, cityDestination: City): TrackPoint => {

    let distance: number;

    let deltaLatitude = valueToRadian(cityDestination.latitude - cityOrigin.latitude);
    let deltaLongitude = valueToRadian(cityDestination.longitude - cityOrigin.longitude);
    
    const originLatitudeAsRadian = valueToRadian(cityOrigin.latitude);
    const destinationLatitudeAsRadian = valueToRadian(cityDestination.latitude);

    let a = Math.pow(Math.sin(deltaLatitude / 2), 2) +
                Math.pow(Math.sin(deltaLongitude / 2), 2) *
                Math.cos(originLatitudeAsRadian) *
                Math.cos(destinationLatitudeAsRadian);
    
    const earthRadius = 6371;
    const c = 2 * Math.asin(Math.sqrt(a));
    distance = earthRadius * c;


    return createTrackPoint({
        distance,
        origin: cityOrigin,
        end: cityDestination
    });
}

export { calculateTrackDistance };