import { Food, AminoAcids, Measure } from '../food';
import { Portion, PortionData, UnFormat } from './portion.types';

function getQuantityByMeasure(measure: Measure, food: Food): number {
  const measureByMeasurer: Measure = food.oneMeasures.find(
    (oneMeasure) => oneMeasure.type === measure.type,
  );

  return measure.quantity * measureByMeasurer.quantity;
}

function format({
  foods = [],
  portionData,
}: {
  portionData: PortionData;
  foods: Array<Food>;
}): Portion {
  const food = foods[portionData.foodId - 1];
  const quantity = getQuantityByMeasure(portionData.measure, food);
  const calories = food.calories * quantity;
  const carbohydrates = food.carbohydrates * quantity;
  const aminoAcids: AminoAcids = {
    alanine: food.aminoAcids.alanine * quantity,
    valine: food.aminoAcids.valine * quantity,
    tyrosine: food.aminoAcids.tyrosine * quantity,
    tryptophan: food.aminoAcids.tryptophan * quantity,
    threonine: food.aminoAcids.threonine * quantity,
    serine: food.aminoAcids.serine * quantity,
    proline: food.aminoAcids.proline * quantity,
    phenylalanine: food.aminoAcids.phenylalanine * quantity,
    methionine: food.aminoAcids.methionine * quantity,
    lysine: food.aminoAcids.lysine * quantity,
    leucine: food.aminoAcids.leucine * quantity,
    isoleucine: food.aminoAcids.isoleucine * quantity,
    histidine: food.aminoAcids.histidine * quantity,
    glycine: food.aminoAcids.glycine * quantity,
    glutamine: food.aminoAcids.glutamine * quantity,
    glutamicAcid: food.aminoAcids.glutamicAcid * quantity,
    cystine: food.aminoAcids.cystine * quantity,
    asparticAcid: food.aminoAcids.asparticAcid * quantity,
    arginine: food.aminoAcids.arginine * quantity,
  };

  return {
    food,
    quantity,
    calories,
    carbohydrates,
    aminoAcids,
    measure: portionData.measure,
  };
}

const unFormat: UnFormat = ({ food: { id: foodId }, measure }) => ({
  foodId,
  measure,
});

const PortionService = {
  format,
  unFormat,
};

export default PortionService;
