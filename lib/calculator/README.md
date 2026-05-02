# BADA Calculator Seed Data for Claude Code

Use these files because Claude Code / VS Code may not allow attaching or reading `.xlsx` files directly.

Place this folder in the project as:

`lib/calculator/`

Files:
- `types.ts`: shared calculator types.
- `config.ts`: calculator configuration from the seed Excel.
- `seedTariffs.ts`: public and advisor tariff seed rows.
- `seedRoutes.ts`: route/cobertura seed rows.

Implementation rules:
- Do not hardcode states, zones, routes, or tariffs inside `app/cotizar/page.tsx`.
- Use these seed files for the first implementation.
- Later, these values should come from admin/database/Excel import.
- `whatsappAsesor` is intentionally `PENDIENTE_WHATSAPP_ASESOR`; do not use a fake phone number in production.
- `ecommerce` is pending validation; do not treat it as automatic until the client confirms it.

Suggested files:
- `app/cotizar/page.tsx`
- `components/calculator/QuoteCalculator.tsx`
- `components/calculator/MobileQuoteSticky.tsx`
- `lib/calculator/calculateQuote.ts`
- `lib/calculator/config.ts`
- `lib/calculator/seedRoutes.ts`
- `lib/calculator/seedTariffs.ts`
- `lib/calculator/types.ts`
