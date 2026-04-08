# Hostinger VPS Kurulum Rehberi - Next.js Projesi

Bu rehber, Next.js projenizi Hostinger VPS üzerinde yayınlamak için adım adım talimatlar içerir.

## 📋 Gereksinimler

- Hostinger VPS hesabı (minimum 4GB RAM önerilir)
- Domain adı (Hostinger'dan veya başka bir sağlayıcıdan)
- SSH erişimi
- Yerel bilgisayarınızda Git kurulu

## 🎯 Önerilen Hostinger VPS Paketi

**VPS 2 Paketi** (Önerilir)
- 4GB RAM
- 2 CPU Core
- 100GB NVMe Disk
- Fiyat: ~₺400-500/ay
- Ubuntu 22.04 LTS işletim sistemi

## 📝 Kurulum Adımları

### 1. Hostinger VPS Satın Alma ve Kurulum

1. **Hostinger'a giriş yapın**: https://www.hostinger.com.tr
2. **VPS** sekmesine gidin
3. **VPS 2** paketini seçin (4GB RAM)
4. İşletim sistemi olarak **Ubuntu 22.04 LTS** seçin
5. Satın alma işlemini tamamlayın
6. E-posta ile gelen VPS bilgilerini kaydedin:
   - IP Adresi
   - Root şifresi
   - SSH port (genellikle 22)

### 2. SSH ile VPS'e Bağlanma

Windows için **PuTTY** veya **Windows Terminal** kullanın:

```bash
ssh root@SUNUCU_IP_ADRESI
```

İlk girişte şifre değiştirmeniz istenecektir.

### 3. Sistem Güncellemesi

```bash
# Sistem paketlerini güncelle
apt update && apt upgrade -y

# Temel araçları kur
apt install -y curl wget git build-essential
```

### 4. Yeni Kullanıcı Oluşturma (Güvenlik)

```bash
# Yeni kullanıcı oluştur
adduser deploy

# Sudo yetkisi ver
usermod -aG sudo deploy

# Kullanıcıya geç
su - deploy
```

### 5. Node.js Kurulumu

```bash
# Node.js 20.x kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Versiyonları kontrol et
node --version  # v20.x.x olmalı
npm --version   # 10.x.x olmalı
```

### 6. PostgreSQL Kurulumu

```bash
# PostgreSQL kur
sudo apt install -y postgresql postgresql-contrib

# PostgreSQL servisini başlat
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL kullanıcısına geç
sudo -u postgres psql

# Veritabanı ve kullanıcı oluştur (PostgreSQL içinde)
CREATE DATABASE esamir_db;
CREATE USER esamir_user WITH PASSWORD 'güçlü_şifre_buraya';
GRANT ALL PRIVILEGES ON DATABASE esamir_db TO esamir_user;
\q
```

### 7. PM2 Kurulumu (Process Manager)

```bash
# PM2'yi global olarak kur
sudo npm install -g pm2

# PM2'yi sistem başlangıcına ekle
pm2 startup
# Çıkan komutu çalıştırın
```

### 8. Nginx Kurulumu

```bash
# Nginx kur
sudo apt install -y nginx

# Nginx'i başlat
sudo systemctl start nginx
sudo systemctl enable nginx

# Firewall ayarları
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 9. Projeyi Sunucuya Yükleme

#### Yöntem 1: Git ile (Önerilir)

```bash
# Ana dizine git
cd ~

# Projeyi klonla (GitHub/GitLab kullanıyorsanız)
git clone https://github.com/KULLANICI_ADI/PROJE_ADI.git
cd PROJE_ADI

# Veya yerel bilgisayardan Git push yapın
```

#### Yöntem 2: FTP/SFTP ile

1. **FileZilla** veya **WinSCP** kullanın
2. SFTP bağlantısı kurun:
   - Host: SUNUCU_IP_ADRESI
   - Port: 22
   - Kullanıcı: deploy
   - Şifre: deploy_kullanici_sifresi
3. Proje dosyalarını `/home/deploy/` dizinine yükleyin

### 10. Proje Yapılandırması

```bash
# Proje dizinine git
cd ~/PROJE_ADI

# .env dosyası oluştur
nano .env
```

`.env` dosyasına şunları ekleyin:

```env
# Veritabanı
DATABASE_URL="postgresql://esamir_user:güçlü_şifre_buraya@localhost:5432/esamir_db"

# Next.js
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com

# NextAuth (güvenli bir secret oluşturun)
NEXTAUTH_SECRET=buraya_uzun_rastgele_bir_string_yazin
NEXTAUTH_URL=https://yourdomain.com

# Diğer environment değişkenleriniz...
```

Kaydet ve çık: `CTRL+X`, `Y`, `ENTER`

### 11. Bağımlılıkları Kurma ve Build

```bash
# Node modüllerini kur
npm install

# Prisma migration
npx prisma generate
npx prisma migrate deploy

# Seed data (opsiyonel)
npx prisma db seed

# Production build
npm run build
```

### 12. PM2 ile Uygulamayı Başlatma

```bash
# PM2 ecosystem dosyası oluştur
nano ecosystem.config.js
```

Aşağıdaki içeriği ekleyin:

```javascript
module.exports = {
  apps: [{
    name: 'esamir-app',
    script: 'npm',
    args: 'start',
    cwd: '/home/deploy/PROJE_ADI',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Kaydet ve çık: `CTRL+X`, `Y`, `ENTER`

```bash
# Uygulamayı başlat
pm2 start ecosystem.config.js

# PM2 durumunu kontrol et
pm2 status

# Logları görüntüle
pm2 logs

# PM2 yapılandırmasını kaydet
pm2 save
```

### 13. Nginx Yapılandırması

```bash
# Nginx site yapılandırması oluştur
sudo nano /etc/nginx/sites-available/esamir
```

Aşağıdaki içeriği ekleyin:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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

    # Static dosyalar için cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }

    # Upload dosyaları
    location /uploads {
        alias /home/deploy/PROJE_ADI/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 10M;
}
```

Kaydet ve çık: `CTRL+X`, `Y`, `ENTER`

```bash
# Site yapılandırmasını aktif et
sudo ln -s /etc/nginx/sites-available/esamir /etc/nginx/sites-enabled/

# Default site yapılandırmasını kaldır
sudo rm /etc/nginx/sites-enabled/default

# Nginx yapılandırmasını test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

### 14. Domain Ayarları

#### Hostinger Domain Kullanıyorsanız:

1. Hostinger kontrol paneline giriş yapın
2. **Domains** > **DNS Zone** seçin
3. A kaydı ekleyin:
   - Type: A
   - Name: @ (veya subdomain için: www)
   - Points to: SUNUCU_IP_ADRESI
   - TTL: 14400

#### Başka Domain Sağlayıcı Kullanıyorsanız:

Domain sağlayıcınızın DNS yönetim panelinden A kaydı ekleyin:
- Host: @ veya www
- Value: SUNUCU_IP_ADRESI
- TTL: 3600 veya Auto

DNS değişikliklerinin yayılması 1-48 saat sürebilir.

### 15. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kur
sudo apt install -y certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# E-posta adresinizi girin
# Şartları kabul edin
# HTTPS yönlendirmesi için "2" seçin

# Otomatik yenileme testi
sudo certbot renew --dry-run
```

### 16. Güvenlik Ayarları

```bash
# SSH şifre girişini devre dışı bırak (SSH key kullanın)
sudo nano /etc/ssh/sshd_config
# PasswordAuthentication no olarak değiştirin

# SSH servisini yeniden başlat
sudo systemctl restart sshd

# Fail2ban kur (brute force koruması)
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 🔄 Güncelleme İşlemleri

Projenizi güncellemek için:

```bash
# Proje dizinine git
cd ~/PROJE_ADI

# Git'ten son değişiklikleri çek
git pull origin main

# Bağımlılıkları güncelle
npm install

# Prisma migration (gerekirse)
npx prisma migrate deploy

# Yeniden build
npm run build

# PM2'yi yeniden başlat
pm2 restart esamir-app

# Logları kontrol et
pm2 logs esamir-app
```

## 📊 Monitoring ve Bakım

### PM2 Komutları

```bash
# Uygulama durumu
pm2 status

# Logları görüntüle
pm2 logs esamir-app

# Belirli sayıda log satırı
pm2 logs esamir-app --lines 100

# Uygulamayı yeniden başlat
pm2 restart esamir-app

# Uygulamayı durdur
pm2 stop esamir-app

# Uygulamayı sil
pm2 delete esamir-app
```

### Veritabanı Yedekleme

```bash
# Otomatik yedekleme scripti oluştur
nano ~/backup-db.sh
```

Aşağıdaki içeriği ekleyin:

```bash
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# PostgreSQL yedek
PGPASSWORD='güçlü_şifre_buraya' pg_dump -U esamir_user -h localhost esamir_db > $BACKUP_DIR/db_backup_$DATE.sql

# Eski yedekleri sil (30 günden eski)
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +30 -delete

echo "Backup completed: db_backup_$DATE.sql"
```

```bash
# Script'i çalıştırılabilir yap
chmod +x ~/backup-db.sh

# Crontab'a ekle (her gün saat 02:00'de)
crontab -e
# Şunu ekleyin:
0 2 * * * /home/deploy/backup-db.sh
```

### Disk Kullanımı Kontrolü

```bash
# Disk kullanımı
df -h

# Proje dizini boyutu
du -sh ~/PROJE_ADI

# Log dosyaları temizleme
pm2 flush
```

## 🐛 Sorun Giderme

### Uygulama Çalışmıyor

```bash
# PM2 loglarını kontrol et
pm2 logs esamir-app --lines 50

# Nginx loglarını kontrol et
sudo tail -f /var/log/nginx/error.log

# Port kontrolü
sudo netstat -tulpn | grep :3000
```

### Veritabanı Bağlantı Hatası

```bash
# PostgreSQL durumunu kontrol et
sudo systemctl status postgresql

# PostgreSQL'i yeniden başlat
sudo systemctl restart postgresql

# Bağlantı testi
psql -U esamir_user -d esamir_db -h localhost
```

### Nginx Hatası

```bash
# Nginx yapılandırmasını test et
sudo nginx -t

# Nginx loglarını kontrol et
sudo tail -f /var/log/nginx/error.log

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

### SSL Sertifika Sorunu

```bash
# Sertifika durumunu kontrol et
sudo certbot certificates

# Sertifikayı yenile
sudo certbot renew

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

## 📞 Hostinger Destek

Sorun yaşarsanız:
- Hostinger Canlı Destek: 7/24 Türkçe destek
- Telefon: +90 850 532 0 532
- E-posta: support@hostinger.com.tr
- Bilgi Bankası: https://support.hostinger.com.tr

## ✅ Kontrol Listesi

- [ ] VPS satın alındı ve kuruldu
- [ ] SSH ile bağlantı sağlandı
- [ ] Sistem güncellendi
- [ ] Node.js kuruldu
- [ ] PostgreSQL kuruldu ve yapılandırıldı
- [ ] PM2 kuruldu
- [ ] Nginx kuruldu
- [ ] Proje yüklendi
- [ ] Environment değişkenleri ayarlandı
- [ ] Build tamamlandı
- [ ] PM2 ile uygulama başlatıldı
- [ ] Nginx yapılandırıldı
- [ ] Domain DNS ayarları yapıldı
- [ ] SSL sertifikası kuruldu
- [ ] Güvenlik ayarları yapıldı
- [ ] Yedekleme sistemi kuruldu

## 🎉 Tamamlandı!

Projeniz artık canlıda! Sitenize şu adresten erişebilirsiniz:
- https://yourdomain.com

İyi çalışmalar! 🚀