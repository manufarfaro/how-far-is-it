import { useState, useEffect } from "react";
import { City } from "../models/City";
import { SelectDropdownCity } from "../models/SelectDropdownCity";

const useGetCities = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();
    const [cities, setCities] = useState<SelectDropdownCity[]>([]);

    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true);
                const response = await fetch("/api/city?fields=name");
                const cityJson = await response.json();
                setCities((cityJson as string[]).map(i => ({value: i, label: i})));
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        if (!cities.length) {
            fetchCities();
        }
    }, [cities]);
    
    
    return {cities, loading, error}
}

export default useGetCities;