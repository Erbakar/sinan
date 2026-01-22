
import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  HeartPulse, 
  Home, 
  Plane, 
  Briefcase, 
  Clock, 
  Users, 
  Award,
  Umbrella
} from 'lucide-react';
import { Service, Feature } from './types';

export const CONTACT_INFO = {
  phone: "+90 532 747 94 59",
  address: "19 MAYIS MAH. HALASKARGAZİ CAD. ÜNSAL ÇARŞISI NO: 172 İÇ KAPI NO: 167 ŞİŞLİ/ İSTANBUL",
  email: "info@sidesigorta.com.tr",
  whatsapp: "905327479459"
};

export const SERVICES: Service[] = [
  {
    id: 'kasko',
    title: 'Kasko & Trafik',
    description: 'Aracınız için en kapsamlı koruma seçenekleri ve zorunlu trafik sigortasında en uygun teklifler.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    icon: <Car className="w-8 h-8" />,
    color: 'blue'
  },
  {
    id: 'saglik',
    title: 'Tamamlayıcı Sağlık',
    description: 'SGK anlaşmalı özel hastanelerde fark ücreti ödemeden muayene ve tedavi imkanı.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    icon: <HeartPulse className="w-8 h-8" />,
    color: 'emerald'
  },
  {
    id: 'konut',
    title: 'Konut & DASK',
    description: 'Evinizi ve eşyalarınızı yangından hırsızlığa kadar her türlü riske karşı güvence altına alın.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800',
    icon: <Home className="w-8 h-8" />,
    color: 'amber'
  },
  {
    id: 'hayat',
    title: 'Hayat Sigortası',
    description: 'Sevdiklerinizin geleceğini teminat altına alın, birikimlerinizi profesyonelce yönetelim.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    icon: <Umbrella className="w-8 h-8" />,
    color: 'indigo'
  },
  {
    id: 'seyahat',
    title: 'Seyahat Sağlık',
    description: 'Yurt dışı seyahatlerinizde vize işlemleri için zorunlu ve kapsamlı sağlık güvencesi.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
    icon: <Plane className="w-8 h-8" />,
    color: 'sky'
  },
  {
    id: 'isyeri',
    title: 'İş Yeri Sigortası',
    description: 'İşletmenizi, demirbaşlarınızı ve sorumluluklarınızı tek bir poliçe ile koruyun.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'rose'
  }
];

export const FEATURES: Feature[] = [
  {
    title: '7/24 Hasar Desteği',
    description: 'İhtiyaç duyduğunuz her an yanınızdayız. Hasar anında hızlı çözüm merkezi.',
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: 'Uzman Danışmanlık',
    description: 'Alanında deneyimli ekibimizle size en uygun poliçeyi birlikte belirliyoruz.',
    icon: <Users className="w-6 h-6" />
  },
  {
    title: 'En İyi Fiyat Garantisi',
    description: 'Onlarca sigorta şirketinden aldığımız tekliflerle size en ekonomik çözümü sunuyoruz.',
    icon: <Award className="w-6 h-6" />
  },
  {
    title: 'Güvenli Hizmet',
    description: 'Kişisel verileriniz ve poliçeleriniz Side Sigorta güvencesi altındadır.',
    icon: <ShieldCheck className="w-6 h-6" />
  }
];
