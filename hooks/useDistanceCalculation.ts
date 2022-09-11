import { useEffect, useState } from "react";
import { DistanceCalculationResult } from "../models/DistanceCalculationResult";
import { SearchDistanceQuery } from "../models/SearchDistanceQuery";

const useDistanceCalculation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();
    const [distanceResult, setDistanceResult] = useState<DistanceCalculationResult>();

    async function calculateDistance(params: SearchDistanceQuery) {
        try {
            setLoading(true);
            const response = await fetch("/api/distance/calculate?" + new URLSearchParams({...params}));
            const resultJson = await response.json();
            setDistanceResult(resultJson as DistanceCalculationResult);
        } catch (error: unknown) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {calculateDistance, distanceResult, loading, error};
};

export default useDistanceCalculation;