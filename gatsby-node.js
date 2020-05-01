const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const foodPage = path.resolve(`src/pages/food.tsx`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query {
        file(relativePath: { eq: "food.json" }) {
          childDbJson {
            foods {
              name
              id
              image
              enName
              glicemicIndex
              calories
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog post pages.
    result.data.file.childDbJson.foods.forEach((edge) => {
      createPage({
        // Path for this page — required
        path: `food/${edge.enName}`,
        component: foodPage,
        context: edge,
      });
    });
  });
};
