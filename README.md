# Prego Technical Exercise

## How to Run

```bash
node index.js
```

Reads all JSON files from the `sample data/` directory and writes `output.json`.

---

## Stripe Fields Relied On

**Transactions (charge objects)**
- `id` — source for `transaction_id`
- `status` — fallback for `prego_status`
- `captured` — distinguishes authorized-only from fully paid
- `outcome.type` — primary signal for `prego_status`
- `outcome.reason` — source for `prego_transaction_response`
- `payment_method_details.card.brand` — source for `prego_network`
- `payment_method_details.card.funding` — source for `prego_card_type`
- `payment_method_details.card.wallet.type` — source for `prego_payment_method`

**Disputes** — `id`, `status`, `reason`

**Refunds** — `id`, `status`, `reason`

**Payouts** — `id`, `status`

---

## How Each Enum Was Derived

**prego_status** uses a priority chain:
1. If `outcome.type === "authorized"` and `captured === false` → `authorized` (hold placed, not yet settled)
2. If `outcome.type` is present → map it (`issuer_declined` → `processor_declined`, `blocked` → `gateway_rejected`, etc.)
3. Fall back to `charge.status` (`succeeded` → `paid`, `canceled` → `canceled`, etc.)

**prego_payment_method** — if `card.wallet.type` is present use it (`apple_pay` → `apple pay`, `google_pay` → `paywithgoogle`), otherwise `card`.

**prego_card_type** — directly from `card.funding` (`credit` → `credit`, `debit` / `prepaid` → `debit`).

**prego_transaction_response** — from `outcome.reason`. If reason is null but `outcome.type` is `authorized`, inferred as `approved`.

**prego_network** — from `card.brand` (lowercased). Unknown brands fall back to `unknown`.

**prego_dispute_status** — Stripe's `needs_response`, `under_review`, and `warning_*` variants all map to `pending`. `charge_refunded` maps to `won`.

**prego_dispute_reason** — semantic match: `fraudulent` → `fraud`, `duplicate` → `duplicate processing`, `card_stolen` → `stolen card`, etc.

**prego_refund_status** — `succeeded` → `success`, `failed`/`canceled` → `rejected`.

**prego_refund_reason** — `requested_by_customer` → `customer request`, others mapped directly.

**prego_payout_status** — `in_transit` treated as `pending`. `failed` treated as `canceled`.

---

## ID Design

All IDs are deterministic: `{prefix}_{stripe_id}`

| Entity | Prefix | Example |
|---|---|---|
| Transaction | `txn_` | `txn_ch_3PREG0Auth0001` |
| Dispute | `dsp_` | `dsp_dp_3PREG0Dispute0001` |
| Refund | `ref_` | `ref_re_3PREG0Refund0001` |
| Payout | `pay_` | `pay_po_3PREG0Payout0001` |

Stripe IDs are globally unique and stable, so the resulting Prego IDs are too. All stay well within the 255-character limit.

---

## Assumptions

- `prepaid` card funding is treated as `debit` — prepaid cards behave like debit from a classification standpoint
- `outcome.type` takes precedence over `charge.status` for `prego_status`, except when `captured === false` which must be checked first
- Missing or null `wallet` means the payment was a plain card transaction
- Unrecognized card brands fall back to `unknown` rather than failing
- The two charge samples for the same charge ID (`ch_3PREG0Auth0001`) intentionally represent different lifecycle stages of the same underlying payment — authorized first, then captured

---

## What I Would Improve With More Time

- Add support for native `payment_intent` objects (currently only `charge` objects are handled)
- Drive enum validation from the CSV directly rather than hardcoding values in `enums.js`
- Add unit tests per mapper function covering edge cases (null wallet, unknown brand, missing outcome, etc.)
- Add a `source_file` field to each output record for traceability during debugging
