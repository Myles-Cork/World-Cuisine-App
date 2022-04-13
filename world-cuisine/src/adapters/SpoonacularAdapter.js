const spoonacularConfig = {
  apiKey: process.env.REACT_APP_SPOONACULAR_APIKEY,
  root: "https://api.spoonacular.com/",
};

class SpoonacularAdapter {

  static cuisineSearch = async (cuisine) => {
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularConfig.apiKey}&cuisine=${cuisine}?`)
    .then(response => response.json()) // A second promise
    .then(data => { // Second promise resolved
      console.log(data);
      return(data);
    });
  }

}
export default SpoonacularAdapter;
