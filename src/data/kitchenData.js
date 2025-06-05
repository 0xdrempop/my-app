import kitchen1 from '../assets/kitchen1.jpg';
import kitchen2 from '../assets/kitchen2.jpg';
import kitchen3 from '../assets/kitchen3.jpg';

const kitchenData = [
  {
    id: 'k1',
    caption: 'Dapur Industrial Modern',
    description: 'Dapur profesional kami dengan peralatan stainless steel berteknologi tinggi yang memenuhi standar HACCP untuk keamanan pangan.',
    image: kitchen1,
    meta: {
      chef: 'Chef Andi',
      certification: 'ISO 22000 Certified',
      features: ['Ventilasi industrial', 'Peralatan anti-bakteri', 'Zona kerja ergonomis']
    }
  },
  {
    id: 'k2',
    caption: 'Area Prep Bahan Organik',
    description: 'Zona khusus persiapan bahan organik lokal dengan sistem penyimpanan FIFO (First In First Out) untuk kesegaran optimal.',
    image: kitchen2,
    meta: {
      chef: 'Chef Bella',
      certification: 'Organik Certified',
      features: ['Pencahayaan natural', 'Suhu terkontrol', 'Permukaan anti-microbial']
    }
  },
  {
    id: 'k3',
    caption: 'Smart Storage System',
    description: 'Sistem penyimpanan cerdas dengan kontrol suhu dan kelembaban optimal untuk bahan mentah.',
    image: kitchen3,
    meta: {
      chef: 'Chef Rama',
      certification: 'Food Safety Certified',
      features: ['Kontrol suhu otomatis', 'Sirkulasi udara', 'Monitoring digital']
    }
  }
];

export default kitchenData;