"use client";
import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/utils";
import type { Settings } from "@/lib/settings";

interface ContactSectionProps {
  settings: Settings & Record<string, string>;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings.phone || "";
  const whatsapp = settings.whatsapp || phone;
  const email = settings.email || "";
  const address = settings.address || "";
  const workingHours = settings.working_hours || "";
  const mapsEmbed = settings.google_maps_embed || "";
  const mapsUrl = settings.google_maps_url || "";

  // Build an embed src: prefer embed code, else derive from address or URL
  function getEmbedSrc() {
    if (address) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&hl=tr`;
    }
    if (mapsUrl) {
      try {
        const u = new URL(mapsUrl);
        u.searchParams.set("output", "embed");
        return u.toString();
      } catch {
        return "";
      }
    }
    return "";
  }
  const embedSrc = getEmbedSrc();

  const waUrl = whatsapp
    ? getWhatsAppUrl(whatsapp, "Merhaba, ESAMIR hakkında bilgi almak istiyorum.")
    : "#";

  const contacts = [
    phone && { icon: Phone, label: "Telefon", value: phone, href: `tel:${phone}` },
    whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Mesaj Gönderin",
      href: waUrl,
      external: true,
    },
    email && { icon: Mail, label: "E-posta", value: email, href: `mailto:${email}` },
    address && { icon: MapPin, label: "Adres", value: address, href: null },
    workingHours && { icon: Clock, label: "Çalışma Saatleri", value: workingHours, href: null },
  ].filter(Boolean) as {
    icon: React.ElementType;
    label: string;
    value: string;
    href: string | null;
    external?: boolean;
  }[];

  return (
    <section className="section-padding bg-white">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-overline mb-4">İletişim</p>
            <h2 className="heading-xl text-brand-800 mb-3">Showroom&apos;umuzu Ziyaret Edin</h2>
            <div className="gold-divider-left mb-8" />
            <p className="text-brand-500 font-sans leading-relaxed mb-10">
              Koleksiyonumuzu yerinde görmek ve profesyonel danışmanlık almak için
              showroom&apos;umuza bekleriz.
            </p>

            <div className="space-y-5">
              {contacts.map((c) => {
                const Inner = (
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <c.icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-sans text-brand-400 uppercase tracking-wider mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-sm font-sans text-brand-700 leading-relaxed">
                        {c.value}
                      </p>
                    </div>
                  </div>
                );

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label}>{Inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {mapsEmbed ? (
              <div
                className="w-full h-80 lg:h-full min-h-[400px] overflow-hidden rounded-sm"
                dangerouslySetInnerHTML={{ __html: mapsEmbed }}
              />
            ) : embedSrc ? (
              <iframe
                src={embedSrc}
                className="w-full h-80 lg:h-full min-h-[400px] rounded-sm border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum"
              />
            ) : (
              <div className="w-full h-80 lg:h-full min-h-[400px] bg-cream-100 rounded-sm flex flex-col items-center justify-center gap-4">
                <MapPin className="h-12 w-12 text-brand-300" />
                <p className="font-serif text-xl text-brand-500">
                  Harita bilgisi yakında eklenecek
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
