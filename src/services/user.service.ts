enum Ojective {
  HEALTH = 'Saúde',
  MUSCLE = 'Músculatura',
  LOSE_WEIGHT = 'Perder peso',
}

enum Biotype {
  ECTOMORPH = 'Ectomorfo',
  ENDOMORPH = 'Endomorfo',
  MESOMORPH = 'Mesomorfo',
}

export interface User {
  name: string;
  age: number;
  objectives: Array<Ojective>;
  biotype: Biotype;
}

export type SetUser = (User) => void;
