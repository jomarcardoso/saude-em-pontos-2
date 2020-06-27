import {
  Food,
  UnitOfMeasurement,
  PraticalUnitOfMeasurement,
  SHAPE_AMINO_ACIDS,
} from '../services/food.service';
import fs from 'fs';
import path from 'path';

const foods: Array<Food> = [
  {
    name: 'Maçã Fugi',
    enName: 'apple',
    id: 1,
    gi: 25,
    gl: 3,
    image: '/images/food/apple.svg',
    calories: 52,
    carbohydrates: 14,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: 192,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
    aminoAcids: SHAPE_AMINO_ACIDS,
  },
  {
    name: 'Pêra',
    enName: 'pear',
    id: 2,
    gi: 38,
    image: '/images/food/pear.svg',
    calories: 57,
    aminoAcids: {
      tryptophan: 2,
      threonine: 11,
      isoleucine: 11,
      leucine: 19,
      lysine: 17,
      methionine: 2,
      cystine: 2,
      phenylalanine: 11,
      tyrosine: 2,
      valine: 17,
      histidine: 2,
      arginine: 10,
      alanine: 14,
      asparticAcid: 105,
      glutamicAcid: 30,
      glycine: 13,
      proline: 21,
      serine: 15,
      asparagine: 0,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: 178,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
  },
  {
    name: 'Banana Prata',
    enName: 'silver-banana',
    id: 3,
    gi: 39,
    gl: 8,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 28,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      asparagine: 0,
      glutamine: 0,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: 101,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
  },
  {
    name: 'Arroz Branco',
    enName: 'white-rice',
    id: 4,
    gi: 81,
    gl: 18,
    carbohydrates: 32,
    image: '/images/food/rice.svg',
    calories: 130,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: PraticalUnitOfMeasurement.cup,
      praticalUnitOfMeasurement: 158,
    },
    aminoAcids: {
      tryptophan: 31,
      threonine: 96,
      isoleucine: 116,
      leucine: 222,
      lysine: 97,
      methionine: 163,
      cystine: 55,
      phenylalanine: 144,
      tyrosine: 90,
      valine: 164,
      histidine: 63,
      arginine: 224,
      alanine: 156,
      asparticAcid: 253,
      glutamicAcid: 524,
      glycine: 122,
      proline: 127,
      serine: 141,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    name: 'Feijão',
    enName: 'bean',
    id: 5,
    gi: 29,
    image: '/images/food/bean.svg',
    calories: 76,
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: 172,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.cup,
    },
    aminoAcids: {
      tryptophan: 105,
      threonine: 373,
      isoleucine: 391,
      leucine: 708,
      lysine: 608,
      methionine: 133,
      cystine: 96,
      phenylalanine: 479,
      tyrosine: 250,
      valine: 464,
      histidine: 247,
      arginine: 549,
      alanine: 372,
      asparticAcid: 1072,
      glutamicAcid: 1351,
      glycine: 346,
      proline: 376,
      serine: 482,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    name: 'Banana Nanica',
    enName: 'nanica-banana',
    id: 6,
    gi: 70,
    gl: 14,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 28,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    name: 'Banana Mysore',
    enName: 'mysore-banana',
    id: 7,
    gi: 87,
    gl: 6,
    image: '/images/food/banana.svg',
    calories: 89,
    carbohydrates: 12,
    aminoAcids: {
      tryptophan: 9,
      threonine: 28,
      isoleucine: 28,
      leucine: 68,
      lysine: 50,
      methionine: 8,
      cystine: 9,
      phenylalanine: 49,
      tyrosine: 9,
      valine: 47,
      histidine: 77,
      arginine: 49,
      alanine: 40,
      asparticAcid: 124,
      glutamicAcid: 152,
      glycine: 28,
      proline: 38,
      serine: 40,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    name: 'Suco de Laranja',
    enName: 'oragen-juice',
    id: 8,
    gi: 41,
    gl: 6,
    image: '/images/food/orange-juice.svg',
    calories: 0,
    carbohydrates: 14,
    aminoAcids: {
      tryptophan: 2,
      threonine: 8,
      isoleucine: 8,
      leucine: 13,
      lysine: 9,
      methionine: 3,
      cystine: 5,
      phenylalanine: 9,
      tyrosine: 4,
      valine: 1,
      histidine: 3,
      arginine: 47,
      alanine: 15,
      asparticAcid: 75,
      glutamicAcid: 33,
      glycine: 9,
      proline: 44,
      serine: 13,
      asparagine: 0,
      glutamine: 0,
    },
    oneMeasure: {
      correspondingMeasure: 248,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.cup,
    },
    unitOfMeasurement: UnitOfMeasurement.liter,
  },
  {
    name: 'Polenta',
    enName: 'polenta',
    id: 9,
    gi: 74,
    gl: 11,
    image: '/images/food/polenta.svg',
    calories: 0,
    carbohydrates: 21,
    aminoAcids: {
      tryptophan: 10,
      threonine: 54,
      isoleucine: 51,
      leucine: 175,
      lysine: 40,
      methionine: 30,
      cystine: 26,
      phenylalanine: 70,
      tyrosine: 58,
      valine: 72,
      histidine: 44,
      arginine: 71,
      alanine: 107,
      asparticAcid: 99,
      glutamicAcid: 268,
      glycine: 59,
      proline: 125,
      serine: 68,
      asparagine: 0,
      glutamine: 0,
    },
    oneMeasure: {
      correspondingMeasure: 233,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.cup,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    name: 'Pão Francês',
    enName: 'bread-roll',
    id: 10,
    gi: 100,
    gl: 14,
    image: '/images/food/bread-roll.svg',
    calories: 0,
    carbohydrates: 20,
    aminoAcids: {
      tryptophan: 99,
      threonine: 255,
      isoleucine: 336,
      leucine: 608,
      lysine: 231,
      methionine: 153,
      cystine: 182,
      phenylalanine: 422,
      tyrosine: 249,
      valine: 380,
      histidine: 188,
      arginine: 320,
      alanine: 302,
      asparticAcid: 414,
      glutamicAcid: 2772,
      glycine: 309,
      proline: 926,
      serine: 416,
      asparagine: 0,
      glutamine: 0,
    },
    oneMeasure: {
      correspondingMeasure: 38,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
  },
  {
    name: 'Morango',
    enName: 'strawberry',
    id: 11,
    gi: 53,
    gl: 2,
    image: '/images/food/strawberry.svg',
    calories: 0,
    carbohydrates: 6,
    aminoAcids: SHAPE_AMINO_ACIDS,
  },
  {
    id: 12,
    name: 'pastel',
    enName: 'pasty',
    image: '/images/food/pasty.svg',
    description: 'pastel de carne, frito',
    aminoAcids: {
      tryptophan: 120,
      threonine: 300,
      isoleucine: 410,
      leucine: 810,
      lysine: 390,
      methionine: 190,
      cystine: 70,
      phenylalanine: 500,
      tyrosine: 360,
      valine: 500,
      arginine: 410,
      histidine: 180,
      alanine: 310,
      asparticAcid: 540,
      glutamicAcid: 370,
      glycine: 300,
      proline: 180,
      serine: 470,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    id: 13,
    name: 'alho',
    enName: 'garlic',
    image: '/images/food/garlic.svg',
    description: 'Alho-poró, cru',
    aminoAcids: {
      tryptophan: 10,
      threonine: 30,
      isoleucine: 40,
      leucine: 70,
      lysine: 80,
      methionine: 10,
      cystine: 0,
      phenylalanine: 50,
      tyrosine: 60,
      valine: 50,
      arginine: 80,
      histidine: 20,
      alanine: 60,
      asparticAcid: 50,
      glutamicAcid: 180,
      glycine: 50,
      proline: 30,
      serine: 40,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    id: 14,
    enName: 'lettuce',
    name: 'alface',
    image: '/images/food/lettuce.svg',
    description: 'Alface, roxa, crua',
    aminoAcids: {
      tryptophan: 0,
      threonine: 30,
      isoleucine: 30,
      leucine: 60,
      lysine: 50,
      methionine: 10,
      cystine: 0,
      phenylalanine: 40,
      tyrosine: 40,
      valine: 40,
      arginine: 60,
      histidine: 20,
      alanine: 50,
      asparticAcid: 50,
      glutamicAcid: 110,
      glycine: 40,
      proline: 30,
      serine: 30,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    id: 15,
    name: 'Presunto',
    enName: 'ham',
    image: '/images/food/ham.svg',
    description: 'Presunto, sem capa de gordura',
    aminoAcids: {
      tryptophan: 150,
      threonine: 710,
      isoleucine: 690,
      leucine: 1150,
      lysine: 1280,
      methionine: 480,
      cystine: 220,
      phenylalanine: 630,
      tyrosine: 550,
      valine: 720,
      arginine: 1200,
      histidine: 890,
      alanine: 820,
      asparticAcid: 1370,
      glutamicAcid: 2360,
      glycine: 730,
      proline: 650,
      serine: 680,
      asparagine: 0,
      glutamine: 0,
    },
  },
  {
    id: 16,
    name: 'Abacaxi',
    enName: 'pineapple',
    unitOfMeasurement: UnitOfMeasurement.gram,
    oneMeasure: {
      correspondingMeasure: 905,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
    image: '/images/food/pineapple.svg',
    aminoAcids: {
      alanine: 33,
      arginine: 19,
      asparagine: 19,
      asparticAcid: 121,
      cystine: 14,
      glutamicAcid: 79,
      glutamine: 0,
      glycine: 24,
      histidine: 10,
      isoleucine: 19,
      leucine: 24,
      lysine: 26,
      methionine: 12,
      phenylalanine: 21,
      proline: 17,
      serine: 35,
      threonine: 19,
      tryptophan: 5,
      tyrosine: 19,
      valine: 24,
    },
  },
  {
    enName: 'carrot',
    name: 'Cenoura',
    id: 17,
    image: '/images/food/carrot.svg',
    oneMeasure: {
      correspondingMeasure: 61,
      praticalUnitOfMeasurement: PraticalUnitOfMeasurement.unity,
    },
    unitOfMeasurement: UnitOfMeasurement.gram,
    aminoAcids: {
      tryptophan: 12,
      threonine: 191,
      isoleucine: 77,
      leucine: 102,
      lysine: 101,
      methionine: 20,
      cystine: 83,
      phenylalanine: 61,
      tyrosine: 43,
      valine: 69,
      histidine: 40,
      arginine: 91,
      alanine: 113,
      asparticAcid: 190,
      glutamicAcid: 366,
      glycine: 47,
      proline: 54,
      serine: 54,
      asparagine: 0,
      glutamine: 0,
    },
  },
];

fs.writeFileSync(
  path.resolve(__dirname, 'food.json'),
  JSON.stringify({ foods })
);
