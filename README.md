# ticker-frontend 

[![Integration](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yaml/badge.svg)](https://github.com/systemli/ticker-frontend/actions/workflows/integration.yaml) [![codecov](https://codecov.io/gh/systemli/ticker-frontend/branch/main/graph/badge.svg?token=bjZUlRawuh)](https://codecov.io/gh/systemli/ticker-frontend)

## Development

**Requirement:** Running instance of [ticker](https://github.com/systemli/ticker), default: http://localhost:8080/v1

```
# Install dependencies
yarn

# Start development server (http://localhost:4000)
yarn start
```

## Configuration

Place configuration in `.env` file and restart/rebuild the ticker-admin

```
REACT_APP_API_URL=http://localhost:8080/v1
```
