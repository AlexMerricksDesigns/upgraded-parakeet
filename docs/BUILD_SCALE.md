# Build scale notes (~1000 photograph routes)

Captured photograph routes use **ISR** (`revalidate = 3600`, `dynamicParams = true`) so new CSV rows can appear without rebuilding every slug immediately.

When static build time becomes painful:

1. Keep hub grids client-paginated (`PaginatedCapturedGrid`).
2. Consider lowering pre-rendered slug count in `generateStaticParams` and rely on on-demand generation for the long tail.
3. Split `photography-manifest.json` into a lightweight index + full catalog if JSON size exceeds ~5 MB.

Measure with `npm run build` after bulk imports. See [`OPERATIONS_CHECKLIST.md`](../OPERATIONS_CHECKLIST.md) `TEST-BUILD-*`.
