import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/settings";

export async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };

  const hasAnnouncement = mergedSettings.header_announcement_active === "true" && mergedSettings.header_announcement;

  return (
    <>
      <Header
        phone={mergedSettings.phone ?? undefined}
        logo={mergedSettings.logo ?? undefined}
        siteName={mergedSettings.site_name || "ESAMIR"}
        announcement={mergedSettings.header_announcement ?? undefined}
        announcementActive={mergedSettings.header_announcement_active === "true"}
        ctaLabel={mergedSettings.header_cta_label ?? undefined}
        ctaHref={mergedSettings.header_cta_href ?? undefined}
      />
      <main className={hasAnnouncement ? "pt-[88px] lg:pt-[92px]" : "pt-16 lg:pt-20"}>{children}</main>
      <Footer settings={mergedSettings} />
      <WhatsAppButton
        phone={mergedSettings.whatsapp || mergedSettings.phone || ""}
      />
    </>
  );
}
