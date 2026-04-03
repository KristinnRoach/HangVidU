// src/contacts/google-contacts.js
// Fetches contacts from Google People API

const CONNECTIONS_URL = 'https://people.googleapis.com/v1/people/me/connections';
const OTHER_CONTACTS_URL = 'https://people.googleapis.com/v1/otherContacts';

/**
 * Fetch contacts from Google People API.
 * Fetches from both "My Contacts" and "Other contacts" collections.
 * @param {string} accessToken - Google OAuth access token with contacts.readonly scope
 * @returns {Promise<Array<{email: string, name: string}>>} - Array of contacts with email addresses
 */
export async function fetchGoogleContacts(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  const contacts = [];

  // Fetch from "My Contacts" (connections)
  const myContacts = await fetchFromEndpoint(accessToken, CONNECTIONS_URL, 'names,emailAddresses');
  console.log(`[GOOGLE CONTACTS] My Contacts: ${myContacts.length}`);
  contacts.push(...myContacts);

  // Fetch from "Other contacts" (auto-saved contacts from email, etc.)
  const otherContacts = await fetchFromEndpoint(accessToken, OTHER_CONTACTS_URL, 'names,emailAddresses');
  console.log(`[GOOGLE CONTACTS] Other Contacts: ${otherContacts.length}`);
  contacts.push(...otherContacts);

  console.log(`[GOOGLE CONTACTS] Total: ${contacts.length} contacts with email addresses`);

  // Deduplicate by email (keep first occurrence)
  const seen = new Set();
  const unique = contacts.filter((c) => {
    if (seen.has(c.email)) return false;
    seen.add(c.email);
    return true;
  });

  return unique;
}

/**
 * Fetch contacts from a specific People API endpoint with pagination.
 */
async function fetchFromEndpoint(accessToken, baseUrl, personFields) {
  const contacts = [];
  let nextPageToken = null;

  do {
    const url = new URL(baseUrl);
    url.searchParams.set('pageSize', '100');

    // Different parameter name for otherContacts endpoint
    if (baseUrl.includes('otherContacts')) {
      url.searchParams.set('readMask', personFields);
    } else {
      url.searchParams.set('personFields', personFields);
    }

    if (nextPageToken) {
      url.searchParams.set('pageToken', nextPageToken);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      // Log but don't throw for otherContacts - it may fail if scope not granted
      if (baseUrl.includes('otherContacts')) {
        console.warn('[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):', error.error?.message);
        return contacts;
      }
      console.error('[GOOGLE CONTACTS] API error:', error);
      throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract contacts - different response structure for each endpoint
    const people = data.connections || data.otherContacts || [];

    for (const person of people) {
      const emails = person.emailAddresses || [];
      const names = person.names || [];
      const name = names[0]?.displayName || 'Unknown';

      for (const emailObj of emails) {
        if (emailObj.value) {
          contacts.push({
            email: emailObj.value.toLowerCase().trim(),
            name,
          });
        }
      }
    }

    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return contacts;
}
