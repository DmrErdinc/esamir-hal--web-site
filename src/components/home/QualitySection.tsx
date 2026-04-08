"use client";
import React from "react";
import { motion } from "framer-motion";
import { Gem, Layers, Sparkles, Shield } from "lucide-react";

const qualities = [
  {
    icon: Gem,
    title: "Özgün Koleksiyon",
    desc: "Her ürün, İran'ın köklü halı dokuma geleneğinden ilham alınarak titizlikle seçilmiştir.",
  },
  {
    icon: Layers,
    title: "El Dokuması Kalite",
    desc: "Nesiller boyu aktarılan dokuma teknikleri ile üretilen parçalar, her evde bir sanat eseri hissi yaratır.",
  },
  {
    icon: Sparkles,
    title: "Premium Malzeme",
    desc: "İpek, yün ve premium akrilik karışımı ile üretilen halılar; dayanıklılık ve estetik sunmaktadır.",
  },
  {
    icon: Shield,
    title: "Kalite Güvencesi",
    desc: "Her ürün, uzman ekibimiz tarafından kalite kontrolünden geçirilmekte ve garanti kapsamındadır.",
  },
];

export function QualitySection() {
  return (
    <section className="section-padding bg-brand-800 text-cream-50">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold-light mb-4">
            Neden ESAMIR
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-cream-50 mb-4">
            Kalite & Uzmanlık
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((q, i) => (
            <motion.div
              key={q.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/30 bg-gold/10 mb-6 mx-auto">
                <q.icon className="h-6 w-6 text-gold-light" />
              </div>
              <h3 className="font-serif text-xl text-cream-100 font-light mb-3">
                {q.title}
              </h3>
              <p className="text-sm font-sans text-cream-300 leading-relaxed">
                {q.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
