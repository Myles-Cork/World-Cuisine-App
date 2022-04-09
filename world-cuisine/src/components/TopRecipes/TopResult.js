import React from 'react';
import "./top.css"

class TopResult extends React.Component{
  render(){
    return(
      <div className="topResult">
        <span>{this.props.name}</span>
      </div>
    );
  }
}

export default TopResult
