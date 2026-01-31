export interface DriverStanding {
  position: number;
  driver: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  image: string;
  nationality: string;
  number: number;
}

export interface TeamStanding {
  position: number;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  color: string;
  logo: string;
}

export const driverStandings: DriverStanding[] = [
  {
    position: 1,
    driver: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 437,
    wins: 9,
    podiums: 14,
    image: '/images/Max Verstappen 4k phone wallpaper.jpg',
    nationality: 'NL',
    number: 1,
  },
  {
    position: 2,
    driver: 'Lando Norris',
    team: 'McLaren',
    points: 374,
    wins: 4,
    podiums: 13,
    image: '/images/#landonorris_.jpg',
    nationality: 'GB',
    number: 4,
  },
  {
    position: 3,
    driver: 'Charles Leclerc',
    team: 'Ferrari',
    points: 356,
    wins: 3,
    podiums: 11,
    image: '/images/charles leclerc.jpg',
    nationality: 'MC',
    number: 16,
  },
  {
    position: 4,
    driver: 'Oscar Piastri',
    team: 'McLaren',
    points: 292,
    wins: 2,
    podiums: 8,
    image: '/images/Oscar Piastri _ F1 Wallpaper.jpg',
    nationality: 'AU',
    number: 81,
  },
  {
    position: 5,
    driver: 'Carlos Sainz',
    team: 'Ferrari',
    points: 290,
    wins: 2,
    podiums: 9,
    image: '/images/Carlos Sainz Jr Singapore GP 2023 Ferrari.jpg',
    nationality: 'ES',
    number: 55,
  },
  {
    position: 6,
    driver: 'Lewis Hamilton',
    team: 'Mercedes',
    points: 223,
    wins: 0,
    podiums: 4,
    image: '/images/Lewis Hamilton wallpaper.jpg',
    nationality: 'GB',
    number: 44,
  },
  {
    position: 7,
    driver: 'Sergio Perez',
    team: 'Red Bull Racing',
    points: 152,
    wins: 0,
    podiums: 4,
    image: '/images/sergio perez - Sakhir GP.jpg',
    nationality: 'MX',
    number: 11,
  },
  {
    position: 8,
    driver: 'Fernando Alonso',
    team: 'Aston Martin',
    points: 70,
    wins: 0,
    podiums: 0,
    image: '/images/Fernando Alonso.jpg',
    nationality: 'ES',
    number: 14,
  },
];

export const teamStandings: TeamStanding[] = [
  {
    position: 1,
    team: 'McLaren',
    points: 666,
    wins: 6,
    podiums: 21,
    color: '#ff8000',
    logo: 'mclaren',
  },
  {
    position: 2,
    team: 'Ferrari',
    points: 652,
    wins: 5,
    podiums: 20,
    color: '#dc0000',
    logo: 'ferrari',
  },
  {
    position: 3,
    team: 'Red Bull Racing',
    points: 589,
    wins: 9,
    podiums: 18,
    color: '#1e41ff',
    logo: 'redbull',
  },
  {
    position: 4,
    team: 'Mercedes',
    points: 468,
    wins: 0,
    podiums: 8,
    color: '#00d2be',
    logo: 'mercedes',
  },
  {
    position: 5,
    team: 'Aston Martin',
    points: 94,
    wins: 0,
    podiums: 0,
    color: '#006f62',
    logo: 'astonmartin',
  },
  {
    position: 6,
    team: 'Alpine',
    points: 65,
    wins: 0,
    podiums: 0,
    color: '#0090ff',
    logo: 'alpine',
  },
];
