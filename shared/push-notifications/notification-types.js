import { z } from 'zod';

export const NotificationTypeSchema = z.enum([
  'incoming_call',
  'missed_call',
  'message',
]);
