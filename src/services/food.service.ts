export enum UnitOfMeasurement {
  gram,
  liter,
}

export enum PraticalUnitOfMeasurement {
  spoon,
  cup,
  unity,
}

interface EssencialAminoAcids {
  methionine: number;
  leucine: number;
  isoleucine: number;
  lysine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  valine: number;
}

interface NonEssencialAminoAcids {
  arginine: number;
  histidine: number;
  proline: number;
  glycine: number;
  asparagine: number;
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
  asparagine: 0,
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
  gl?: number;
  aminoAcids: AminoAcids;
  unitOfMeasurement?: UnitOfMeasurement;
  oneMeasure?: {
    praticalUnitOfMeasurement: PraticalUnitOfMeasurement;
    correspondingMeasure: number;
  };
}
