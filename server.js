import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3001);
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const sessions = new Set();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'data', 'portal-store.json');

await fs.mkdir(path.dirname(dataFile), { recursive: true });

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

async function readStore() {
  try {
    return JSON.parse(await fs.readFile(dataFile, 'utf8'));
  } catch {
    return { experiences: null, blockedDates: [] };
  }
}

async function writeStore(store) {
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2));
}

app.post('/api/admin/login', (req, res) => {
  if (req.body?.password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  sessions.add(token);
  res.json({ token });
});

app.post('/api/admin/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/content', async (_req, res) => {
  res.json(await readStore());
});

app.put('/api/admin/content', requireAdmin, async (req, res) => {
  const store = await readStore();
  const next = {
    experiences: Array.isArray(req.body.experiences) ? req.body.experiences : store.experiences,
    blockedDates: Array.isArray(req.body.blockedDates) ? req.body.blockedDates : store.blockedDates,
  };
  await writeStore(next);
  res.json(next);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Jignasa backend listening on http://localhost:${port}`);
});
