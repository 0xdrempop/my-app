import food1 from '../assets/food1.jpg';
import paketA from '../assets/paket-a.jpg';

const menuData = [
  {
    id: '1',
    name: 'Paket A - Nasi Box',
    category: 'box',
    price: 25000,
    description: 'Nasi, ayam goreng, sambal, lalapan, dan air mineral.',
    images: [food1, paketA],
  },
  {
    id: '2',
    name: 'Paket B - Prasmanan',
    category: 'prasmanan',
    price: 50000,
    description: 'Nasi, rendang, sayur sop, sambal, dan es teh.',
    images: [food1, paketA],
  },
];

export default menuData;