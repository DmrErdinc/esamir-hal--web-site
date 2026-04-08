# ESAMIR

Premium İran Halısı, Aksesuar & İç Mimarlık Danışmanlığı platformu.

## Teknoloji Yığını

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS + shadcn/ui
- **ORM**: Prisma
- **Veritabanı**: PostgreSQL
- **Kimlik Doğrulama**: JWT (jose) + httpOnly cookie
- **Görsel İşleme**: Sharp (WebP dönüştürme)
- **Animasyon**: Framer Motion
- **Deployment**: Docker Compose

---

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Ortam Değişkenlerini Konfigüre Et

```bash
cp .env.example .env
```

`.env` dosyasını düzenle:

```env
DATABASE_URL="postgresql://esamir:password@localhost:5432/esamir"
JWT_SECRET="gizli-anahtar-buraya"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
UPLOAD_DIR="public/uploads"
```

### 3. Veritabanını Başlat (Docker)

```bash
docker compose up -d db
```

### 4. Migrasyonu Çalıştır

```bash
npm run db:migrate:dev
```

veya mevcut şemayı push et:

```bash
npm run db:push
```

### 5. Seed Verilerini Yükle

```bash
npm run db:seed
```

Varsayılan admin: `admin@esamir.com` / `Admin1234!`

### 6. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

---

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Production sunucusu |
| `npm run db:generate` | Prisma client üret |
| `npm run db:push` | Şemayı DB'ye push et |
| `npm run db:migrate:dev` | Yeni migrasyon oluştur |
| `npm run db:seed` | Seed verilerini yükle |
| `npm run db:studio` | Prisma Studio aç |

---

## Proje Yapısı

```
src/
├── app/
│   ├── (public)/          # Genel sayfalar
│   │   ├── hakkimizda/
│   │   ├── ic-mimarlik/
│   │   ├── kategoriler/
│   │   ├── urunler/
│   │   ├── blog/
│   │   ├── iletisim/
│   │   ├── sss/
│   │   ├── gizlilik-politikasi/
│   │   ├── cerez-politikasi/
│   │   └── kvkk/
│   ├── admin/             # Admin panel
│   │   ├── login/
│   │   ├── urunler/
│   │   ├── kategoriler/
│   │   ├── blog/
│   │   ├── medya/
│   │   ├── sayfalar/
│   │   ├── kullanicilar/
│   │   └── ayarlar/
│   ├── api/
│   │   ├── upload/
│   │   └── media/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                # shadcn/ui bileşenleri
│   ├── layout/            # Header, Footer, WhatsApp
│   ├── home/              # Ana sayfa bölümleri
│   ├── shared/            # Paylaşılan bileşenler
│   ├── products/          # Ürün bileşenleri
│   └── admin/             # Admin panel bileşenleri
├── actions/               # Server Actions
│   ├── auth.ts
│   ├── products.ts
│   ├── categories.ts
│   ├── blog.ts
│   ├── settings.ts
│   └── users.ts
└── lib/
    ├── prisma.ts
    ├── auth.ts
    ├── utils.ts
    ├── settings.ts
    └── validations.ts
```

---

## Docker ile Production Deployment

```bash
docker compose up -d
```

Uygulama `http://localhost:3000` adresinde çalışır.

---

## Admin Panel

Admin panel `/admin` yolunda erişilebilir:

- **Dashboard**: İstatistikler ve hızlı erişim
- **Ürünler**: CRUD, görsel yönetimi, öne çıkan
- **Kategoriler**: Hiyerarşik kategori yönetimi
- **Blog**: Yazılar ve kategoriler
- **Medya**: Görsel yükleme ve yönetimi
- **Sayfalar**: Statik sayfa yönetimi
- **Kullanıcılar**: Admin / Editör kullanıcıları
- **Ayarlar**: Site geneli ayarlar (logo, iletişim, sosyal medya, vb.)

---

## Lisans

Tüm hakları ESAMIR'e aittir.
