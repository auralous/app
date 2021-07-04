# @auralous/web

This is the Next.js frontend of Auralous.

## Development

### Prerequisites

The following tools must be installed:

- [Node](https://nodejs.org/) 14.x ([nvm](https://github.com/nvm-sh/nvm) recommended)

### Environment variables

Certain environment variables are required to run this application:

- `APP_URI`: URL of this web app
- `API_URI`: URL of the API Server
- `WEBSOCKET_URI`: URL of the WebSocket server
- `SPOTIFY_CLIENT_ID`: The Spotify Client ID for use in the Web Playback SDK. See [developer.spotify.com](https://developer.spotify.com/)
- `FACEBOOK_APP_ID`: (optional) The Facebook App ID. See [developers.facebook.com](https://developers.facebook.com/).
- `MAPBOX_ACCESS_TOKEN`: [Mapbox](https://www.mapbox.com/) access token.
- `FATHOM_SITE_ID`: (optional) [Fathom](https://usefathom.com/) site ID for analytics.
- `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`: (optional) Sentry environment variables: the first one for error reporting and the second for source map uploading.

Create a `.env.local` file in the working dir to [set the environment variables](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables). For development, set `APP_URI` to `http://localhost:3000`, `API_URI` to `https://api.auralous.com`, `WEBSOCKET_URI` to `wss://api.auralous.com`, and `SENTRY_DSN` to `https://foo@bar.ingest.sentry.io/0`.

### Authentication

You cannot sign in to Auralous directly from the development app. See [#17](https://github.com/auralous/auralous/issues/17) for instruction on how to authenticate.

### Workflows

Upon cloning this repository, run `-- ` to install required dependencies.

#### `yarn dev`

Run `yarn dev` to start the app in development mode. This enables hot-code reloading and error reporting. See [`next dev`](https://nextjs.org/docs/api-reference/cli#development).

#### `yarn build`

Running `yarn build` will create an optimized production build of your application. To also analyzing build size set the env variable `ANALYZE=true`.

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation. See [LICENSE](LICENSE) file in this repository for the full text.
