export interface Driver {
  name: string;
  number: number;
  image: string;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  secondaryColor: string;
  drivers: Driver[];
  image: string;
  logo: string;
  championships: number;
}

export const teams: Team[] = [
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    color: '#1e41ff',
    secondaryColor: '#e63946',
    drivers: [
      { name: 'Max Verstappen', number: 1, image: '/images/Max Verstappen 4k phone wallpaper.jpg' },
      { name: 'Sergio Perez', number: 11, image: '/images/sergio perez - Sakhir GP.jpg' },
    ],
    image: '/images/🤔°○ 2026 Oracle Red Bull Racing Livery.jpg',
    logo: 'redbull',
    championships: 6,
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    fullName: 'Mercedes-AMG PETRONAS F1 Team',
    color: '#00d2be',
    secondaryColor: '#c0c0c0',
    drivers: [
      { name: 'Lewis Hamilton', number: 44, image: '/images/Lewis Hamilton wallpaper.jpg' },
      { name: 'George Russell', number: 63, image: '/images/Sir Lewis Hamilton⭐.jpg' },
    ],
    image: '/images/Mercedes AMG Petronas f1 Team Wallpaper.jpg',
    logo: 'mercedes',
    championships: 8,
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari HP',
    color: '#dc0000',
    secondaryColor: '#ffeb3b',
    drivers: [
      { name: 'Charles Leclerc', number: 16, image: '/images/charles leclerc.jpg' },
      { name: 'Lewis Hamilton', number: 44, image: '/images/Lewis Hamilton wallpaper.jpg' },
    ],
    image: '/images/téléchargement (2).jpg',
    logo: 'ferrari',
    championships: 16,
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    fullName: 'McLaren F1 Team',
    color: '#ff8000',
    secondaryColor: '#0066cc',
    drivers: [
      { name: 'Lando Norris', number: 4, image: '/images/#landonorris_.jpg' },
      { name: 'Oscar Piastri', number: 81, image: '/images/Oscar Piastri _ F1 Wallpaper.jpg' },
    ],
    image: '/images/Oscar Piastri 81 Monaco 2025.jpg',
    logo: 'mclaren',
    championships: 8,
  },
  {
    id: 'astonmartin',
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco F1 Team',
    color: '#006f62',
    secondaryColor: '#c5ff00',
    drivers: [
      { name: 'Fernando Alonso', number: 14, image: '/images/Fernando Alonso.jpg' },
      { name: 'Lance Stroll', number: 18, image: '/images/téléchargement (3).jpg' },
    ],
    image: '/images/téléchargement (1).jpg',
    logo: 'astonmartin',
    championships: 0,
  },
  {
    id: 'alpine',
    name: 'Alpine',
    fullName: 'BWT Alpine F1 Team',
    color: '#0090ff',
    secondaryColor: '#ff69b4',
    drivers: [
      { name: 'Pierre Gasly', number: 10, image: '/images/téléchargement (4).jpg' },
      { name: 'Esteban Ocon', number: 31, image: '/images/téléchargement (5).jpg' },
    ],
    image: '/images/téléchargement (6).jpg',
    logo: 'alpine',
    championships: 2,
  },
];
