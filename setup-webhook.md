# Tawk.to Webhook Kurulum Rehberi

## Sorun
Tawk.to webhook'ları `localhost:3000`'e ulaşamaz çünkü bu sadece yerel makinenizde erişilebilir. Tawk.to'nun webhook gönderebilmesi için **public bir URL** gerekiyor.

## Çözüm: Ngrok Kullanımı

### 1. Ngrok Kurulumu
```bash
# Ngrok'u indirin: https://ngrok.com/download
# Veya npm ile kurun:
npm install -g ngrok

# Ngrok hesabı oluşturun ve auth token alın
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 2. Localhost'u Public Hale Getirin
```bash
# Next.js dev server'ınızı çalıştırın
npm run dev

# Yeni terminal açın ve ngrok başlatın
ngrok http 3000
```

### 3. Ngrok Çıktısı
```
ngrok by @inconshreveable

Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

### 4. Tawk.to Webhook Konfigürasyonu

**Tawk.to Dashboard'da:**
1. Admin Panel → Settings → Webhooks
2. **Webhook URL**: `https://abc123.ngrok.io/api/tawk-webhook` (ngrok URL'inizi kullanın)
3. **Secret**: `731eb303128e3eeab79d3585be5ac89155c90baf1a3e59c51a85527852353d534a651877c4333cbd9650fae6155b5512`
4. **Events**: Tüm eventleri aktif edin
5. **Save** butonuna basın

### 5. Test Komutları

**Discord Test:**
```bash
curl -X POST https://abc123.ngrok.io/api/test-discord \
  -H "Content-Type: application/json" \
  -d '{"event": "chat:start"}'
```

**Webhook Test:**
```bash
curl -X POST https://abc123.ngrok.io/api/tawk-webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "chat:start", "chatId": "test-123"}'
```

### 6. Debug Adımları

**Console Logs:**
- Next.js dev server console'unu açık tutun
- Tawk.to'da chat başlatın
- Console'da `🔥 WEBHOOK RECEIVED!` mesajını arayın

**Ngrok Web Interface:**
- http://127.0.0.1:4040 adresine gidin
- Gelen HTTP isteklerini görüntüleyin
- Tawk.to'dan webhook gelip gelmediğini kontrol edin

## Alternatif Çözümler

### 1. Vercel Deploy
```bash
# Projeyi Vercel'e deploy edin
npm install -g vercel
vercel

# Deploy edilen URL'i Tawk.to'da kullanın
# Örnek: https://your-project.vercel.app/api/tawk-webhook
```

### 2. Railway Deploy
```bash
# Railway'e deploy edin
npm install -g @railway/cli
railway login
railway init
railway up

# Railway URL'ini Tawk.to'da kullanın
```

### 3. Netlify Functions
```bash
# Netlify'a deploy edin
npm install -g netlify-cli
netlify deploy --prod

# Netlify URL'ini kullanın
```

## Önemli Notlar

1. **HTTPS Zorunlu**: Tawk.to sadece HTTPS URL'lere webhook gönderir
2. **Public Access**: URL internet üzerinden erişilebilir olmalı
3. **Port 443**: HTTPS için standart port kullanılmalı
4. **SSL Certificate**: Geçerli SSL sertifikası gerekli

## Test Checklist

- [ ] Ngrok çalışıyor ve public URL alındı
- [ ] Tawk.to'da webhook URL güncellendi
- [ ] Webhook events aktif edildi
- [ ] Discord test çalışıyor
- [ ] Console logs açık
- [ ] Tawk.to chat test edildi

## Sorun Giderme

**Webhook gelmiyor:**
- Ngrok URL'i doğru mu?
- HTTPS kullanılıyor mu?
- Tawk.to'da events aktif mi?
- Console'da error var mı?

**Discord bildirim gelmiyor:**
- Discord webhook URL'i doğru mu?
- Discord kanalı aktif mi?
- Network bağlantısı var mı?
