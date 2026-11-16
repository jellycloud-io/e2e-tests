# e2e-tests

This repository contains smoke-test entry points for the deployed UI, serverless
API, and Kubernetes cluster. The tests use configurable endpoints and the
current `kubectl` context so they can be run against the environment under test.

## Setup

Requires Node.js 18 or newer and, for cluster tests, `kubectl` configured for
the target cluster.

```sh
npm ci
npx playwright install chromium
```

## Running tests

Set the target URL before running the relevant suite:

```sh
UI_BASE_URL=https://your-ui.example npm run test:ui
SERVER_HEALTH_URL=https://your-api.example/health npm run test:server
K8S_INTEGRATION=1 npm run test:k8s
```

`UI_READY_SELECTOR` optionally sets the UI element that must be visible (defaults
to `body`). `KUBE_CONTEXT` optionally selects the Kubernetes context; otherwise
the current `kubectl` context is used. Kubernetes tests are opt-in to avoid
accessing a cluster unintentionally. The UI and server smoke tests are skipped
when their target URL is not set.

Run all configured suites with `npm test`. Unconfigured suites are reported as
skipped. These checks are starting points for adding application-specific UI
assertions and serverless API behavior tests.
