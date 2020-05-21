import { useStaticQuery, graphql } from 'gatsby';
import { Food } from '../services/food.service';

const get = (): Array<Food> => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "food.json" }) {
        childDbJson {
          foods {
            name
            id
            image
            calories
            gi
          }
        }
      }
    }
  `);

  return data.file.childDbJson.foods;
};

const useFoods = () => {
  const foods = get();

  return foods;
};

export default useFoods;
