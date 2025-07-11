export interface Corpus {
  id: number;
  name: string;
  imageUrl: string;
}

export interface University {
  id: number;
  name: string;
  region: string;
  yearFounded: number;
  corpora: Corpus[];
}
