# Basit Discord Slash Botu

Bu proje `discord.js` kullanarak hazırlanmış slash komutlu bir Discord bot örneğidir.

## Kurulum

1. Node.js 18+ kurulu olmalı.
2. Bağımlılıkları kur:

```bash
npm install
```

## "Secret menüsü" yoksa ne yapacağım?
Secret manager kullanmak zorunda değilsin. Bu projede secret değerlerini **lokal `.env`** dosyasına yazman yeterli.

### Hızlı kurulum (önerilen)
```bash
npm run setup:env
```
Bu komut senden şunları ister:
- `DISCORD_BOT_TOKEN`
- `DISCORD_CLIENT_ID`
- `DISCORD_GUILD_ID`

Girdikten sonra proje kökünde (`/workspace/Bot/.env`) dosya otomatik oluşur.

### Manuel kurulum
```bash
cp .env.example .env
```
Sonra `.env` dosyasını açıp değerleri doldur.

> `.env` dosyası gizlidir, commitlenmez (`.gitignore` içinde var).


### Sadece token güncellemek için
Eğer `.env` zaten varsa sadece token'ı değiştirmek için:
```bash
npm run set:token
```

## Discord Developer Portal'dan gerekli değerleri bulma
1. https://discord.com/developers/applications adresine gir.
2. Uygulamanı seç.
3. **Bot** sekmesinden token'ı kopyala (`DISCORD_BOT_TOKEN`).
4. **General Information** sekmesinden Application ID'yi al (`DISCORD_CLIENT_ID`).
5. Botu eklediğin test sunucusunun ID'sini al (`DISCORD_GUILD_ID`).
   - Discord'da User Settings → Advanced → Developer Mode aç.
   - Sunucuya sağ tık → Copy Server ID.

## Çalıştırma

```bash
npm start
```

Bot açılırken slash komutlarını ilgili sunucuya otomatik yükler.

## Slash Komutları

- `/ping` → Pong döner.
- `/echo mesaj:<metin>` → Mesajı tekrarlar.
- `/help` → Yardım mesajı verir.
