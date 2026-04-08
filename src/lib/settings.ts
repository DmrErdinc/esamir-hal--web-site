import { prisma } from "./prisma";
import { cache } from "react";

export type Settings = Record<string, string | null>;

export const getSettings = cache(async (): Promise<Settings> => {
  try {
    const settings = await prisma.siteSetting.findMany();
    return settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Settings);
  } catch {
    return {};
  }
});

export async function getSetting(key: string): Promise<string | null> {
  const settings = await getSettings();
  return settings[key] ?? null;
}

export const DEFAULT_SETTINGS: Record<string, string> = {
  // General
  site_name: "ESAMIR",
  site_tagline: "Lüks Halı & İç Mimarlık",
  site_description: "ESAMIR, seçkin İran halısı koleksiyonu ve iç mimarlık danışmanlığı sunar.",
  site_language: "tr",
  logo: "",
  favicon: "",
  // Contact
  phone: "+90 532 000 00 00",
  whatsapp: "+905320000000",
  email: "info@esamir.com",
  address: "İstanbul, Türkiye",
  working_hours: "Pazartesi - Cumartesi: 09:00 - 18:00",
  working_hours_weekend: "",
  // Social
  instagram: "",
  facebook: "",
  pinterest: "",
  youtube: "",
  twitter: "",
  linkedin: "",
  tiktok: "",
  // Maps
  google_maps_embed: "",
  google_maps_url: "",
  latitude: "",
  longitude: "",
  map_title: "Showroom Konumumuz",
  map_description: "",
  // Google Review
  google_review_link: "",
  google_review_title: "Google'da Bizi Değerlendirin",
  google_review_description: "Deneyiminizi paylaşarak diğer müşterilere yardımcı olun.",
  google_review_button: "Değerlendirme Yap",
  google_review_show: "true",
  google_review_show_home: "true",
  google_review_show_contact: "true",
  // SEO
  seo_title: "ESAMIR | Lüks Halı & İç Mimarlık",
  seo_description: "ESAMIR, seçkin İran halısı koleksiyonu, premium aksesuarlar ve profesyonel iç mimarlık danışmanlığı sunan prestijli bir yaşam alanları markasıdır.",
  seo_og_image: "",
  seo_robots: "index,follow",
  // Header
  header_announcement: "",
  header_announcement_active: "false",
  header_cta_label: "Koleksiyonu Keşfet",
  header_cta_href: "/kategoriler",
  // Hero
  hero_title: "Yaşam Alanlarına Zarafet Katın",
  hero_subtitle: "Premium Koleksiyon",
  hero_description: "Seçkin İran halısı koleksiyonu, premium aksesuarlar ve profesyonel iç mimarlık danışmanlığı ile yaşam alanlarınızı baştan tasarlıyoruz.",
  hero_cta_label: "Koleksiyonu Keşfet",
  hero_cta_href: "/kategoriler",
  hero_image: "",
  // Footer
  footer_text: "ESAMIR © 2024. Tüm hakları saklıdır.",
  footer_tagline: "Lüks Halı & İç Mimarlık",
  footer_col1_title: "Koleksiyon",
  footer_col2_title: "Kurumsal",
  footer_col3_title: "İletişim",
  footer_bottom_text: "",
  // WhatsApp CTA
  whatsapp_cta_title: "Özel Tasarım mı İstiyorsunuz?",
  whatsapp_cta_description: "Uzman ekibimiz ile WhatsApp üzerinden iletişime geçin.",
  whatsapp_cta_button: "WhatsApp'tan Yazın",
  // About section
  about_title: "ESAMIR Hakkında",
  about_description: "",
  // Interior section
  interior_label: "İç Mimarlık",
  interior_title: "Mekanı Sanata",
  interior_title_italic: "Dönüştürüyoruz",
  interior_text1: "20 yılı aşkın deneyimimizle iç mimarlık alanında sunduğumuz bütüncül yaklaşım, yaşam alanlarınızı yalnızca güzel değil, aynı zamanda işlevsel ve ruhunuzu yansıtan mekânlara dönüştürüyor.",
  interior_text2: "İran halısının eşsiz dokuma geleneğini modern iç mimarlık anlayışıyla harmanlayarak; her parçanın, her rengin ve her dokunun yaşam alanınızda anlamlı bir yer bulmasını sağlıyoruz.",
  interior_stat1_number: "500+",
  interior_stat1_label: "Tamamlanan Proje",
  interior_stat2_number: "20+",
  interior_stat2_label: "Yıllık Deneyim",
  interior_stat3_number: "1000+",
  interior_stat3_label: "Ürün Çeşidi",
  interior_stat4_number: "98%",
  interior_stat4_label: "Müşteri Memnuniyeti",
  interior_cta_text: "Yaklaşımımızı Keşfedin",
  interior_cta_url: "/ic-mimarlik",
  interior_image1: "/images/interior-1.jpg",
  interior_image2: "/images/interior-2.jpg",
};
