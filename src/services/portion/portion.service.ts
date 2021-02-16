import isNaN from 'lodash/isNaN';
import { Food, AminoAcids, Measure, Measurer } from '../food';
import { Portion, SHAPE_PORTION, UnFormat } from './portion.types';

function getQuantityByMeasure(measure: Measure, food: Food): number {
  const measureByMeasurer: Measure = food.oneMeasures.find(
    (oneMeasure) => oneMeasure.type === measure.type,
  );

  return measure.quantity * measureByMeasurer.quantity;
}

function measureFromString(text = ''): Measure {
  const lowText = text.toLowerCase();
  let type: Measurer = 'UNITY';

  if (
    lowText.includes('xícara') ||
    lowText.includes('xicara') ||
    lowText.includes('copo')
  ) {
    type = 'CUP';
  }

  if (lowText.includes('colher') || lowText.includes('colheres')) {
    type = 'TABLE_SPOON';
  }

  if (
    lowText.includes('colher de chá') ||
    lowText.includes('colheres de chá') ||
    lowText.includes('colher de cha') ||
    lowText.includes('colheres de cha') ||
    lowText.includes('colher pequena') ||
    lowText.includes('colheres pequenas')
  ) {
    type = 'TEA_SPOON';
  }

  if (/(\dg|\d\sgrama)/.test(lowText)) type = 'LITERAL';

  // let partialQuantity = 'full';

  // if (text.includes('meio') || text.includes('meia')) partialQuantity = 'half';

  const valueSplit = lowText.split(' ');
  const quantityString =
    valueSplit.find((statement) => /^\d{1,}/.test(statement)) || '';

  let quantity = Number(quantityString.replace(/\D/, ''));

  if (valueSplit.find((statement) => statement === 'duas')) quantity = 2;

  if (isNaN(quantity) || !quantity) quantity = 1;

  return {
    quantity,
    type,
  };
}

const unFormat: UnFormat = ({ description }) => description;

interface PortionFromStringArgs {
  foods: Array<Food>;
  text: string;
}

function portionFromString({ text, foods }: PortionFromStringArgs): Portion {
  let foodIndex = -1;

  const food = foods.find((foodItem) => {
    const lowerFood = foodItem.name.toLowerCase();
    const lowerValue = text.toLowerCase();

    foodIndex = lowerValue.indexOf(lowerFood);

    if (foodIndex !== -1) return true;

    return foodItem.keys.find((key) => {
      foodIndex = text.indexOf(key);

      return foodIndex !== -1;
    });
  });

  const measure = measureFromString(text.substring(0, foodIndex));

  if (!food) return SHAPE_PORTION;

  // const food = foods[portionData.foodId - 1];
  const quantity = getQuantityByMeasure(measure, food);
  const calories = (food.calories * quantity) / 100;
  const carbohydrates = (food.carbohydrates * quantity) / 100;
  const aminoAcids: AminoAcids = {
    alanine: (food.aminoAcids.alanine * quantity) / 100,
    valine: (food.aminoAcids.valine * quantity) / 100,
    tyrosine: (food.aminoAcids.tyrosine * quantity) / 100,
    tryptophan: (food.aminoAcids.tryptophan * quantity) / 100,
    threonine: (food.aminoAcids.threonine * quantity) / 100,
    serine: (food.aminoAcids.serine * quantity) / 100,
    proline: (food.aminoAcids.proline * quantity) / 100,
    phenylalanine: (food.aminoAcids.phenylalanine * quantity) / 100,
    methionine: (food.aminoAcids.methionine * quantity) / 100,
    lysine: (food.aminoAcids.lysine * quantity) / 100,
    leucine: (food.aminoAcids.leucine * quantity) / 100,
    isoleucine: (food.aminoAcids.isoleucine * quantity) / 100,
    histidine: (food.aminoAcids.histidine * quantity) / 100,
    glycine: (food.aminoAcids.glycine * quantity) / 100,
    glutamine: (food.aminoAcids.glutamine * quantity) / 100,
    glutamicAcid: (food.aminoAcids.glutamicAcid * quantity) / 100,
    cystine: (food.aminoAcids.cystine * quantity) / 100,
    asparticAcid: (food.aminoAcids.asparticAcid * quantity) / 100,
    arginine: (food.aminoAcids.arginine * quantity) / 100,
  };

  return {
    food,
    quantity,
    calories,
    carbohydrates,
    aminoAcids,
    measure,
    description: text,
  };
}

const PortionService = {
  unFormat,
  portionFromString,
  measureFromString,
};

export default PortionService;
