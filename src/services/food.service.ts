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
  methionine?: number;
  leucine?: number;
  isoleucine?: number;
  lysine?: number;
  phenylalanine?: number;
  threonine?: number;
  tryptophan?: number;
  valine?: number;
}

interface NonEssencialAminoAcids {
  arginine?: number;
  histidine?: number;
  proline?: number;
  glycine?: number;
  asparagine?: number;
  glutamine?: number;
  cystine?: number;
  alanine?: number;
  asparticAcid?: number;
  glutamicAcid?: number;
  serine?: number;
  tyrosine?: number;
}

type AminoAcids = EssencialAminoAcids & NonEssencialAminoAcids;

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
  aminoAcids?: AminoAcids;
  unitOfMeasurement?: UnitOfMeasurement;
  oneMeasure?: {
    praticalUnitOfMeasurement: PraticalUnitOfMeasurement;
    correspondingMeasure: number;
  };
}
