import dns from 'dns';
import pkg from 'pg';
const { Client } = pkg;

const regions = [
  'eu-central-1',
  'eu-west-1',
  'eu-west-3',
  'me-central-1',
  'me-south-1',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'ap-southeast-1'
];

async function checkPoolers() {
  for (const r of regions) {
    const host = `aws-0-${r}.pooler.supabase.com`;
    try {
      await dns.promises.lookup(host);
      console.log(`Resolved: ${host}`);
      // Try connecting
      const client = new Client({
        host,
        port: 6543,
        user: 'postgres.iyhwwlzmmakgayhihtje',
        password: process.env.SUPABASE_DB_PASSWORD || 'Asmael010@#',
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 3000
      });
      try {
        await client.connect();
        console.log(`🎉 Connected to ${host}! Region is: ${r}`);
        await client.end();
        return r;
      } catch (err) {
        if (err.message && (err.message.includes('password') || err.message.includes('Tenant') || err.message.includes('auth'))) {
          console.log(`Pinged ${host}: ${err.message}`);
        }
      }
    } catch (e) {
      // not resolvable
    }
  }
}

checkPoolers();
