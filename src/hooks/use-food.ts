import { useStaticQuery, graphql } from 'gatsby';
import { Food } from '../services/food.service';

const useFoods = (): Array<Food> => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "food.json" }) {
        childDbJson {
          foods {
            name
            enName
            id
            image
            calories
            gi
            gl
            carbohydrates
            aminoAcids {
              methionine
              leucine
              isoleucine
              lysine
              phenylalanine
              threonine
              tryptophan
              valine
              arginine
              histidine
              proline
              glycine
              asparagine
              glutamine
              cystine
              alanine
              asparticAcid
              glutamicAcid
              serine
              tyrosine
            }
          }
        }
      }
    }
  `);

  return data.file.childDbJson.foods;
};

export default useFoods;
