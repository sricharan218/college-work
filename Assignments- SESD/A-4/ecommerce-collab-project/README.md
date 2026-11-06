# ShopSphere — Collaborative E-Commerce Demo

A browser-based e-commerce application built as a collaborative Git assignment.

## Run
Open `index.html` in a modern browser. No build tools are required.

## Features
- Registration and login (demo/local browser storage only)
- Product catalogue, search and category filtering
- Shopping cart and quantity updates
- Order creation and order history
- Simulated checkout/payment (no real payment is processed)
- Admin dashboard for product inventory

## Team branch plan
`main` = stable integrated release; `develop` = integration line.
Feature branches: `feature/auth`, `feature/catalog-search`, `feature/cart`,
`feature/orders-payment`, `feature/admin-dashboard`.

The Git history is a teaching simulation. The commits are authored with distinct
developer identities to demonstrate parallel work; no real remote hosting account
is connected. Configure a remote URL of your own before using `git push`.
\n- auth: Auth feature: registration, login, logout and demo session state.
\n- catalog-search: Catalog feature: product cards, text search and category filtering.
