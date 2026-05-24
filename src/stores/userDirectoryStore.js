import { getUserProfile } from '../storage/user/index.js';
import {
  lookupUserByEmail,
  findUsersByEmails,
} from '../storage/user/user-discovery.js';

export function getPublicUserProfile(userId) {
  return getUserProfile(userId);
}

export function lookupRegisteredUserByEmail(email) {
  return lookupUserByEmail(email);
}

export function findRegisteredUsersByEmails(emails) {
  return findUsersByEmails(emails);
}