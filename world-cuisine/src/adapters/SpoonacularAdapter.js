//import instance from "./SingletonApiPointsLogger";
import SingletonApiPointsLogger from "./SingletonApiPointsLogger";

const spoonacularConfig = {
  apiKey: process.env.REACT_APP_SPOONACULAR_APIKEY,
  root: "https://api.spoonacular.com/",
};

//const localInstance = new SingletonApiPointsLogger();
const localInstance = SingletonApiPointsLogger.getInstance();

class SpoonacularAdapter {

  static cuisineSearch = async (cuisine) => {
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularConfig.apiKey}&cuisine=${cuisine}?`)
    .then(response => response.json()) // A second promise
    .then(data => { // Second promise resolved
      console.log(data);
      console.log(data.results.length);
      localInstance.add(1 + ((.01) * data.results.length));
      return(data);
    });
  }

  static recipeInformation = async (recipeID) => {
    return fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularConfig.apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      localInstance.add(1);
      return(data);
    })
  }

}
export default SpoonacularAdapter;
