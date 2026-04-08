import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { Settings } from "@/lib/settings";

interface FooterProps {
  settings: Settings;
}

const productLinks = [
  { label: "Tüm Ürünler", href: "/urunler" },
  { label: "Koleksiyonlar", href: "/kategoriler" },
  { label: "İpek Halı", href: "/urunler?kategori=ipek-hali" },
  { label: "Akrilik Halı", href: "/urunler?kategori=akrilik-hali" },
  { label: "Aksesuar", href: "/urunler?kategori=aksesuar" },
  { label: "Kırlent", href: "/urunler?kategori=kirlent" },
];

const pageLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İç Mimarlık", href: "/ic-mimarlik" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

const legalLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
  { label: "KVKK Metni", href: "/kvkk" },
];

function PinterestIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export function Footer({ settings }: FooterProps) {
  const siteName = settings.site_name || "ESAMIR";
  const phone = settings.phone || "";
  const email = settings.email || "";
  const address = settings.address || "";
  const workingHours = settings.working_hours || "";
  const instagram = settings.instagram || "";
  const facebook = settings.facebook || "";
  const youtube = settings.youtube || "";
  const pinterest = settings.pinterest || "";
  const footerText =
    settings.footer_text ||
    `${siteName} © ${new Date().getFullYear()}. Tüm hakları saklıdır.`;
  const logo = settings.logo || "";

  return (
    <footer className="bg-brand-800 text-cream-200">
      {/* Main Footer */}
      <div className="container-brand py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              {logo ? (
                <Image
                  src={logo}
                  alt={siteName}
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="font-serif text-2xl font-light tracking-[0.15em] text-cream-50">
                  {siteName}
                </span>
              )}
            </Link>
            <p className="text-sm text-cream-300 leading-relaxed mb-6 font-sans">
              Seçkin İran halısı koleksiyonu ve premium aksesuar dünyası.
              Yaşam alanlarınıza lüks ve estetik katan başarılı tasarımlar.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-700 text-cream-300 hover:bg-gold hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-700 text-cream-300 hover:bg-gold hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {pinterest && (
                <a
                  href={pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-700 text-cream-300 hover:bg-gold hover:text-white transition-all"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-700 text-cream-300 hover:bg-gold hover:text-white transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-serif text-base text-cream-50 mb-5 font-light tracking-wide">
              Koleksiyon
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-serif text-base text-cream-50 mb-5 font-light tracking-wide">
              Kurumsal
            </h3>
            <ul className="space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base text-cream-50 mb-5 font-light tracking-wide">
              İletişim
            </h3>
            <ul className="space-y-4">
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 text-sm font-sans text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-light" />
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 text-sm font-sans text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-light" />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3 text-sm font-sans text-cream-300">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-light" />
                  <span>{address}</span>
                </li>
              )}
              {workingHours && (
                <li className="flex items-start gap-3 text-sm font-sans text-cream-300">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-light" />
                  <span>{workingHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-700">
        <div className="container-brand py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-cream-400">{footerText}</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-sans text-cream-400 hover:text-cream-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
