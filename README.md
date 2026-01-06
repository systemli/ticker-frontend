# ticker-frontend

[![Integration](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yaml/badge.svg)](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yaml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend)

This is the frontend for the [ticker project](https://github.com/systemli/ticker).
It provides a simple single page website to present your ticker.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= v22.14.0, lts/jod)
- [Ticker](https://github.com/systemli/ticker) running on <http://localhost:8080>

### First start

1. Optional: Install NodeJS with nvm

    ```bash
    nvm use
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the development server

    ```bash
    npm run dev
    ```

4. Open the website in your browser: <http://localhost:4000>

## Screenshots

[![Screenshot Desktop](assets/screenshot-desktop-default-small.png)](assets/screenshot-desktop-default.png)
[![Screenshot Desktop](assets/screenshot-desktop-dark-small.png)](assets/screenshot-desktop-dark.png)

[![Screenshot Mobile](assets/screenshot-mobile-default-small.png)](assets/screenshot-mobile-default.png)
[![Screenshot Mobile](assets/screenshot-mobile-dark-small.png)](assets/screenshot-mobile-dark.png)

## Localization

Strings are localized on the [locales](./src/i18n/locales) folder. To add more languages, please update those files:

- [i18n.ts](./src/i18n/i18n.ts) to localize all strings
- [MessageTime.tsx](./src/components/MessageTime.tsx) to localize `dayjs` relative times

To add a new string, please use the `t('stringKey')` notation and update all the locales.

## License

GPL-3.0 license. See [LICENSE](LICENSE) for more information.
