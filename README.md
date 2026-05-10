# Basit Discord Slash Botu

Bu proje `discord.js` kullanarak hazırlanmış slash komutlu bir Discord bot örneğidir.

## Kurulum

1. Node.js 18+ kurulu olmalı.
2. Bağımlılıkları kur:

```bash
npm install
```

## Hiç dosya düzenleyemiyorsan
Sadece `npm start` çalıştır. Eğer ayarlar eksikse uygulama senden terminalde sırasıyla
`DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`, `DISCORD_GUILD_ID` ister ve bu oturumda kullanır (dosyaya yazmaz).

## Terminal yoksa (dosya düzenleyerek kurulum)
Terminal kullanamıyorsan da olur:
1. `config.local.example.json` dosyasını kopyalayıp adını `config.local.json` yap.
2. İçine şu 3 değeri yaz:
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `DISCORD_GUILD_ID`
3. Kaydet.

> `config.local.json` gizli dosyadır ve sürüm kontrolüne eklenmez.

## Terminal varsa alternatif
- İlk kurulum: `npm run setup:env`
- Sadece token güncelleme: `npm run set:token`

## Token güncelleme (normal yol)
Token güncelleme yeri Discord Developer Portal'dır:
1. Discord Developer Portal → Application → **Bot**
2. **Reset Token** ile yeni token üret
3. Projede terminalden çalıştır:
```bash
npm run set:token
```
4. Yeni token'ı yapıştır ve kaydet

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
