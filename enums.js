export const PREGO_STATUS = Object.freeze({
  AUTHORIZED:         'authorized',
  CANCEL_OR_REFUND:   'cancel_or_refund',
  CANCELED:           'canceled',
  CAPTURE:            'capture',
  DEPOSIT:            'deposit',
  FAILED:             'failed',
  GATEWAY_REJECTED:   'gateway_rejected',
  PAID:               'paid',
  PENDING:            'pending',
  PROCESSOR_DECLINED: 'processor_declined',
});

export const PREGO_PAYMENT_METHOD = Object.freeze({
  CARD:       'card',
  APPLE_PAY:  'apple pay',
  GOOGLE_PAY: 'paywithgoogle',
});

export const PREGO_CARD_TYPE = Object.freeze({
  DEBIT:  'debit',
  CREDIT: 'credit',
});

export const PREGO_TRANSACTION_RESPONSE = Object.freeze({
  APPROVED:               'approved',
  INSUFFICIENT_FUNDS:     'insufficient_funds',
  DO_NOT_HONOR:           'do_not_honor',
  CARD_VELOCITY_EXCEEDED: 'card_velocity_exceeded',
  INVALID_ACCOUNT:        'invalid_account',
  FRAUD_DECLINE:          'fraud_decline',
  RESTRICTED_CARD:        'restricted_card',
  LOST_CARD:              'lost_card',
  STOLEN_CARD:            'stolen_card',
  UNKNOWN:                'unknown',
});

export const PREGO_NETWORK = Object.freeze({
  VISA:       'visa',
  MASTERCARD: 'mastercard',
  DISCOVER:   'discover',
  AMEX:       'amex',
  JCB:        'jcb',
  UNKNOWN:    'unknown',
});

export const PREGO_DISPUTE_STATUS = Object.freeze({
  WON:     'won',
  LOST:    'lost',
  PENDING: 'pending',
});

export const PREGO_DISPUTE_REASON = Object.freeze({
  DUPLICATE_PROCESSING:  'duplicate processing',
  FRAUD:                 'fraud',
  STOLEN_CARD:           'stolen card',
  CREDIT_NOT_PROCESSED:  'credit not processed',
  PRODUCT_NOT_RECEIVED:  'product not received',
  SUBSCRIPTION_CANCELED: 'subscription canceled',
  UNRECOGNIZED:          'unrecognized',
  UNKNOWN:               'unknown',
});

export const PREGO_REFUND_STATUS = Object.freeze({
  SUCCESS:  'success',
  PENDING:  'pending',
  REJECTED: 'rejected',
});

export const PREGO_REFUND_REASON = Object.freeze({
  DUPLICATE:             'duplicate',
  FRAUDULENT:            'fraudulent',
  CUSTOMER_REQUEST:      'customer request',
  SUBSCRIPTION_CANCELED: 'subscription canceled',
  UNKNOWN:               'unknown',
});

export const PREGO_PAYOUT_STATUS = Object.freeze({
  PAID:     'paid',
  PENDING:  'pending',
  CANCELED: 'canceled',
});

export const CHARGE_STATUS_TO_PREGO_STATUS = {
  'succeeded':               PREGO_STATUS.PAID,
  'canceled':                PREGO_STATUS.CANCELED,
  'processing':              PREGO_STATUS.PENDING,
  'requires_payment_method': PREGO_STATUS.FAILED,
  'requires_confirmation':   PREGO_STATUS.PENDING,
  'requires_action':         PREGO_STATUS.PENDING,
};

export const OUTCOME_TYPE_TO_PREGO_STATUS = {
  'authorized':      PREGO_STATUS.PAID,
  'issuer_declined': PREGO_STATUS.PROCESSOR_DECLINED,
  'blocked':         PREGO_STATUS.GATEWAY_REJECTED,
  'invalid':         PREGO_STATUS.FAILED,
  'manual_review':   PREGO_STATUS.PENDING,
};

export const WALLET_TYPE_TO_PREGO_PAYMENT_METHOD = {
  'apple_pay':  PREGO_PAYMENT_METHOD.APPLE_PAY,
  'google_pay': PREGO_PAYMENT_METHOD.GOOGLE_PAY,
};

export const CARD_FUNDING_TO_PREGO_CARD_TYPE = {
  'credit':  PREGO_CARD_TYPE.CREDIT,
  'debit':   PREGO_CARD_TYPE.DEBIT,
  'prepaid': PREGO_CARD_TYPE.DEBIT,
};

export const OUTCOME_REASON_TO_PREGO_RESPONSE = {
  'approved':               PREGO_TRANSACTION_RESPONSE.APPROVED,
  'insufficient_funds':     PREGO_TRANSACTION_RESPONSE.INSUFFICIENT_FUNDS,
  'do_not_honor':           PREGO_TRANSACTION_RESPONSE.DO_NOT_HONOR,
  'card_velocity_exceeded': PREGO_TRANSACTION_RESPONSE.CARD_VELOCITY_EXCEEDED,
  'invalid_account_number': PREGO_TRANSACTION_RESPONSE.INVALID_ACCOUNT,
  'fraud_decline':          PREGO_TRANSACTION_RESPONSE.FRAUD_DECLINE,
  'restricted_card':        PREGO_TRANSACTION_RESPONSE.RESTRICTED_CARD,
  'lost_card':              PREGO_TRANSACTION_RESPONSE.LOST_CARD,
  'stolen_card':            PREGO_TRANSACTION_RESPONSE.STOLEN_CARD,
};

export const CARD_BRAND_TO_PREGO_NETWORK = {
  'visa':       PREGO_NETWORK.VISA,
  'mastercard': PREGO_NETWORK.MASTERCARD,
  'discover':   PREGO_NETWORK.DISCOVER,
  'amex':       PREGO_NETWORK.AMEX,
  'jcb':        PREGO_NETWORK.JCB,
};

export const STRIPE_DISPUTE_STATUS_TO_PREGO = {
  'won':                    PREGO_DISPUTE_STATUS.WON,
  'charge_refunded':        PREGO_DISPUTE_STATUS.WON,
  'lost':                   PREGO_DISPUTE_STATUS.LOST,
  'warning_closed':         PREGO_DISPUTE_STATUS.LOST,
  'needs_response':         PREGO_DISPUTE_STATUS.PENDING,
  'under_review':           PREGO_DISPUTE_STATUS.PENDING,
  'warning_needs_response': PREGO_DISPUTE_STATUS.PENDING,
  'warning_under_review':   PREGO_DISPUTE_STATUS.PENDING,
};

export const STRIPE_DISPUTE_REASON_TO_PREGO = {
  'fraudulent':            PREGO_DISPUTE_REASON.FRAUD,
  'duplicate':             PREGO_DISPUTE_REASON.DUPLICATE_PROCESSING,
  'card_stolen':           PREGO_DISPUTE_REASON.STOLEN_CARD,
  'credit_not_processed':  PREGO_DISPUTE_REASON.CREDIT_NOT_PROCESSED,
  'product_not_received':  PREGO_DISPUTE_REASON.PRODUCT_NOT_RECEIVED,
  'subscription_canceled': PREGO_DISPUTE_REASON.SUBSCRIPTION_CANCELED,
  'unrecognized':          PREGO_DISPUTE_REASON.UNRECOGNIZED,
  'general':               PREGO_DISPUTE_REASON.UNKNOWN,
};

export const STRIPE_REFUND_STATUS_TO_PREGO = {
  'succeeded': PREGO_REFUND_STATUS.SUCCESS,
  'pending':   PREGO_REFUND_STATUS.PENDING,
  'failed':    PREGO_REFUND_STATUS.REJECTED,
  'canceled':  PREGO_REFUND_STATUS.REJECTED,
};

export const STRIPE_REFUND_REASON_TO_PREGO = {
  'duplicate':             PREGO_REFUND_REASON.DUPLICATE,
  'fraudulent':            PREGO_REFUND_REASON.FRAUDULENT,
  'requested_by_customer': PREGO_REFUND_REASON.CUSTOMER_REQUEST,
  'subscription_canceled': PREGO_REFUND_REASON.SUBSCRIPTION_CANCELED,
};

export const STRIPE_PAYOUT_STATUS_TO_PREGO = {
  'paid':       PREGO_PAYOUT_STATUS.PAID,
  'pending':    PREGO_PAYOUT_STATUS.PENDING,
  'in_transit': PREGO_PAYOUT_STATUS.PENDING,
  'canceled':   PREGO_PAYOUT_STATUS.CANCELED,
  'failed':     PREGO_PAYOUT_STATUS.CANCELED,
};

export function validateEnum(value, enumObj, fieldName) {
  if (value === null || value === undefined) {
    console.warn(`[WARN] ${fieldName}: no value resolved`);
    return null;
  }
  const allowed = Object.values(enumObj);
  if (!allowed.includes(value)) {
    console.warn(`[WARN] ${fieldName}: "${value}" not valid. Allowed: ${allowed.join(', ')}`);
    return null;
  }
  return value;
}
