import { z } from 'zod';

export const CallResponseType = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELED: 'canceled',
  TIMED_OUT: 'timedOut',
} as const;

export const CallInviteSchema = z.object({
  roomId: z.string().min(1),
  callerId: z.string().min(1),
  callerName: z.string().min(1).optional(),
  audioOnly: z.boolean().optional(),
  startedAt: z.number(),
});

export const CallResponseSchema = z.object({
  roomId: z.string().min(1),
  responseType: z.enum(['accepted', 'rejected', 'canceled', 'timedOut']),
  by: z.string().min(1),
  respondedAt: z.number(),
});

export const ActiveCallSchema = z.object({
  roomId: z.string().min(1),
  with: z.string().min(1),
  startedAt: z.number(),
});

export type CallInvite = z.infer<typeof CallInviteSchema>;
export type CallResponse = z.infer<typeof CallResponseSchema>;
export type ActiveCall = z.infer<typeof ActiveCallSchema>;

export const parseCallInvite = (data: unknown): CallInvite =>
  CallInviteSchema.parse(data);
export const parseCallResponse = (data: unknown): CallResponse =>
  CallResponseSchema.parse(data);
export const parseActiveCall = (data: unknown): ActiveCall =>
  ActiveCallSchema.parse(data);
