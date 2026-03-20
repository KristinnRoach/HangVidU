import { z } from 'zod';

export const TimestampStringSchema = z.string().regex(/^\d+$/);
export const NonEmptyStringSchema = z.string().min(1);
