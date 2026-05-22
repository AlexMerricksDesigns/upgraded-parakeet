# Shop — future dynamic layer (not implemented)

The live site treats **Work / crypto** as a hand-curated **portfolio**. This folder documents what **Shop** will need when commerce and on-chain interaction are real.

## Current state

- [`app/shop/manifest.json`](../../app/shop/manifest.json) — static product list (postcards, limited prints, digital editions).
- [`app/work/crypto/products/digital-editions/page.jsx`](../../app/work/crypto/products/digital-editions/page.jsx) — static shelf; links from crypto portfolio only.
- No wallet SDK, no API routes, no runtime indexer calls.

## Planned capabilities (later)

| Capability | Notes |
|------------|--------|
| Wallet connect | Tezos: Beacon; EVM/Base: WalletConnect or Coinbase Smart Wallet |
| Live listings | Objkt / fxhash / custom contract reads for price & availability |
| Checkout / mint | TBD per product type (physical vs on-chain primary) |
| API routes | Scoped to `/shop` or `/api/shop/*` only — not portfolio pages |

## Likely dependencies (do not install until needed)

- `@taquito/taquito`, `@airgap/beacon-dapp`
- `viem` / `wagmi` for Base
- Server: optional Alchemy or OpenSea API key (same as `scripts/chain/probe-base.mjs`)

## Identities (reference)

See [`content/crypto/identities.json`](../crypto/identities.json):

- Mint: `xanderhizome` / `xander.tez` (tz1 TBD in identities)
- Collect: Under Orchard `tz1NfdmYN9vqG7WmBr2bbfPhTc4BA8SjqgRE`
- Base: `0xa2BA962FAB5f1E1ad25C71Fc81Afe903E825fad8`

## Portfolio vs shop

- **Portfolio** — you add `ThreadTile` data in `content/crypto/` and `app/work/crypto/page.jsx` (search `COPY:`).
- **Shop** — will read chain state at runtime; until then, link out to objkt/fxhash/OpenSea from portfolio tiles.
