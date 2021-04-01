## Gistmarks.io

Gistmarks.io is a bookmark manager that uses Github Gist to save and share bookmarks.

[![Build Status](https://github.com/sgolovine/gistmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/sgolovine/gistmarks/actions/workflows/ci.yml)

[![APP Deploy Status](https://api.netlify.com/api/v1/badges/203e38fd-2db3-4c6f-ba9f-131dc129a76c/deploy-status)](https://app.netlify.com/sites/gistmarks-io/deploys)

[![API Deploy Status](https://api.netlify.com/api/v1/badges/18290c89-829d-4f1a-b96d-ef578fd788b0/deploy-status)](https://app.netlify.com/sites/gistmarks-api/deploys)

[Go to Site](https://gistmarks.io)
[Go to App](https://app.gistmarks.io)
[Go to API](https://api.gistmarks.io)

## Development

### Pre-requisites

- NodeJS v10+ (any recent node version will work)
- Yarn (npm install -g yarn)

### Setup

1. Clone the repository (`git clone git@github.com:sgolovine/gistmarks.git`)
2. Copy `.env.example` to `.env` and replace the keys inside with your own.
3. Run `yarn install` to install dependencies
4. Run `yarn start` to start the development server

### Testing Production builds Locally

1. `yarn build`
2. `yarn serve`
3. `https://localhost:5000`

### Deployment

WIP
