# TS-007-Vue3.3

Personal Expense Tracker for recording income and expenses, organizing custom categories, and reviewing dashboard and monthly spending summaries. Transactions and custom categories persist in browser localStorage.

## Tech stack
Vue 3 (Composition API, <script setup>) + TypeScript, Vite, Tailwind CSS, Vue Router, Pinia.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:59477

## Environment variables
See .env.example. VITE_API_URL is optional — every entity runs on local mock data (USE_MOCK = true in each src/stores/<entity>.ts) until it's set and each entity's flag is flipped to false.

## Project structure
src/assets — Global Tailwind styles.
src/components — Reusable navigation, metrics, dialog, and transaction form components.
src/data — Seed mock data for local development.
src/layouts — Shared authenticated-style application shell.
src/router — Vue Router route definitions.
src/services — Shared API client.
src/stores — Pinia persistence and API-gated entity stores.
src/types — Shared TypeScript domain types.
src/utils — Currency and date formatting helpers.
src/views — Route-level screens and smoke tests.
