# How far is it?

[![CI/CD Pipeline](https://github.com/manufarfaro/how-far-is-it/actions/workflows/ci.yml/badge.svg)](https://github.com/manufarfaro/how-far-is-it/actions/workflows/ci.yml)

This is a simple app that uses React + NextJS + Typescript + Playwright.

## Running the project

### Locally
You can run the development server:

```bash
npm run dev
```

### Building for production usage

To get a production bundle you can run the following command

```bash
npm run build
```

## Running tests

```bash
npm test
```

## API Routes

### Get Cities

`http://localhost:3000/city`:

```js
[{
    name: string,
    latitude: number,
    longitude: number
}]
```

`http://localhost:3000/distance/calculate?origin=Marseille&destination=Nice&intermediateCities=Strasbourg&intermediateCities=Paris&passengerQty=1&date=2022-09-11`:

```js
{
    origin: {
        name: :string,
        latitude: number,
        longitude: number,
    },
    destination: {
        name: :string,
        latitude: number,
        longitude: number
    },
    tracks: [
        {
            measure: "Kilometers",
            distance: number,
            origin: {
                name: :string,
                latitude: number,
                longitude: number,
            },
            end: {
                name: :string,
                latitude: number,
                longitude: number
            },
        },
        totalDistance: number,
        passengerQty: number,
        date: Date
    ]
}
```
