import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "ESAMIR KVKK kapsamında kişisel verilerin korunması hakkında aydınlatma metni.",
};

const sections = [
  {
    number: "01",
    title: "Veri Sorumlusu",
    content: (
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla ESAMIR, kişisel verilerinizi aşağıda açıklanan amaç ve kapsamında işlemektedir.</p>
    ),
  },
  {
    number: "02",
    title: "İşlenen Kişisel Veriler",
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" /><span><strong className="text-brand-700">Kimlik bilgileri:</strong> Ad, soyad</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" /><span><strong className="text-brand-700">İletişim bilgileri:</strong> Telefon numarası, e-posta adresi</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" /><span><strong className="text-brand-700">Teknik veriler:</strong> IP adresi, çerez verileri</span></li>
      </ul>
    ),
  },
  {
    number: "03",
    title: "Kişisel Veri İşleme Amaçları",
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Müşteri taleplerinin karşılanması</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Hizmet kalitesinin artırılması</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Yasal yükümlülüklerin yerine getirilmesi</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Pazarlama ve tanıtım faaliyetleri (onay alınması durumunda)</li>
      </ul>
    ),
  },
  {
    number: "04",
    title: "Kişisel Verilerin Aktarılması",
    content: (
      <p>Kişisel verileriniz; yasal zorunluluklar ve açık rızanız dışında üçüncü kişilerle paylaşılmamaktadır.</p>
    ),
  },
  {
    number: "05",
    title: "Kişisel Veri Saklama Süreleri",
    content: (
      <p>Kişisel verileriniz, işlenme amacının gerektirdiği süre ve yasal zorunluluklar çerçevesinde saklanmaktadır.</p>
    ),
  },
  {
    number: "06",
    title: "İlgili Kişi Hakları (Madde 11)",
    content: (
      <ul className="space-y-2">
        {[
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
          "İşlenen kişisel verilerinize ilişkin bilgi talep etme",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmesi halinde düzeltilmesini isteme",
          "KVKK’nın 7. maddesi çerçevesinde silinmesini isteme",
          "İşlemenin kısıtlanmasını talep etme",
          "Aktarılan kişilerin bilgilendirilmesini isteme",
          "Otomatik sistemler aracılığıyla aleyhinize çıkan sonuçlara itiraz etme",
          "Kanuna aykırı işleme nedeniyle uğradığınız zararın tazmin edilmesini isteme",
        ].map((right) => (
          <li key={right} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            {right}
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "07",
    title: "Başvuru Yöntemi",
    content: (
      <p>Haklarınıza ilişkin başvurularınızı <a href="/iletisim" className="text-gold underline underline-offset-2 hover:text-gold-dark">iletişim sayfamız</a> üzerinden yazılı olarak iletebilirsiniz.</p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <>
      <section className="bg-cream-100 py-20">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Yasal</p>
          <h1 className="heading-display text-brand-800 mb-4">KVKK Aydınlatma Metni</h1>
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
