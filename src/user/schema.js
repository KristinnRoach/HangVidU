// src/user/schema.js
// Data shapes for user profiles, presence, and discovery

import { z } from 'zod';

export const UserProfileSchema = z.object({
  displayName: z.string().nullable().optional(),
  photoURL: z.string().nullable().optional(),
});

export const PresenceStateSchema = z.object({
  state: z.enum(['online', 'offline']),
  lastSeen: z.number().optional(),
  lastChanged: z.number(),
});

export const DirectoryEntrySchema = z.object({
  uid: z.string().min(1),
  displayName: z.string(),
  photoURL: z.string().nullable().optional(),
  registeredAt: z.number(),
});

export const parseUserProfile = (data) => UserProfileSchema.parse(data);
export const parsePresenceState = (data) => PresenceStateSchema.parse(data);
export const parseDirectoryEntry = (data) => DirectoryEntrySchema.parse(data);
