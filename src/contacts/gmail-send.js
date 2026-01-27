// src/contacts/gmail-send.js
// Gmail API integration for sending emails

/**
 * Send an email via Gmail API
 * @param {string} accessToken - Gmail API access token
 * @param {string|string[]} to - Recipient email(s)
 * @param {string} subject - Email subject
 * @param {string} body - Email body (plain text)
 * @returns {Promise<void>}
 */
export async function sendEmailViaGmail(accessToken, to, subject, body) {
  // Convert to array if single recipient
  const recipients = Array.isArray(to) ? to : [to];

  // Build RFC 2822 formatted email
  const email = [
    `To: ${recipients.join(', ')}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ].join('\r\n');

  // Base64url encode (Gmail API requirement)
  const encodedEmail = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // Send via Gmail API
  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encodedEmail }),
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error?.message || `Gmail API error: ${response.status}`,
    );
  }

  const result = await response.json();
  console.log('[GMAIL] Email sent successfully:', result.id);

  return result;
}

/**
 * Send emails to multiple recipients via Gmail API (one email per recipient)
 * @param {string} accessToken - Gmail API access token
 * @param {Array<{email: string, name: string}>} recipients - Array of recipients
 * @param {string} subject - Email subject
 * @param {string} body - Email body (plain text)
 * @returns {Promise<{sent: number, failed: number, errors: Array}>}
 */
export async function sendBulkEmailsViaGmail(
  accessToken,
  recipients,
  subject,
  body,
) {
  const results = { sent: 0, failed: 0, errors: [] };

  // Send emails sequentially to avoid rate limiting
  for (const recipient of recipients) {
    try {
      await sendEmailViaGmail(accessToken, recipient.email, subject, body);
      results.sent++;
      console.log(`[GMAIL] Sent to ${recipient.name} (${recipient.email})`);
    } catch (err) {
      results.failed++;
      const msg = (err && err.message) || String(err);
      results.errors.push({
        email: recipient.email,
        name: recipient.name,
        error: msg,
      });
      console.error(`[GMAIL] Failed to send to ${recipient.name}:`, msg);
    }
  }

  console.log(
    `[GMAIL] Bulk send complete: ${results.sent} sent, ${results.failed} failed`,
  );
  return results;
}
