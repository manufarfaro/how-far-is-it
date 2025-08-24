export type SearchDistanceQuery = {
    origin: string;
    destination: string;
    passengerQty: number;
    date: string;
    intermediateCities?: string;
};