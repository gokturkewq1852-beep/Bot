import fs from 'node:fs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const envFile = new URL('../.env', import.meta.url);

if (!fs.existsSync(envFile)) {
  console.error('❌ .env bulunamadı. Önce `npm run setup:env` çalıştır.');
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

try {
  const token = (await rl.question('Yeni DISCORD_BOT_TOKEN: ')).trim();
  if (!token) {
    console.error('❌ Token boş olamaz.');
    process.exit(1);
  }

  const current = fs.readFileSync(envFile, 'utf8').split('\n');
  let updated = false;

  const next = current.map((line) => {
    if (line.startsWith('DISCORD_BOT_TOKEN=')) {
      updated = true;
      return `DISCORD_BOT_TOKEN=${token}`;
    }
    return line;
  });

  if (!updated) next.push(`DISCORD_BOT_TOKEN=${token}`);

  fs.writeFileSync(envFile, `${next.join('\n').replace(/\n*$/, '\n')}`, 'utf8');
  console.log('✅ Token .env içine kaydedildi.');
} finally {
  rl.close();
}
