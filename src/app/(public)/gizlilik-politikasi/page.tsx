import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "ESAMIR gizlilik politikası ve kişisel veri işleme hakkında bilgiler.",
};

const sections = [
  {
    number: "01",
    title: "Giriş",
    content: (
      <p>
        ESAMIR olarak, web sitemizi ziyaret eden ve hizmetlerimizden yararlanan kişilerin kişisel
        verilerinin korunmasına büyük önem vermekteyiz. Bu Gizlilik Politikası, toplanan bilgilerin
        nasıl işlendiğini ve korunduğunu açıklamaktadır.
      </p>
    ),
  },
  {
    number: "02",
    title: "Toplanan Bilgiler",
    content: (
      <>
        <p className="mb-3">Sitemizi ziyaret ettiğinizde veya iletişim kurduğunuzda aşağıdaki bilgiler toplanabilir:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Ad, soyad ve iletişim bilgileri (gönüllü olarak sağlandığında)</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />IP adresi ve tarayıcı bilgileri</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Çerezler aracılığıyla toplanan kullanım verileri</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Bilgilerin Kullanımı",
    content: (
      <>
        <p className="mb-3">Toplanan bilgiler yalnızca şu amaçlarla kullanılmaktadır:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Hizmet kalitesini artırmak</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Müşteri taleplerini yanıtlamak</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Yasal yükümlülükleri yerine getirmek</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Bilgilerin Paylaşımı",
    content: (
      <p>Kişisel verileriniz; açık rızanız olmaksızın, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.</p>
    ),
  },
  {
    number: "05",
    title: "Güvenlik",
    content: (
      <p>Kişisel verilerinizin güvenliği için teknik ve idari önlemler alınmaktadır. Veri ihlali durumunda yasal süreler içinde bilgilendirme yapılır.</p>
    ),
  },
  {
    number: "06",
    title: "Haklarınız",
    content: (
      <>
        <p className="mb-3">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />İşlenen veriler hakkında bilgi talep etme</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />Verilerin düzeltilmesini veya silinmesini talep etme</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />İşlemenin kısıtlanmasını talep etme</li>
        </ul>
      </>
    ),
  },
  {
    number: "07",
    title: "İletişim",
    content: (
      <p>Gizlilik politikamıza ilişkin sorularınız için <a href="/iletisim" className="text-gold underline underline-offset-2 hover:text-gold-dark">iletişim sayfamızı</a> ziyaret edebilirsiniz.</p>
    ),
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <section className="bg-cream-100 py-20">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Yasal</p>
          <h1 className="heading-display text-brand-800 mb-4">Gizlilik Politikası</h1>
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
