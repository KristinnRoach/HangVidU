// Local admin proxy for rtdb-live.html — bypasses App Check via service account.
// Never deploy this; it is a local dev tool only.
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import admin from 'firebase-admin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  readFileSync(
    join(__dirname, '../functions/service-account-key.json'),
    'utf-8',
  ),
);

const databaseURL = process.env.VITE_FIREBASE_DATABASE_URL;
if (!databaseURL)
  throw new Error('VITE_FIREBASE_DATABASE_URL not set — run via pnpm rtdb');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

const db = admin.database();

function shallowify(val) {
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(Object.keys(val).map((k) => [k, true]));
  }
  return val;
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET, OPTIONS' });
    res.end();
    return;
  }

  const url = new URL(req.url, 'http://localhost:8081');
  const path = url.pathname.replace(/^\//, '') || '/';
  const shallow = url.searchParams.get('shallow') === 'true';

  try {
    const snapshot = await db.ref(path).once('value');
    let val = snapshot.val();
    if (shallow) val = shallowify(val);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(val));
  } catch (err) {
    res.writeHead(500);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  }
});

const PORT = 8081;
server.listen(PORT, () =>
  console.log(`[rtdb-proxy] listening on http://localhost:${PORT}`),
);
