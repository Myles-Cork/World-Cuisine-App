import React from 'react';
import TopResult from './TopResult.js';
import "./top.css"

class TopList extends React.Component{
  render(){
    return(
      <div className="topList">
          {this.props.topresults.map(result => <TopResult key={result.number} name={result.name}/>)}
      </div>
    );
  }
}

export default TopList
