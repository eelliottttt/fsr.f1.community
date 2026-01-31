export interface Circuit {
  id: string;
  name: string;
  location: string;
  country: string;
  length: string;
  laps: number;
  lapRecord: string;
  image: string;
  flag: string;
  coordinates: { x: number; y: number };
}

export const circuits: Circuit[] = [
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    location: 'Monza',
    country: 'Italie',
    length: '5.793 km',
    laps: 53,
    lapRecord: '1:21.046',
    image: '/images/téléchargement (7).jpg',
    flag: '🇮🇹',
    coordinates: { x: 52, y: 35 },
  },
  {
    id: 'silverstone',
    name: 'Silverstone Circuit',
    location: 'Silverstone',
    country: 'Royaume-Uni',
    length: '5.891 km',
    laps: 52,
    lapRecord: '1:27.097',
    image: '/images/Mercedes-AMG F1 Beast Wallpaper– Speed, Power, Perfection.jpg',
    flag: '🇬🇧',
    coordinates: { x: 48, y: 28 },
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    location: 'Monte-Carlo',
    country: 'Monaco',
    length: '3.337 km',
    laps: 78,
    lapRecord: '1:12.909',
    image: '/images/Ayrton Senna at Monaco_ The Iconic Casino Corner Moment.jpg',
    flag: '🇲🇨',
    coordinates: { x: 50, y: 36 },
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    location: 'Spa',
    country: 'Belgique',
    length: '7.004 km',
    laps: 44,
    lapRecord: '1:46.286',
    image: '/images/téléchargement.jpg',
    flag: '🇧🇪',
    coordinates: { x: 49, y: 29 },
  },
  {
    id: 'suzuka',
    name: 'Suzuka International Racing Course',
    location: 'Suzuka',
    country: 'Japon',
    length: '5.807 km',
    laps: 53,
    lapRecord: '1:30.983',
    image: '/images/Calendrier 2026 du Championnat du monde de Formule 1.jpg',
    flag: '🇯🇵',
    coordinates: { x: 85, y: 38 },
  },
  {
    id: 'jeddah',
    name: 'Jeddah Street Circuit',
    location: 'Jeddah',
    country: 'Arabie Saoudite',
    length: '6.174 km',
    laps: 50,
    lapRecord: '1:30.734',
    image: '/images/saudi arabia gp 2023.jpg',
    flag: '🇸🇦',
    coordinates: { x: 58, y: 42 },
  },
];
