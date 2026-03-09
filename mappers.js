import {
  PREGO_STATUS,
  PREGO_PAYMENT_METHOD,
  PREGO_TRANSACTION_RESPONSE,
  PREGO_NETWORK,
  PREGO_DISPUTE_STATUS,
  PREGO_DISPUTE_REASON,
  PREGO_REFUND_STATUS,
  PREGO_REFUND_REASON,
  PREGO_PAYOUT_STATUS,
  CHARGE_STATUS_TO_PREGO_STATUS,
  OUTCOME_TYPE_TO_PREGO_STATUS,
  WALLET_TYPE_TO_PREGO_PAYMENT_METHOD,
  CARD_FUNDING_TO_PREGO_CARD_TYPE,
  OUTCOME_REASON_TO_PREGO_RESPONSE,
  CARD_BRAND_TO_PREGO_NETWORK,
  STRIPE_DISPUTE_STATUS_TO_PREGO,
  STRIPE_DISPUTE_REASON_TO_PREGO,
  STRIPE_REFUND_STATUS_TO_PREGO,
  STRIPE_REFUND_REASON_TO_PREGO,
  STRIPE_PAYOUT_STATUS_TO_PREGO,
  validateEnum,
} from './enums.js';
import { STRIPE_OUTCOME_TYPE } from './constants.js';

function resolveTransactionStatus(charge) {
  const outcomeType = charge.outcome?.type;
  if (outcomeType === STRIPE_OUTCOME_TYPE.AUTHORIZED && charge.captured === false) {
    return PREGO_STATUS.AUTHORIZED;
  }
  if (outcomeType && OUTCOME_TYPE_TO_PREGO_STATUS[outcomeType]) {
    return OUTCOME_TYPE_TO_PREGO_STATUS[outcomeType];
  }
  return CHARGE_STATUS_TO_PREGO_STATUS[charge.status] ?? null;
}

function resolveTransactionResponse(charge) {
  const reason = charge.outcome?.reason;
  if (reason && OUTCOME_REASON_TO_PREGO_RESPONSE[reason]) {
    return OUTCOME_REASON_TO_PREGO_RESPONSE[reason];
  }
  if (!reason && charge.outcome?.type === STRIPE_OUTCOME_TYPE.AUTHORIZED) {
    return PREGO_TRANSACTION_RESPONSE.APPROVED;
  }
  return PREGO_TRANSACTION_RESPONSE.UNKNOWN;
}

function resolvePaymentMethod(charge) {
  const walletType = charge.payment_method_details?.card?.wallet?.type;
  if (walletType && WALLET_TYPE_TO_PREGO_PAYMENT_METHOD[walletType]) {
    return WALLET_TYPE_TO_PREGO_PAYMENT_METHOD[walletType];
  }
  return PREGO_PAYMENT_METHOD.CARD;
}

export function mapTransaction(charge) {
  const card = charge.payment_method_details?.card;
  return {
    transaction_id:             `txn_${charge.id}`,
    prego_status:               validateEnum(resolveTransactionStatus(charge), PREGO_STATUS, 'prego_status'),
    prego_payment_method:       validateEnum(resolvePaymentMethod(charge), PREGO_PAYMENT_METHOD, 'prego_payment_method'),
    prego_card_type:            validateEnum(CARD_FUNDING_TO_PREGO_CARD_TYPE[card?.funding] ?? null, { debit: 'debit', credit: 'credit' }, 'prego_card_type'),
    prego_transaction_response: validateEnum(resolveTransactionResponse(charge), PREGO_TRANSACTION_RESPONSE, 'prego_transaction_response'),
    prego_network:              validateEnum(CARD_BRAND_TO_PREGO_NETWORK[card?.brand?.toLowerCase()] ?? PREGO_NETWORK.UNKNOWN, PREGO_NETWORK, 'prego_network'),
  };
}

export function mapDispute(dispute) {
  return {
    dispute_id:           `dsp_${dispute.id}`,
    prego_dispute_status: validateEnum(STRIPE_DISPUTE_STATUS_TO_PREGO[dispute.status] ?? null, PREGO_DISPUTE_STATUS, 'prego_dispute_status'),
    prego_dispute_reason: validateEnum(STRIPE_DISPUTE_REASON_TO_PREGO[dispute.reason] ?? PREGO_DISPUTE_REASON.UNKNOWN, PREGO_DISPUTE_REASON, 'prego_dispute_reason'),
  };
}

export function mapRefund(refund) {
  const reason = STRIPE_REFUND_REASON_TO_PREGO[refund.reason] ?? PREGO_REFUND_REASON.UNKNOWN;
  return {
    refund_id:           `ref_${refund.id}`,
    prego_refund_status: validateEnum(STRIPE_REFUND_STATUS_TO_PREGO[refund.status] ?? null, PREGO_REFUND_STATUS, 'prego_refund_status'),
    prego_refund_reason: validateEnum(reason.slice(0, 50), PREGO_REFUND_REASON, 'prego_refund_reason'),
  };
}

export function mapPayout(payout) {
  return {
    payout_id:           `pay_${payout.id}`,
    prego_payout_status: validateEnum(STRIPE_PAYOUT_STATUS_TO_PREGO[payout.status] ?? null, PREGO_PAYOUT_STATUS, 'prego_payout_status'),
  };
}
