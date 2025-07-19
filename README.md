# Cantonese Dictionary App

A modern web-based Cantonese dictionary built with Nuxt 3. Search for Cantonese words, phrases, and their meanings with support for traditional characters, Jyutping romanization, and English translations.

## Features

- 🔍 **Smart Search** - Search in Cantonese characters, Jyutping, or English
- ⚡ **Fast Performance** - Server-side parsing and optimized search
- 📱 **Responsive Design** - Works perfectly on all devices

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Dictionary Data

The dictionary data used is taken from https://cantonese.org/download.html


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## API Endpoints

- `GET /api/dictionary` - Returns the parsed dictionary as a key-value store

## Project Structure

```
nuxt-app/
├── data/
│   └── cccanto-webdist.txt    # Dictionary data file
├── server/
│   └── api/
│       └── dictionary.js      # Dictionary API endpoint
├── app.vue                    # Main application component
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information on deploying to various platforms.

