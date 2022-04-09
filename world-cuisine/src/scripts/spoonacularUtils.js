// const spoonacularConfig = {
//   apiKey: process.env.SPOONACULAR_APIKEY,
//   root: "https://api.spoonacular.com/",

// };

// const cuisine_options = [
// "African", "American", "British", "Cajun", "Caribbean", "Chinese", 
// "Eastern European", "European", "French", "German", "Greek", "Indian", 
// "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", 
// "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", 
// "Spanish", "Thai", "Vietnamese"]

// // https://reactjs.org/docs/faq-ajax.html
// const queryCuisine = async () => {
//     // queryString = root + "/recipes/search/" 
//     try {
//       const response = fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=94ce307ee3284d85a81ff5401ca4c74c&cuisine=Mexican?")
//       const data = await response.json; // .json() returns another Promise
//       return(data); // resolve the second promise
//     } catch (err) {
//       console.error(err);
//       alert("Search failed");
//     }
//   };

// export {
//     queryCuisine
// };

// // /**
// //  * Analyze a Recipe Search Query
// //  * Parse a recipe search query to find out its intention.
// //  * @param {String} q The recipe search query.
// //  * @param {module:com.spoonacular.client/com.spoonacular/RecipesApi~analyzeARecipeSearchQueryCallback} callback The callback function, accepting three arguments: error, data, response
// //  * data is of type: {@link module:com.spoonacular.client/com.spoonacular.client.model/InlineResponse20018}
// //  */
// //     analyzeARecipeSearchQuery(q, callback) {
// //     let postBody = null;
// //     // verify the required parameter 'q' is set
// //     if (q === undefined || q === null) {
// //         throw new Error("Missing the required parameter 'q' when calling analyzeARecipeSearchQuery");
// //     }

// //     let pathParams = {
// //     };
// //     let queryParams = {
// //         'q': q
// //     };
// //     let headerParams = {
// //     };
// //     let formParams = {
// //     };

// //     let authNames = ['apiKeyScheme'];
// //     let contentTypes = [];
// //     let accepts = ['application/json'];
// //     let returnType = InlineResponse20018;
// //     return this.apiClient.callApi(
// //         '/recipes/queries/analyze', 'GET',
// //         pathParams, queryParams, headerParams, formParams, postBody,
// //         authNames, contentTypes, accepts, returnType, null, callback
// //     );
// // }
