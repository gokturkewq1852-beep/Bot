import fs from 'node:fs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const envPath = new URL('../.env', import.meta.url);

if (fs.existsSync(envPath)) {
  console.log('⚠️ .env dosyası zaten var. Üzerine yazılmadı.');
  process.exit(0);
}

const rl = readline.createInterface({ input, output });

try {
  const token = (await rl.question('DISCORD_BOT_TOKEN: ')).trim();
  const clientId = (await rl.question('DISCORD_CLIENT_ID: ')).trim();
  const guildId = (await rl.question('DISCORD_GUILD_ID: ')).trim();

  if (!token || !clientId || !guildId) {
    console.error('❌ Tüm alanları doldurman gerekiyor.');
    process.exit(1);
  }

  const content = [
    `DISCORD_BOT_TOKEN=${token}`,
    `DISCORD_CLIENT_ID=${clientId}`,
    `DISCORD_GUILD_ID=${guildId}`,
    '',
  ].join('\n');

  fs.writeFileSync(envPath, content, { encoding: 'utf8', flag: 'wx' });
  console.log('✅ .env dosyası oluşturuldu. Şimdi npm start çalıştırabilirsin.');
} finally {
  rl.close();
}
