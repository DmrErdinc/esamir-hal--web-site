import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-serif text-9xl text-gold/20 font-light leading-none select-none">
          404
        </p>
        <h1 className="font-serif text-3xl text-brand-800 font-light mt-4 mb-3">
          Sayfa Bulunamadı
        </h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mb-6" />
        <p className="text-brand-500 font-sans leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-700 text-cream-50 text-sm font-sans rounded-sm hover:bg-brand-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/kategoriler"
            className="inline-flex items-center justify-center px-6 py-3 border border-brand-300 text-brand-600 text-sm font-sans rounded-sm hover:border-brand-700 hover:text-brand-800 transition-colors"
          >
            Koleksiyonu Keşfet
          </Link>
        </div>
      </div>
    </div>
  );
}
