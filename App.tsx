
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook,
  Menu,
  X,
  ChevronLeft,
  Briefcase,
  AlertTriangle,
  HelpCircle,
  FileText,
  Shield,
  LifeBuoy,
  MessageCircle
} from 'lucide-react';
import Logo from './components/Logo';
import AIChatbot from './components/AIChatbot';
import { SERVICES, FEATURES, CONTACT_INFO } from './constants';

type Page = 'home' | 'about' | 'kvkk' | 'cookies' | 'services' | 'insurance-detail' | 'claims' | 'faq' | 'contact';

interface InsuranceDetail {
  id: string;
  title: string;
  longDescription: string;
  features: string[];
  image: string;
}

const STATIC_PAGE_IMAGES: Record<string, string> = {
  about: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600',
  services: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1600',
  claims: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600',
  faq: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1600',
  kvkk: 'https://images.unsplash.com/photo-1508061263366-f7da158b6d46?auto=format&fit=crop&q=80&w=1600',
  cookies: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600',
  contact: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1600'
};

const INSURANCE_DETAILS: Record<string, InsuranceDetail> = {
  kasko: {
    id: 'kasko',
    title: 'Kasko & Trafik Sigortası',
    longDescription: 'Aracınızın uğrayabileceği hasarlara karşı tam güvence sağlıyoruz. Kasko sigortası ile çarpma, çarpışma, yanma, hırsızlık gibi ana teminatların yanı sıra mini onarım, yol yardım ve ikame araç gibi ek hizmetlerle konforunuzu koruyoruz.',
    features: ['7/24 Yol Yardım Hizmeti', 'İkame Araç Desteği', 'Orijinal Yedek Parça Garantisi', 'Sınırsız İhtiyari Mali Mesuliyet Seçeneği'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
  },
  saglik: {
    id: 'saglik',
    title: 'Tamamlayıcı Sağlık Sigortası',
    longDescription: 'SGK ile anlaşmalı özel hastanelerde muayene, tahlil ve ameliyat gibi hizmetlerden hiçbir fark ücreti ödemeden yararlanmanızı sağlıyoruz. Sadece sağlık değil, check-up ve diş paketi gibi ek faydalarla yanınızdayız.',
    features: ['Yatarak ve Ayakta Tedavi', 'Doğum Teminatı Opsiyonu', 'Ücretsiz Check-up Paketi', '0-80 Yaş Arası Kapsam'],
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1200'
  },
  konut: {
    id: 'konut',
    title: 'Konut & DASK Sigortası',
    longDescription: 'Eviniz sadece dört duvar değil, sizin dünyanız. Yangın, sel, hırsızlık ve deprem (DASK) risklerine karşı evinizi ve eşyalarınızı piyasa değerleri üzerinden güvence altına alıyoruz.',
    features: ['Eşya Teminatı', 'Çilingir ve Tesisat Hizmetleri', 'Kira Kaybı Koruması', 'Elektronik Cihaz Sigortası'],
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=1200'
  },
  hayat: {
    id: 'hayat',
    title: 'Hayat Sigortası',
    longDescription: 'Sevdiklerinizin geleceğini teminat altına alın. Hayat sigortası ile beklenmedik durumlarda ailenizin yaşam standartlarını koruyor, dilerseniz birikimli hayat sigortası ile geleceğe yatırım yapmanızı sağlıyoruz.',
    features: ['Yüksek Teminat Limitleri', 'Vergi Avantajı İmkanı', 'Kritik Hastalıklar Koruması', 'Eğitim Sigortası Seçeneği'],
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1200'
  },
  seyahat: {
    id: 'hayat',
    title: 'Seyahat Sağlık Sigortası',
    longDescription: 'Yurt dışı seyahatlerinizde oluşabilecek sağlık sorunlarını dert etmeyin. Schengen vizesi ve diğer tüm vize işlemleri için geçerli, geniş kapsamlı seyahat sağlık poliçelerimizle güvendesiniz.',
    features: ['Tıbbi Tedavi Teminatı', 'Vefat ve Sürekli Sakatlık', 'Bagaj Kaybolması Desteği', 'Asistans Hizmetleri'],
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&q=80&w=1200'
  },
  isyeri: {
    id: 'isyeri',
    title: 'İş Yeri Sigortası',
    longDescription: 'İş yerinizdeki demirbaşlardan stoklara, bina kıymetinden çalışanlarınızın sorumluluklarına kadar tüm riskleri tek bir poliçede topluyoruz. İş durması teminatı ile beklenmedik durumlarda kazancınızı koruyoruz.',
    features: ['İş Durması Teminatı', 'Üçüncü Şahıs Sorumluluk', 'Cam Kırılması', 'Makine Kırılması'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200'
  }
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedInsurance]);

  const navigateTo = (page: Page, insuranceId?: string) => {
    setCurrentPage(page);
    if (insuranceId) setSelectedInsurance(insuranceId);
    else setSelectedInsurance(null);
    setIsMenuOpen(false);
  };

  const PageHeader = ({ title, subtitle, bgImage }: { title: string; subtitle?: string; bgImage?: string }) => (
    <div className="relative bg-slate-900 text-white py-24 lg:py-40 overflow-hidden min-h-[400px]">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
      )}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-blue-400 font-bold mb-6 hover:text-blue-300 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
        >
          <ChevronLeft className="w-4 h-4" /> Anasayfaya Dön
        </button>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-300 text-lg lg:text-xl max-w-3xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const HomeContent = () => (
    <>
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sinan Demir ile modern sigorta çözümleri </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
                Geleceğinizi <br />
                <span className="text-blue-600">Side Sigorta</span> ile <br />
                Güvenceye Alın.
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                Sidesigorta.com.tr ile sadece poliçe değil, huzur satın alın. 
                Sizin için en iyi teminatları en uygun fiyatlarla sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigateTo('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
                  İletişime Geçin
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center">
                  Bizi Arayın
                </a>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="relative z-10 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[4/3] lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" 
                  alt="Side Sigorta Güvence" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <p className="text-xl font-bold mb-1">"Hayat sürprizlerle dolu."</p>
                    <p className="text-sm text-white/80">Side Sigorta ile kötü sürprizlere karşı her zaman hazırlıklısınız.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section id="hizmetler" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm">Hizmet Alanlarımız</h2>
            <h3 className="text-4xl font-bold text-slate-900">İhtiyacınıza Özel Sigorta Çözümleri</h3>
            <p className="text-slate-600">Her yaşam tarzına ve ihtiyaca uygun, geniş ürün yelpazemizle yanınızdayız.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                onClick={() => navigateTo('insurance-detail', service.id)}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
              >
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={service.image}
                    alt={`${service.title} görseli`}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-6 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                  Detayları Gör <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white flex flex-col items-center text-center">
               <h2 className="text-4xl font-bold mb-6">Profesyonel Destek İçin Buradayız</h2>
               <p className="text-slate-400 mb-8 text-lg max-w-2xl">Aklınıza takılan tüm soruları yanıtlamak ve size en uygun sigorta teklifini hazırlamak için uzman ekibimiz bir tık uzağınızda.</p>
               <div className="flex flex-wrap justify-center gap-6">
                 <button onClick={() => navigateTo('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg">İletişim Bilgileri</button>
                 <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center gap-2">
                   <MessageCircle className="w-6 h-6" /> WhatsApp ile Yazın
                 </a>
               </div>
          </div>
        </div>
      </section>
    </>
  );

  const ContactPage = () => (
    <div className="bg-white min-h-screen">
      <PageHeader title="İletişim" subtitle="Sorularınız, görüşleriniz veya teklif talepleriniz için bize her zaman ulaşabilirsiniz." bgImage={STATIC_PAGE_IMAGES.contact} />
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Telefon</h4>
            <p className="text-slate-600 mb-4">Hafta içi 09:00 - 18:00 arası bizi arayabilirsiniz.</p>
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-blue-600 font-extrabold text-lg hover:underline">{CONTACT_INFO.phone}</a>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">WhatsApp</h4>
            <p className="text-slate-600 mb-4">Hızlı destek ve teklif için mesaj atın.</p>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">Mesaj Gönder</a>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">E-Posta</h4>
            <p className="text-slate-600 mb-4">Tüm talepleriniz için bize yazabilirsiniz.</p>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-indigo-600 font-extrabold text-lg hover:underline">{CONTACT_INFO.email}</a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl">
               <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                 <MapPin className="text-blue-600" /> Adres Bilgileri
               </h3>
               <p className="text-slate-600 leading-relaxed text-lg mb-8">
                 {CONTACT_INFO.address}
               </p>
               <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                 <h5 className="font-bold text-blue-900 mb-2">Ofis Ziyareti</h5>
                 <p className="text-blue-800 text-sm">Ofisimiz İstanbul Şişli merkezinde, ulaşımı son derece kolay bir konumdadır. Randevu alarak bizi ziyaret edebilirsiniz.</p>
               </div>
            </div>
          </div>
          
          <div className="h-[450px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.006967008779!2d28.985926315415397!3d41.06173497929517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a3692a37f5%3A0x892a40e1075727f2!2zMTkgTWF5xLFzLCBIYWxhc2thcmdhemkgQ2QuIE5vOjE3MiwgMzQzNjAgxZ5pxZ9saS_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );

  const InsuranceDetailPage = () => {
    const detail = INSURANCE_DETAILS[selectedInsurance || 'kasko'] || INSURANCE_DETAILS.kasko;
    return (
      <div className="bg-white min-h-screen">
        <PageHeader title={detail.title} subtitle={detail.longDescription} bgImage={detail.image} />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Poliçe Kapsamı ve Avantajlar</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {detail.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="font-medium text-slate-700 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-2xl">
                <h4 className="text-xl font-bold mb-4">Size Özel Fiyat Teklifi</h4>
                <p className="mb-6 text-blue-100">Poliçe detayları ve fiyat bilgisi için hemen iletişime geçin.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-center hover:bg-blue-50 transition-colors">Hemen Ara</a>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-emerald-600 transition-colors">WhatsApp Teklif</a>
                </div>
              </div>
            </div>
            <div className="sticky top-32">
              <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl bg-slate-100 min-h-[400px]">
                <img 
                  src={detail.image} 
                  alt={detail.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ClaimsPage = () => (
    <div className="bg-white min-h-screen">
      <PageHeader title="Hasar Bildirimi" subtitle="Hasar anında sakin kalın, biz yanınızdayız. İşte izlemeniz gereken adımlar." bgImage={STATIC_PAGE_IMAGES.claims} />
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        <div className="space-y-12">
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-6 items-start">
             <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
             <div>
               <h4 className="text-lg font-bold text-amber-900 mb-2">Acil Durum?</h4>
               <p className="text-amber-800">Hasar anında güvenliğinizi sağladıktan sonra vakit kaybetmeden bizi arayın. +90 532 747 94 59</p>
             </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900">Hasar Süreci Nasıl İşler?</h3>
            <div className="space-y-6">
              {[
                { t: 'Bilgilendirme', d: 'Hasarın oluştuğu andan itibaren en kısa sürede acentemize veya ilgili sigorta şirketinin hasar hattına bilgi verin.' },
                { t: 'Belge Toplama', d: 'Kaza tutanağı, alkol raporu, hasar fotoğrafları ve poliçe bilgilerinizi hazır bulundurun.' },
                { t: 'Dosya Açılışı', d: 'Uzman ekibimiz hasar dosyanızı açarak süreci başlatır ve dosya numaranızı size iletir.' },
                { t: 'Eksper Ataması', d: 'Sigorta şirketi tarafından atanan eksper hasarı yerinde inceler ve raporunu hazırlar.' },
                { t: 'Ödeme', d: 'Onaylanan hasar dosyaları kapsamında tazminat ödemesi poliçede belirtilen sürelerde gerçekleştirilir.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">{i+1}</div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-lg mb-1">{step.t}</h5>
                    <p className="text-slate-600">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FaqPage = () => (
    <div className="bg-white min-h-screen">
      <PageHeader title="Sıkça Sorulan Sorular" subtitle="Aklınızdaki sorulara hızlı cevaplar bulun." bgImage={STATIC_PAGE_IMAGES.faq} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {[
            { q: 'Poliçemi nasıl yenileyebilirim?', a: 'Poliçe vadeniz dolmadan 15 gün önce uzman danışmanlarımız sizi arayarak en güncel teklifleri sunar. Onayınız ile yenileme işlemi dakikalar içinde tamamlanır.' },
            { q: 'Hasar anında hangi numarayı aramalıyım?', a: 'Öncelikle acentemizi (+90 532 747 94 59) arayabilirsiniz. Ayrıca poliçenizin ait olduğu sigorta şirketinin 7/24 hasar hattına poliçe üzerindeki numaradan ulaşabilirsiniz.' },
            { q: 'Zorunlu Trafik Sigortası ile Kasko arasındaki fark nedir?', a: 'Trafik sigortası karşı tarafa verdiğiniz zararları karşılarken, Kasko sigortası kendi aracınızdaki hasarları güvence altına alır.' },
            { q: 'Tamamlayıcı Sağlık Sigortası her hastanede geçerli mi?', a: 'Hayır, sadece SGK ile anlaşmalı ve poliçenizi düzenleyen sigorta şirketinin ağındaki özel hastanelerde geçerlidir.' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h5 className="font-bold text-slate-900 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600" /> {item.q}
              </h5>
              <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div onClick={() => navigateTo('home')}>
              <Logo />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigateTo('home')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Anasayfa</button>
              <button onClick={() => navigateTo('about')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hakkımızda</button>
              <button onClick={() => navigateTo('services')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hizmetlerimiz</button>
              <button onClick={() => navigateTo('claims')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hasar Bildirimi</button>
              <button onClick={() => navigateTo('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95">
                İletişim
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-xl">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 text-slate-600 font-medium">Anasayfa</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-2 text-slate-600 font-medium">Hakkımızda</button>
            <button onClick={() => navigateTo('services')} className="block w-full text-left py-2 text-slate-600 font-medium">Hizmetlerimiz</button>
            <button onClick={() => navigateTo('claims')} className="block w-full text-left py-2 text-slate-600 font-medium">Hasar Bildirimi</button>
            <button onClick={() => navigateTo('contact')} className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold">İletişim</button>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' && <HomeContent />}
        {currentPage === 'about' && (
          <div className="bg-white min-h-screen">
            <PageHeader title="Hakkımızda" subtitle="Side Sigorta, yılların verdiği deneyim ve güvenle sigortacılık sektöründe öncü bir rol üstlenmektedir." bgImage={STATIC_PAGE_IMAGES.about} />
            <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24 space-y-12">
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Güven Yolculuğumuz</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Side Sigorta, yılların verdiği deneyim ve güvenle sigortacılık sektöründe öncü bir rol üstlenmektedir. 
                  Müşterilerimizin yaşamlarını, varlıklarını ve geleceklerini korumak için en modern çözümleri, kurumsal 
                  bir ciddiyet and samimi bir yaklaşımla sunuyoruz.
                </p>
              </section>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Vizyonumuz</h3>
                  <p className="text-slate-600">Türkiye genelinde sigorta bilincini artırarak, teknolojinin tüm imkanlarını kullanan, en güvenilir ve en hızlı hizmet veren dijitalleşmiş sigorta acentesi olmak.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Misyonumuz</h3>
                  <p className="text-slate-600">Karmaşık sigorta süreçlerini basitleştirerek, her bütçeye ve her ihtiyaca uygun, kişiselleştirilmiş poliçe çözümleri üretmek ve hasar anında müşterimizin en büyük destekçisi olmak.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'kvkk' && (
           <div className="bg-white min-h-screen">
             <PageHeader title="KVKK Aydınlatma Metni" subtitle="Kişisel verilerinizin korunması ve güvenliği bizim için en yüksek önceliktir." bgImage={STATIC_PAGE_IMAGES.kvkk} />
             <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-slate-600 leading-relaxed">
               <p className="font-bold text-slate-900">Side Sigorta Aracılık Hizmetleri LTD. ŞTİ.</p>
               <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz Side Sigorta tarafından veri sorumlusu sıfatıyla işlenebilecektir.</p>
               <h3 className="text-xl font-bold text-slate-900 pt-4">Veri İşleme Amaçları</h3>
               <p>Sigorta poliçelerinin düzenlenmesi, hasar yönetimi, risk değerlendirmesi ve yasal bildirimlerin yapılması ana amaçlarımızdır.</p>
             </div>
           </div>
        )}
        {currentPage === 'cookies' && (
           <div className="bg-white min-h-screen">
             <PageHeader title="Çerez Politikası" subtitle="Daha iyi bir kullanıcı deneyimi için çerez teknolojilerini kullanıyoruz." bgImage={STATIC_PAGE_IMAGES.cookies} />
             <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-slate-600 leading-relaxed">
               <h3 className="text-xl font-bold text-slate-900">Kullanım Amacı</h3>
               <p>Web sitemizdeki deneyiminizi iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanıyoruz.</p>
             </div>
           </div>
        )}
        {currentPage === 'services' && (
           <div className="bg-white min-h-screen">
             <PageHeader title="Hizmetlerimiz" subtitle="Tüm sigorta branşlarında en geniş teminat seçenekleriyle yanınızdayız." bgImage={STATIC_PAGE_IMAGES.services} />
             <div className="max-w-7xl mx-auto px-4 py-16">
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {SERVICES.map((s) => (
                    <div key={s.id} onClick={() => navigateTo('insurance-detail', s.id)} className="p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer bg-white group">
                      <div className="mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={s.image}
                          alt={`${s.title} görseli`}
                          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                      <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                      <p className="text-slate-600 mb-6">{s.description}</p>
                      <button className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">İncele <ArrowRight className="w-4 h-4" /></button>
                    </div>
                 ))}
               </div>
             </div>
           </div>
        )}
        {currentPage === 'insurance-detail' && <InsuranceDetailPage />}
        {currentPage === 'claims' && <ClaimsPage />}
        {currentPage === 'faq' && <FaqPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div onClick={() => navigateTo('home')}>
                <Logo />
              </div>
              <p className="text-slate-500 max-w-sm">
                Side Sigorta, profesyonel acentelik anlayışı ile güvenilir limanınız olmaya devam ediyor.
              </p>
              <div className="space-y-2">
                 <p className="text-slate-700 font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-blue-600" /> {CONTACT_INFO.phone}</p>
                 <p className="text-slate-500 text-sm flex items-start gap-2"><MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" /> {CONTACT_INFO.address}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-bold text-slate-900">Kurumsal</h5>
              <ul className="space-y-3 text-slate-600">
                <li><button onClick={() => navigateTo('about')} className="hover:text-blue-600 transition-colors">Hakkımızda</button></li>
                <li><button onClick={() => navigateTo('kvkk')} className="hover:text-blue-600 transition-colors">KVKK Aydınlatma</button></li>
                <li><button onClick={() => navigateTo('cookies')} className="hover:text-blue-600 transition-colors">Çerez Politikası</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-slate-900">Sigorta Türleri</h5>
              <ul className="space-y-3 text-slate-600">
                <li><button onClick={() => navigateTo('insurance-detail', 'kasko')} className="hover:text-blue-600 transition-colors">Araç Sigortası</button></li>
                <li><button onClick={() => navigateTo('insurance-detail', 'saglik')} className="hover:text-blue-600 transition-colors">Sağlık Sigortası</button></li>
                <li><button onClick={() => navigateTo('insurance-detail', 'konut')} className="hover:text-blue-600 transition-colors">Konut Sigortası</button></li>
                <li><button onClick={() => navigateTo('insurance-detail', 'isyeri')} className="hover:text-blue-600 transition-colors">İş Yeri Sigortası</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-slate-900">Destek</h5>
              <ul className="space-y-3 text-slate-600">
                <li><button onClick={() => navigateTo('claims')} className="hover:text-blue-600 transition-colors">Hasar Bildirimi</button></li>
                <li><button onClick={() => navigateTo('faq')} className="hover:text-blue-600 transition-colors">Sıkça Sorulanlar</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-blue-600 transition-colors">İletişim</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 Side Sigorta. Tüm hakları saklıdır. sidesigorta.com.tr</p>
            <div className="flex gap-8">
               <div className="flex items-center gap-2">
                 <Shield className="w-4 h-4" /> 256-bit Güvenli Altyapı
               </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChatbot />
    </div>
  );
};

export default App;
