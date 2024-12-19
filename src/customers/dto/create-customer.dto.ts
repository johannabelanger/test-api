import { z } from 'zod';
import { customerSchema } from './customer.dto';

const e164Regex = /^\+(?:[0-9]){6,14}[0-9]$/;

export const createCustomerSchema = customerSchema;

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
