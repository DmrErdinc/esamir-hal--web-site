# VPS Deployment Rehberi - Esamir Projesi

Bu rehber, Next.js + Prisma + PostgreSQL projenizi VPS üzerinde yayınlamanız için adım adım talimatlar içerir.

## 1. VPS Satın Alma ve İlk Kurulum

### Önerilen VPS Sağlayıcılar:
- **Hetzner Cloud** (En uygun fiyat): https://www.hetzner.com/cloud
  - CX21: 4GB RAM, 2 vCPU, 40GB SSD - €4.5/ay
- **DigitalOcean**: https://www.digitalocean.com
  - Basic Droplet: 4GB RAM, 2 vCPU - $24/ay
- **Linode**: https://www.linode.com
  - Shared CPU: 4GB RAM, 2 vCPU - $24/ay

### İşletim Sistemi:
Ubuntu 22.04 LTS (önerilen)

## 2. VPS'e İlk Bağlantı

```bash
# Windows'ta PowerShell veya CMD ile:
ssh root@SUNUCU_IP_ADRESI

# İlk girişte şifre sorulacak (VPS sağlayıcınızdan gelecek)
```

## 3. Sunucu Güvenliği ve Temel Kurulum

```bash
# Sistem güncellemesi
apt update && apt upgrade -y

# Yeni kullanıcı oluştur (root yerine)
adduser esamir
usermod -aG sudo esamir

# Firewall kurulumu
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Yeni kullanıcı ile giriş yap
exit
ssh esamir@SUNUCU_IP_ADRESI
```

## 4. Gerekli Yazılımları Kurma

```bash
# Node.js 20.x kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Docker ve Docker Compose kurulumu
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker

# Git kurulumu
sudo apt install -y git

# Nginx kurulumu (reverse proxy için)
sudo apt install -y nginx

# Certbot (SSL sertifikası için)
sudo apt install -y certbot python3-certbot-nginx
```

## 5. Projeyi Sunucuya Yükleme

### Seçenek A: Git ile (Önerilen)

```bash
# Proje dizini oluştur
mkdir -p ~/apps
cd ~/apps

# GitHub'dan projeyi çek (önce GitHub'a yükleyin)
git clone https://github.com/KULLANICI_ADI/esamir.git
cd esamir
```

### Seçenek B: FTP/SFTP ile

```bash
# FileZilla veya WinSCP kullanarak projeyi yükleyin
# Hedef dizin: /home/esamir/apps/esamir
```

## 6. Ortam Değişkenlerini Ayarlama

```bash
cd ~/apps/esamir

# .env dosyası oluştur
nano .env
```

`.env` dosyasına şunları ekleyin:

```env
# Database
DATABASE_URL="postgresql://esamir_user:GÜÇLÜ_ŞİFRE@localhost:5432/esamir_db?schema=public"

# JWT Secret (güçlü bir şifre oluşturun)
JWT_SECRET="buraya-çok-güçlü-bir-şifre-yazın-en-az-32-karakter"

# Next.js
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://siteniz.com
```

## 7. Docker Compose ile Veritabanı Kurulumu

Mevcut `docker-compose.yml` dosyanızı düzenleyin:

```bash
nano docker-compose.yml
```

Şu içeriği kullanın:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: esamir_postgres
    restart: always
    environment:
      POSTGRES_USER: esamir_user
      POSTGRES_PASSWORD: GÜÇLÜ_ŞİFRE
      POSTGRES_DB: esamir_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Veritabanını başlatın:

```bash
docker-compose up -d
```

## 8. Projeyi Build Etme

```bash
# Bağımlılıkları yükle
npm install

# Prisma migration
npx prisma generate
npx prisma migrate deploy

# Seed data (opsiyonel)
npm run db:seed

# Production build
npm run build
```

## 9. PM2 ile Uygulamayı Çalıştırma

```bash
# PM2 kurulumu (global)
sudo npm install -g pm2

# Uygulamayı başlat
pm2 start npm --name "esamir" -- start

# Otomatik başlatma
pm2 startup
pm2 save

# Durumu kontrol et
pm2 status
pm2 logs esamir
```

## 10. Nginx Reverse Proxy Kurulumu

```bash
# Nginx config dosyası oluştur
sudo nano /etc/nginx/sites-available/esamir
```

Şu içeriği ekleyin:

```nginx
server {
    listen 80;
    server_name siteniz.com www.siteniz.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Dosya yükleme için maksimum boyut
    client_max_body_size 50M;
}
```

Config'i aktifleştir:

```bash
sudo ln -s /etc/nginx/sites-available/esamir /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 11. SSL Sertifikası Kurulumu (Let's Encrypt)

```bash
# Domain'inizi sunucuya yönlendirdiğinizden emin olun (A kaydı)
# Sonra SSL sertifikası alın:

sudo certbot --nginx -d siteniz.com -d www.siteniz.com

# Otomatik yenileme testi
sudo certbot renew --dry-run
```

## 12. Domain Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) şu DNS kayıtlarını ekleyin:

```
Tip: A
Host: @
Değer: SUNUCU_IP_ADRESI
TTL: 3600

Tip: A
Host: www
Değer: SUNUCU_IP_ADRESI
TTL: 3600
```

## 13. Güncelleme ve Bakım

### Projeyi Güncelleme:

```bash
cd ~/apps/esamir

# Değişiklikleri çek
git pull origin main

# Bağımlılıkları güncelle
npm install

# Database migration (gerekirse)
npx prisma migrate deploy

# Yeniden build
npm run build

# Uygulamayı yeniden başlat
pm2 restart esamir
```

### Log Kontrolü:

```bash
# PM2 logları
pm2 logs esamir

# Nginx logları
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Docker logları
docker-compose logs -f postgres
```

### Veritabanı Yedekleme:

```bash
# Yedek alma scripti oluştur
nano ~/backup-db.sh
```

İçeriği:

```bash
#!/bin/bash
BACKUP_DIR="/home/esamir/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker exec esamir_postgres pg_dump -U esamir_user esamir_db > $BACKUP_DIR/backup_$DATE.sql

# 7 günden eski yedekleri sil
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Çalıştırılabilir yap ve cron'a ekle:

```bash
chmod +x ~/backup-db.sh

# Günlük otomatik yedek için crontab
crontab -e

# Şu satırı ekle (her gün saat 02:00'de)
0 2 * * * /home/esamir/backup-db.sh
```

## 14. Performans Optimizasyonu

### Nginx Cache:

```bash
sudo nano /etc/nginx/sites-available/esamir
```

Cache ayarları ekle:

```nginx
# Static dosyalar için cache
location /_next/static {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, immutable";
}

location /images {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 30d;
    add_header Cache-Control "public, max-age=2592000";
}
```

### PM2 Cluster Mode:

```bash
pm2 delete esamir
pm2 start npm --name "esamir" -i max -- start
pm2 save
```

## 15. Güvenlik Kontrol Listesi

- ✅ Root kullanıcısı yerine normal kullanıcı kullanın
- ✅ SSH key authentication aktif (şifre girişi kapalı)
- ✅ Firewall (UFW) aktif
- ✅ SSL sertifikası kurulu
- ✅ Güçlü veritabanı şifresi
- ✅ Güçlü JWT secret
- ✅ Düzenli yedekleme
- ✅ Fail2ban kurulumu (opsiyonel ama önerilen)

```bash
# Fail2ban kurulumu
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Sorun Giderme

### Uygulama çalışmıyor:
```bash
pm2 logs esamir --lines 100
```

### Veritabanı bağlantı hatası:
```bash
docker ps
docker-compose logs postgres
```

### Nginx hatası:
```bash
sudo nginx -t
sudo systemctl status nginx
```

### Port kullanımda:
```bash
sudo lsof -i :3000
sudo lsof -i :80
```

## Destek ve Kaynaklar

- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma Production: https://www.prisma.io/docs/guides/deployment
- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx Documentation: https://nginx.org/en/docs/

---

**Not:** Bu rehberdeki `GÜÇLÜ_ŞİFRE`, `siteniz.com`, `SUNUCU_IP_ADRESI` gibi değerleri kendi bilgilerinizle değiştirin.