# ticker-frontend

[![Integration](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yml/badge.svg)](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=systemli_ticker-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=systemli_ticker-frontend)

The public frontend for the [Ticker project](https://github.com/systemli/ticker). It presents a
single ticker as a live page, updating as new messages arrive.

It is a static single-page application and holds no data of its own; everything lives in the
[ticker](https://github.com/systemli/ticker) API.

## Documentation

**<https://systemli.github.io/ticker/>**

Installation, configuration, deployment and troubleshooting for the whole stack are documented
centrally:

- [Installation](https://systemli.github.io/ticker/installation/) — running the full stack with Docker
- [Configuration](https://systemli.github.io/ticker/configuration/)
- [Troubleshooting](https://systemli.github.io/ticker/troubleshooting/)

The published image is [`systemli/ticker-frontend`](https://hub.docker.com/r/systemli/ticker-frontend).

## Screenshots

[![Screenshot Desktop](assets/screenshot-desktop-default-small.png)](assets/screenshot-desktop-default.png)
[![Screenshot Desktop](assets/screenshot-desktop-dark-small.png)](assets/screenshot-desktop-dark.png)

[![Screenshot Mobile](assets/screenshot-mobile-default-small.png)](assets/screenshot-mobile-default.png)
[![Screenshot Mobile](assets/screenshot-mobile-dark-small.png)](assets/screenshot-mobile-dark.png)

## Development

**Requirements:** Node 24 (see `.nvmrc`) and a running [ticker](https://github.com/systemli/ticker)
API.

```shell
nvm use
npm install
npm run dev        # http://localhost:4000
```

Point it at your API with a `.env` file. The URL must include the `/v1` suffix:

```shell
TICKER_API_URL=http://localhost:8080/v1
```

Without this the application falls back to a relative `/api`, which only works when something is
proxying that path — as the Docker image expects. Restart the dev server after changing `.env`.

> **The ticker must know this address.** The API works out which ticker to serve from the browser's
> `Origin` header, so `http://localhost:4000` has to be registered under the ticker's websites in the
> admin interface. Otherwise the page only ever shows "The ticker is currently inactive".

### Commands

```shell
npm test           # vitest, watch mode
npm run coverage
npm run lint
npm run build
npm run preview
```

Note the service worker is only registered in production builds, so PWA behaviour does not appear
under `npm run dev`.

See [AGENTS.md](AGENTS.md) for architecture and conventions, and the
[development guide](https://systemli.github.io/ticker/development/) for working across the three
repositories.

## Localization

Strings live in the [locales](./src/i18n/locales) folder. To add a language, update:

- [i18n.ts](./src/i18n/i18n.ts) to register it
- [MessageTime.tsx](./src/components/MessageTime.tsx) for `dayjs` relative times

Use the `t('stringKey')` notation for new strings and update all locales.

## Licence

GPL-3.0. See [LICENSE](LICENSE).
