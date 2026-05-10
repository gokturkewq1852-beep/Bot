import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder } from 'discord.js';

const configPath = path.resolve(process.cwd(), 'config.local.json');
let fileConfig = {};

if (fs.existsSync(configPath)) {
  try {
    fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    console.error('config.local.json okunamadı. JSON formatını kontrol et.');
    process.exit(1);
  }
}

async function askMissingValues(current) {
  const rl = readline.createInterface({ input, output });
  try {
    const token = current.token || (await rl.question('DISCORD_BOT_TOKEN: ')).trim();
    const clientId = current.clientId || (await rl.question('DISCORD_CLIENT_ID: ')).trim();
    const guildId = current.guildId || (await rl.question('DISCORD_GUILD_ID: ')).trim();
    return { token, clientId, guildId };
  } finally {
    rl.close();
  }
}

let token = process.env.DISCORD_BOT_TOKEN || fileConfig.DISCORD_BOT_TOKEN;
let clientId = process.env.DISCORD_CLIENT_ID || fileConfig.DISCORD_CLIENT_ID;
let guildId = process.env.DISCORD_GUILD_ID || fileConfig.DISCORD_GUILD_ID;

if (!token || !clientId || !guildId) {
  console.log('⚠️ Eksik ayarlar bulundu. Değerleri şimdi gir (dosyaya kaydedilmez).');
  ({ token, clientId, guildId } = await askMissingValues({ token, clientId, guildId }));
}

if (!token || !clientId || !guildId) {
  console.error('DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID ve DISCORD_GUILD_ID zorunludur.');
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Botun gecikmesini test eder.'),
  new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Yazdığınız mesajı tekrarlar.')
    .addStringOption((option) =>
      option.setName('mesaj').setDescription('Tekrarlanacak mesaj').setRequired(true)
    ),
  new SlashCommandBuilder().setName('help').setDescription('Komut listesini gösterir.'),
].map((command) => command.toJSON());

async function registerSlashCommands() {
  const rest = new REST({ version: '10' }).setToken(token);

  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });

  console.log('✅ Slash komutları sunucuya yüklendi.');
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Bot giriş yaptı: ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
    return;
  }

  if (interaction.commandName === 'echo') {
    const mesaj = interaction.options.getString('mesaj', true);
    await interaction.reply(mesaj);
    return;
  }

  if (interaction.commandName === 'help') {
    await interaction.reply([
      'Kullanılabilir slash komutları:',
      '`/ping` -> Botun aktif olup olmadığını test eder.',
      '`/echo mesaj:<yazı>` -> Yazdığın mesajı tekrarlar.',
      '`/help` -> Yardım menüsü.',
    ].join('\n'));
  }
});

await registerSlashCommands();
await client.login(token);
