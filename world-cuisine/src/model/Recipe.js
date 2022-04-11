class Recipe extends Object {
    id;
    title;
    image;

    constructor(id, title, image){
        super();
        this.id = id;
        this.title = title;
        this.image = image;
    }

    static arrayFromApiResults(results){
        let recipes = []
        for(let r of results){
            let temp = new Recipe(r['id'], r['title'], r['image']);
            console.log(temp);
            recipes.push(temp);
        }
        console.log(recipes);
        return recipes;
    }

    static searchFirebase(cuisine){

    }

    setImage(imageLink){
        this.image = imageLink;
    }

    setText(text){
        this.text = text;
    }

}
export default Recipe;