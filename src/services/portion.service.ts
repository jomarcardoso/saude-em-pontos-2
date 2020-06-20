import { Food, AminoAcids } from './food.service';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  aminoAcids: AminoAcids;
}

export interface PortionData {
  foodId: number;
  quantity: number;
}

function format({
  foods = [],
  portionData,
}: {
  portionData: PortionData;
  foods: Array<Food>;
}): Portion {
  const food = foods[portionData.foodId - 1];
  const calories = food.calories * portionData.quantity;
  const carbohydrates = food.carbohydrates * portionData.quantity;
  const aminoAcids: AminoAcids = {
    alanine: food.aminoAcids.alanine * portionData.quantity,
    valine: food.aminoAcids.valine * portionData.quantity,
    tyrosine: food.aminoAcids.tyrosine * portionData.quantity,
    tryptophan: food.aminoAcids.tryptophan * portionData.quantity,
    threonine: food.aminoAcids.threonine * portionData.quantity,
    serine: food.aminoAcids.serine * portionData.quantity,
    proline: food.aminoAcids.proline * portionData.quantity,
    phenylalanine: food.aminoAcids.phenylalanine * portionData.quantity,
    methionine: food.aminoAcids.methionine * portionData.quantity,
    lysine: food.aminoAcids.lysine * portionData.quantity,
    leucine: food.aminoAcids.leucine * portionData.quantity,
    isoleucine: food.aminoAcids.isoleucine * portionData.quantity,
    histidine: food.aminoAcids.histidine * portionData.quantity,
    glycine: food.aminoAcids.glycine * portionData.quantity,
    glutamine: food.aminoAcids.glutamine * portionData.quantity,
    glutamicAcid: food.aminoAcids.glutamicAcid * portionData.quantity,
    cystine: food.aminoAcids.cystine * portionData.quantity,
    asparticAcid: food.aminoAcids.asparticAcid * portionData.quantity,
    asparagine: food.aminoAcids.asparagine * portionData.quantity,
    arginine: food.aminoAcids.arginine * portionData.quantity,
  };

  return {
    food,
    quantity: portionData.quantity,
    calories,
    carbohydrates,
    aminoAcids,
  };
}

const unFormat = ({ food: { id: foodId }, quantity }) => ({
  foodId,
  quantity,
});

const PortionService = {
  format,
  unFormat,
};

export default PortionService;
