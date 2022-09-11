import { getDistanceCalculation } from "../distanceService";

const dummyCities = [
    {
        name: "testOrigin",
        latitude: 1.1,
        longitude: 1.1
    },
    {
        name: "testDestination",
        latitude: 2.1,
        longitude: 2.1
    }
];

const mockCalculationResult = {
    date: new Date("2022-01-01T00:00:00.000Z"),
    destination: {
        latitude: 2.1,
        longitude: 2.1,
        name: "testDestination"
    },
    origin: {
        latitude: 1.1,
        longitude: 1.1,
        name: "testOrigin"
    },
    passengerQty: 1,
    totalDistance: 157.22172045116508,
    tracks: [
        {
            distance: 157.22172045116508,
            end: {
                latitude: 2.1,
                longitude: 2.1,
                name: "testDestination"
            },
            measure: "Kilometers",
            origin: {
                latitude: 1.1,
                longitude: 1.1,
                name: "testOrigin"
            }
        }
    ]
};

describe("distanceService module", () => {
    describe("when getDistanceCalculation is called with valid params", () => {
        const cities = getDistanceCalculation({ cityOrigin: dummyCities[0], cityDestination: dummyCities[1], date: new Date("2022-01-01"), intermediateCities: [], passengerQty: 1});
        it("should return a list of cities", () => {
            expect(cities).toEqual(mockCalculationResult);
        })
    });
});