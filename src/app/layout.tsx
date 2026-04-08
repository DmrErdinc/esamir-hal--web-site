import type { Metadata } from "next";
import { Inter, Poppins, Roboto, Open_Sans, Lato, Montserrat, Raleway, Playfair_Display, Merriweather, Nunito, Ubuntu, Work_Sans } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const fontMap: Record<string, string> = {
  "Inter": inter.variable,
  "Poppins": poppins.variable,
  "Roboto": roboto.variable,
  "Open Sans": openSans.variable,
  "Lato": lato.variable,
  "Montserrat": montserrat.variable,
  "Raleway": raleway.variable,
  "Playfair Display": playfair.variable,
  "Merriweather": merriweather.variable,
  "Nunito": nunito.variable,
  "Ubuntu": ubuntu.variable,
  "Work Sans": workSans.variable,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const favicon = settings.favicon || "";
  const siteName = settings.site_name || "ESAMIR";
  const seoTitle = settings.seo_title || `${siteName} | Lüks Halı & İç Mimarlık`;
  const seoDesc = settings.seo_description || "ESAMIR, seçkin İran halısı koleksiyonu, premium aksesuarlar ve profesyonel iç mimarlık danışmanlığı sunan prestijli bir yaşam alanları markasıdır.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: {
      default: seoTitle,
      template: `%s | ${siteName}`,
    },
    description: seoDesc,
    ...(favicon ? { icons: { icon: favicon, shortcut: favicon, apple: favicon } } : {}),
    keywords: [
      "İran halısı", "ipek halı", "lüks halı", "iç mimarlık",
      "aksesuar", "kırlent", "vazo", "biblo", "dekorasyon", siteName,
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      siteName,
      title: seoTitle,
      description: seoDesc,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const selectedFont = settings.font_family || "Inter";
  const fontVariable = fontMap[selectedFont] || inter.variable;
  const allFonts = Object.values(fontMap).join(" ");
  
  return (
    <html lang="tr" className={`${allFonts} ${cormorant.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-selected: ${fontVariable};
            }
          `
        }} />
      </head>
      <body className="min-h-screen bg-cream-50 antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-selected, var(--font-inter))",
            },
          }}
        />
      </body>
    </html>
  );
}
