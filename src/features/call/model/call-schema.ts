import { z } from 'zod';

export const CallResponseType = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  BUSY: 'busy',
} as const;

export const CallInviteSchema = z.object({
  roomId: z.string().min(1),
  callerId: z.string().min(1),
  calleeId: z.string().min(1).optional(),
  callerName: z.string().min(1).optional(),
  audioOnly: z.boolean().optional(),
  startedAt: z.number(),
  expiresAt: z.number().optional(),
});

export const CallResponseSchema = z.object({
  roomId: z.string().min(1),
  responseType: z.enum(['accepted', 'rejected', 'busy']),
  by: z.string().min(1),
  respondedAt: z.number(),
  expiresAt: z.number().optional(),
});

export type CallInvite = z.infer<typeof CallInviteSchema>;
export type CallResponse = z.infer<typeof CallResponseSchema>;

export const parseCallInvite = (data: unknown): CallInvite =>
  CallInviteSchema.parse(data);
export const parseCallResponse = (data: unknown): CallResponse =>
  CallResponseSchema.parse(data);
