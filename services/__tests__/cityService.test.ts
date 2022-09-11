import { getAll, getOneFromName } from "../cityService";

import dummyCities from "../../data/cities.json";
console.log(dummyCities);

const mockDefault = () => ({
    __esModule: true,
    default: dummyCities,
});

jest.mock('../../data/cities.json', mockDefault);

const mockCities = [{
    latitude: 1.1,
    longitude: 1.1,
    name: "test",
}]

describe("cityService module", () => {
    describe("when getAll is called", () => {
        const cities = getAll();
        it("should return a list of cities", () => {
            expect(cities).toEqual(mockCities);
        })
    });
    describe("when getOneFromName is called with a valid city name", () => {
        const testCity = getOneFromName("test");
        it("should return a city object", () => {
            expect(testCity).toEqual(mockCities[0]);
        })
    })
    describe("when getOneFromName is called with an invalid city name", () => {
        const testCity = getOneFromName("notfound");
        it("should return undefined", () => {
            expect(testCity).toBeUndefined();
        })
    })
});