class Rating extends Object {
    timestamp;
    user_id;
    recipe_id;
    value;

    constructor(user_id, recipe_id, value){
        super();
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.value = value;
    }
}
export default Rating;