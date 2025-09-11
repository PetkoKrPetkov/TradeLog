import { z } from 'zod';

// YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const tradeSchema = z.object({
  ticker: z
    .string()
    .trim()
    .min(1, 'Ticker is required')
    .max(15, 'Ticker is too long (max 15 characters)'),

  date: z
    .string()
    .regex(dateRegex, 'Date must be in format YYYY-MM-DD'),

  // Zod enum with custom message
  trade_direction: z.enum(['long', 'short', 'other'], {
    message: 'Select a direction: long / short / other',
  }),

  entry: z.coerce
    .number()
    .refine((v) => Number.isFinite(v), 'Entry must be a valid number')
    .gt(0, 'Entry must be greater than 0'),

  exit: z
    .union([
      z.coerce
        .number()
        .refine((v) => Number.isFinite(v), 'Exit must be a valid number')
        .min(0, 'Exit cannot be negative'),
      z.null(),
    ])
    .optional(),

  volume: z.coerce
    .number()
    .refine((v) => Number.isInteger(v), 'Volume must be an integer')
    .positive('Volume must be greater than 0'),

  support: z
    .string()
    .trim()
    .max(100, 'Support is too long (max 100 characters)')
    .optional()
    .nullable(),
  ma: z
    .string()
    .trim()
    .max(100, 'MA is too long (max 100 characters)')
    .optional()
    .nullable(),
  price_action: z
    .string()
    .trim()
    .max(200, 'Price action is too long (max 200 characters)')
    .optional()
    .nullable(),
  oscilators: z
    .string()
    .trim()
    .max(200, 'Oscillators is too long (max 200 characters)')
    .optional()
    .nullable(),
  strategy: z
    .string()
    .trim()
    .max(100, 'Strategy is too long (max 100 characters)')
    .optional()
    .nullable(),
  // Comma separated input; will be split client-side
  tags: z
    .string()
    .trim()
    .max(200, 'Tags are too long (max 200 characters)')
    .optional()
    .nullable(),
});

export type TradeForm = z.infer<typeof tradeSchema>;
