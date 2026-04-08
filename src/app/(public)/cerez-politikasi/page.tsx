import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "ESAMIR çerez politikası ve kullanım bilgileri.",
};

const sections = [
  {
    number: "01",
    title: "Çerezler Nedir?",
    content: (
      <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Siteyi daha kullanıcı dostu hale getirmek ve deneyiminizi iyileştirmek için kullanılır.</p>
    ),
  },
  {
    number: "02",
    title: "Kullandığımız Çerez Türleri",
    content: (
      <div className="space-y-4">
        <div className="border-l-2 border-gold pl-4">
          <p className="font-medium text-brand-800 mb-1">Zorunlu Çerezler</p>
          <p>Sitenin temel işlevleri için gereklidir; devre dışı bırakılamaz.</p>
        </div>
        <div className="border-l-2 border-gold pl-4">
          <p className="font-medium text-brand-800 mb-1">Analitik Çerezler</p>
          <p>Siteyi nasıl kullandığınızı anlamamıza yardımcı olur. Anonim veri toplar.</p>
        </div>
        <div className="border-l-2 border-gold pl-4">
          <p className="font-medium text-brand-800 mb-1">Tercih Çerezleri</p>
          <p>Dil ve bölge gibi tercihlerinizi hatırlamak için kullanılır.</p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Çerezleri Kontrol Etme",
    content: (
      <p>Tarayıcı ayarlarınızdan çerezleri kontrol edebilir veya silebilirsiniz. Çerezleri devre dışı bırakmanız durumunda bazı site özellikleri çalışmayabilir.</p>
    ),
  },
  {
    number: "04",
    title: "İletişim",
    content: (
      <p>Çerez politikamız hakkında sorularınız için <a href="/iletisim" className="text-gold underline underline-offset-2 hover:text-gold-dark">iletişim sayfamızı</a> ziyaret edebilirsiniz.</p>
    ),
  },
];

export default function CerezPolitikasiPage() {
  return (
    <>
      <section className="bg-cream-100 py-20">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Yasal</p>
          <h1 className="heading-display text-brand-800 mb-4">Çerez Politikası</h1>
          <div className="gold-divider" />
          <p className="mt-6 text-brand-500 font-sans max-w-lg mx-auto text-sm leading-relaxed">
            Son güncelleme: {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-brand max-w-3xl">
          <div className="space-y-4">
            {sections.map((s) => (
              <div
                key={s.number}
                className="bg-white border border-cream-200 rounded-sm overflow-hidden"
              >
                <div className="flex items-center gap-4 px-6 py-4 border-b border-cream-200 bg-cream-50">
                  <span className="font-serif text-2xl text-gold font-light leading-none">{s.number}</span>
                  <h2 className="font-serif text-lg text-brand-800 font-light">{s.title}</h2>
                </div>
                <div className="px-6 py-5 font-sans text-sm text-brand-600 leading-relaxed">
                  {s.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
