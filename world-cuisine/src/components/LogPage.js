import React from "react";
import SingletonApiPointsLogger from "../adapters/SingletonApiPointsLogger";
import "./LogPage.css";


class LogPage extends React.Component {

    render(){
            const localInstance = SingletonApiPointsLogger.getInstance();
            //const localInstance = new SingletonApiPointsLogger();
        return (
            <div className="log_view">
            <div className="points_view">
                <div>
                Number of Spoonacular points spent: {localInstance.display()}
                </div>
            </div>
            </div>
        );
    }
}
export default LogPage;
