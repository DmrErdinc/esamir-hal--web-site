import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: "ESAMIR SSS — İran halısı, sipariş ve iç mimarlık hakkında sık sorulan sorular.",
};

const faqs = [
  {
    q: "İran halısı ile makine halısı arasındaki fark nedir?",
    a: "İran halıları el dokumasıdır; her düğüm ustalıkla bağlanır, benzersiz desen ve doku ortaya çıkar. Makine halıları ise fabrikada üretilir, düğüm sayısı ve malzeme kalitesi farklıdır. El dokuması halılar zamanla daha da değer kazanır.",
  },
  {
    q: "İpek halı mı yoksa yün halı mı tercih etmeliyim?",
    a: "İpek halılar parlaklık, incelik ve olağanüstü desen detayı sunar; genellikle dekoratif alanlara önerilir. Yün halılar ise daha dayanıklı, kolay temizlenir ve yoğun kullanıma uygundur. Her ikisi de üst kaliteli seçimlerdir.",
  },
  {
    q: "Halı bakımı ve temizliği nasıl yapılmalı?",
    a: "El dokuması halılar için profesyonel temizlik tavsiye edilir. Günlük bakımda hafif elektrikli süpürge kullanabilirsiniz. Lekelerde hemen soğuk su ve az sabunla silin; ovalamayın. Doğrudan güneş ışığından koruyun.",
  },
  {
    q: "Showroom ziyareti için randevu gerekli mi?",
    a: "Randevu şartı olmamakla birlikte, kişisel iç mimarlık danışmanlığı için önceden randevu almanızı öneririz. Böylece ekibimiz size tam olarak zaman ayırabilir.",
  },
  {
    q: "Fiyat bilgisi için ne yapmam gerekiyor?",
    a: "Fiyatlar ürün özelliklerine, boyuta ve malzemeye göre değiştiğinden sitemizde doğrudan fiyat yazmıyoruz. WhatsApp veya telefon aracılığıyla bizimle iletişime geçtiğinizde, ilgilendiğiniz ürün için detaylı bilgi ve fiyat alabilirsınız.",
  },
  {
    q: "Kargo veya teslimat yapıyor musunuz?",
    a: "Evet, İstanbul ve çevre illere özel taşıma ile teslim yapıyoruz. Diğer iller için kargo imkânı mevcuttur; teslimat detayları için lütfen bizimle iletişime geçin.",
  },
  {
    q: "İç mimarlık danışmanlığı ücretli mi?",
    a: "İlk danışmanlık görüşmesi ücretsizdir. Kapsamlı iç mimarlık projesi için proje bazlı fiyatlandırma yapılmaktadır. Detaylar için iletişime geçebilirsiniz.",
  },
  {
    q: "Halı boyutları değiştirilebilir mi?",
    a: "El dokuması halılar standart boyutlarda üretildiğinden boyut değişikliği yapılamaz. Ancak koleksiyonumuzda pek çok boyut seçeneği bulunmaktadır; mekanınıza en uygun seçimi birlikte belirleyebiliriz.",
  },
  {
    q: "Aksesuar ve kırlent siparişi verebilir miyim?",
    a: "Evet, showroomumuzdaki tüm ürünler temin edilebilir. Bazı ürünler stokta hazır, bazıları için kısa bir temin süreci gerekebilir. Detaylar için iletişime geçin.",
  },
  {
    q: "Ürünlerde garanti var mı?",
    a: "El dokuması halılarımız için malzeme ve işçilik garantisi sunuyoruz. Aksesuar ürünleri için tedarikçi garantisi geçerlidir. Garanti koşulları ürüne göre değişmektedir.",
  },
];

export default function SSSPage() {
  return (
    <>
      <section className="bg-cream-100 py-20">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Yardım</p>
          <h1 className="heading-display text-brand-800 mb-4">Sık Sorulan Sorular</h1>
          <div className="gold-divider mb-6" />
          <p className="text-brand-500 font-sans max-w-lg mx-auto">
            Aklınızdaki soruların cevabı burada. Bulamadığınız için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-brand max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white px-6 rounded-sm border-none shadow-card">
                <AccordionTrigger className="font-serif text-base font-light text-brand-800 hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-600 font-sans leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-8 bg-brand-800 text-center">
            <h2 className="font-serif text-xl text-cream-50 font-light mb-3">
              Sorunuz Burada Yoksa
            </h2>
            <p className="text-cream-300 font-sans text-sm mb-6">
              WhatsApp veya e-posta ile bizimle iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-cream-50 text-sm font-sans hover:bg-gold-dark transition-colors rounded-sm"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
