import { z } from 'zod';

export const accountSchema = z
    .object({
        id: z.number(),
        accountName: z.string(),
    }).required();

export type AccountDto = z.infer<typeof accountSchema>;