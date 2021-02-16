export enum UnitOfMeasurement {
  gram,
  liter,
}

export const MeasurerValues = {
  CUP: 'xícara',
  TABLE_SPOON: 'colhar de sopa',
  TEA_SPOON: 'colher de chá',
  UNITY: 'unidade',
  LITERAL: 'literal',
  NONE: '',
};

export type Measurer = keyof typeof MeasurerValues;

export interface Measure {
  type: Measurer;
  quantity: number;
}

export interface EssencialAminoAcids {
  methionine: number;
  leucine: number;
  isoleucine: number;
  lysine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  valine: number;
  histidine: number;
}

export interface NonEssencialAminoAcids {
  arginine: number;
  proline: number;
  glycine: number;
  glutamine: number;
  cystine: number;
  alanine: number;
  asparticAcid: number;
  glutamicAcid: number;
  serine: number;
  tyrosine: number;
}

export type AminoAcids = EssencialAminoAcids & NonEssencialAminoAcids;

export const SHAPE_AMINO_ACIDS: AminoAcids = {
  alanine: 0,
  arginine: 0,
  asparticAcid: 0,
  cystine: 0,
  glutamicAcid: 0,
  glutamine: 0,
  glycine: 0,
  histidine: 0,
  isoleucine: 0,
  leucine: 0,
  lysine: 0,
  methionine: 0,
  phenylalanine: 0,
  proline: 0,
  serine: 0,
  threonine: 0,
  tryptophan: 0,
  tyrosine: 0,
  valine: 0,
};

export interface Food {
  id: number;
  name: string;
  description?: string;
  enName: string;
  image?: string;
  gi?: number;
  calories?: number;
  acidification?: number;
  carbohydrates?: number;
  proteins?: number;
  saturedFats?: number;
  monounsaturatedFats?: number;
  totalFat?: number;
  dietaryFiber?: number;
  minerals?: {
    sodium?: number;
    calcium?: number;
    phosphorus?: number;
    manganese?: number;
    magnesium?: number;
    iron?: number;
    potassium?: number;
    copper?: number;
    zinc?: number;
  };
  vitamins?: {
    c?: number;
    b1?: number;
    b2?: number;
    b5?: number;
    b6?: number;
    b7?: number;
    b9?: number;
    folicAcid?: number;
    foodFolate?: number;
    folateDFE?: number;
    choline?: number;
    b12?: number;
    retinol?: number;
    betaCarotene?: number;
    alphaCarotene?: number;
    cryptoxanthinCarotene?: number;
    a?: number;
    lycopene?: number;
    e?: number;
    d?: number;
    d2?: number;
    d3?: number;
    k?: number;
    k1?: number;
  };
  gl?: number;
  aminoAcids: AminoAcids;
  unitOfMeasurement?: UnitOfMeasurement;
  oneMeasures?: Array<Measure>;
  keys: Array<string>;
}

export enum TRANSLATED_AMINO_ACIDS {
  alanine = 'Alanina',
  arginine = 'Arginina',
  asparticAcid = 'Ácido Aspártico',
  cystine = 'Cistina',
  glutamicAcid = 'Ácido Glutâmico',
  glutamine = 'Glutamina',
  glycine = 'Glicina',
  histidine = 'Histidina',
  isoleucine = 'Isoleucina',
  leucine = 'Leucina',
  lysine = 'Lisina',
  methionine = 'Metionina',
  phenylalanine = 'Fenilalanina',
  proline = 'Prolina',
  serine = 'Serina',
  threonine = 'Treonina',
  tryptophan = 'Triptofano',
  tyrosine = 'Tirosina',
  valine = 'Valina',
}
