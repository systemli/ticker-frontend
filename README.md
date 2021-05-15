# ticker-frontend ![CI/CD](https://github.com/systemli/ticker-frontend/workflows/CI/CD/badge.svg)

__Currently this is the last commit that works on most machines as production commit due to an legacy dependency in NodeJS: [`d03982f`](https://github.com/systemli/ticker-frontend/commit/d03982f3059d6335a9e9ec0abcb71813ccbafef7)!__

Checkout this branch like this: `git checkout d03982f3059d6335a9e9ec0abcb71813ccbafef7`

## Development

**Requirement:** Running instance of [ticker](https://github.com/systemli/ticker), default: http://localhost:8080/v1

```
# Install dependencies
yarn

# Start development server (http://localhost:4000)
yarn start
```

## Configuration

Place configuration in `.env` file and restart/rebuild the ticker-frontend

```
REACT_APP_API_URL=http://localhost:8080/v1
```

## Using in production

[INSTALLATION.MD](docs/INSTALLATION.MD)
