interface Portion {
  food: string;
  quantity: number;
}

export interface Meal {
  date: Date;
  portions: Array<Portion>;
}
