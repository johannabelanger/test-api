import { PartialType } from '@nestjs/mapped-types';
import { customerSchema } from './customer.dto';
import { z } from 'zod';

export const updateCustomerSchema = customerSchema;

export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;
