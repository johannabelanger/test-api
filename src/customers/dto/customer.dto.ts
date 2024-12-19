import { z } from 'zod';

const e164Regex = /^\+(?:[0-9]){6,14}[0-9]$/;

export const customerSchema = z
    .object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().regex(e164Regex),
    }).required();

export type CustomerDto = z.infer<typeof customerSchema>;
