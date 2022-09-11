import type { City } from '../models/City';
import data from '../data/cities.json';

const cities: City[] = ((data as unknown) as [string, number, number][]).map(i => ({ name: i[0], latitude: i[1], longitude: i[2] } as City));

const getAll = () => cities;

const getOneFromName = (cityName: string): City | undefined => cities.find(i => i.name === cityName);

export {
    getAll,
    getOneFromName
};
