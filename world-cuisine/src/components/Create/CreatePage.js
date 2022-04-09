import React from "react";
import "./create.css";
import CreateForm from "./CreateForm";

class SearchPage extends React.Component {

  render(){

    return (
        <div>
          <h1>Create a Recipe</h1>
          <CreateForm/>
        </div>
      );
  }
}
export default SearchPage;
