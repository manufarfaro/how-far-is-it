import type { NextApiRequest, NextApiResponse } from 'next';
import { debounce } from "debounce";
import { getDistanceCalculation } from '../../../services/distanceService';
import { City } from '../../../models/City';
import { DistanceCalculationResult } from '../../../models/DistanceCalculationResult';
import { getOneFromName } from '../../../services/cityService';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {

    const cityOrigin = getOneFromName(_req.query.origin as string);
    const cityDestination = getOneFromName(_req.query.destination as string);
    const intermediateCities: City[] = [];

    if (_req.query.intermediateCities?.length) {
        ((_req.query.intermediateCities as string).split(','))?.forEach((cityName: string) => {
            const cityToAdd = getOneFromName(cityName)
            if (cityToAdd) intermediateCities.push(cityToAdd);
        });
    }

    // @TODO: add a validator logic for this.
    if (!cityOrigin || !cityDestination || !_req.query.passengerQty || !_req.query.date) {
        res.status(400).json({ status: "There are unfilled fields" });
        return;
    }

    const distanceResult: DistanceCalculationResult = getDistanceCalculation({
        cityOrigin: cityOrigin as City,
        cityDestination: cityDestination as City,
        intermediateCities,
        passengerQty: parseInt(_req.query.passengerQty as string),
        date: new Date(_req.query.date as string)
    });

    setTimeout(() => {
        res.status(200).json(distanceResult)
      }, 1000);
}