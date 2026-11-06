# Branching and merging strategy

- `main`: production-ready, protected in a hosted team repository.
- `develop`: shared integration branch; feature work is merged here by pull request.
- `feature/auth`: registration and login.
- `feature/catalog-search`: catalogue, product search and filtering.
- `feature/cart`: cart state and quantity/removal flows.
- `feature/orders-payment`: order history and simulated checkout.
- `feature/admin-dashboard`: admin inventory view.

Each developer creates a feature branch from the latest `develop`, commits small
reviewable changes, fetches and rebases/merges `develop` before opening a pull
request, then merges only after review and tests. Use pull requests, CI checks,
and branch protection in a real remote repository.
