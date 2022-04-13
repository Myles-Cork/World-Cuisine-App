import React from "react";
import "./top.css";
import TopList from "./TopList";

class TopPage extends React.Component {

  render(){
    const results = [
    {number: 0, name: "pizza"},
    {number: 1, name: "pasta"},
    {number: 2, name: "soup"},
    {number: 3, name: "sandwich"},
    {number: 4, name: "sandwich"},
    {number: 5, name: "sandwich"},
    {number: 6, name: "sandwich"},
    {number: 7, name: "sandwich"},
    {number: 8, name: "sandwich"},
    {number: 9, name: "sandwich"}
    ];

    return (
        <div>
          <h1>The Top Recipes</h1>
          <TopList topresults={results}/>
        </div>
      );
  }
}
export default TopPage;
