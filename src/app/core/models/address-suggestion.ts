export interface AddressSuggestion {
  status: boolean;
  regions: Region[];
}

interface Region {
  city: string;
  district: string;
  state: string;
}

export enum StreetType {
  Street = 'Street',
  Road = 'Road',
  Avenue = 'Avenue',
  Lane = 'Lane',
  Boulevard = 'Boulevard',
  Place = 'Place',
  Alley = 'Alley',
  Square = 'Square',
  Bypass = 'Bypass',
  Crossing = 'Crossing',
  Extension = 'Extension',
  Gali = 'Gali',
  Chowk = 'Chowk',
  Basti = 'Basti',
  Nagar = 'Nagar',
  Sector = 'Sector',
  Colony = 'Colony',
  Block = 'Block',
  Vihar = 'Vihar',
  Path = 'Path'
}
