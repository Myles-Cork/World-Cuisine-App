import React from 'react';
import "./create.css"

class CreateForm extends React.Component{
  render(){
    const cuisines = [
      "food",
      "other"
    ];

    return(
      <form className="createForm">
        <ul>
          <li>
            <label htmlFor="cuisineSelect">Cuisine: </label>
            <select name="cuisineSelect" defaultValue={cuisines[0]}>
              {cuisines.map(name => <option key={cuisines.indexOf(name)} value={name}>{name}</option>)}
            </select>
          </li>
          <li>
            <label htmlFor="Name">Name: </label>
            <input type="text" name="Name"/>
          </li>
        </ul>
        
        
        <button type="submit" name="Create">Create</button>
      </form>
    );
  }
}

export default CreateForm
