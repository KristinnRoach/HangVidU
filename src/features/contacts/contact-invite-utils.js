export function getReferralLink(appOrigin, userId) {
  return userId ? `${appOrigin}/?ref=${userId}` : appOrigin;
}
