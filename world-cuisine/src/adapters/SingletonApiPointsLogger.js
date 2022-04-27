// https://www.sitepoint.com/javascript-design-patterns-singleton/
// https://stackoverflow.com/questions/44719103/singleton-object-in-react-native
// Singleton proof of concept
class SingletonApiPointsLogger {

    static instance = null;

    _points = [];

    static getInstance(){
        if (SingletonApiPointsLogger.instance == null){
            SingletonApiPointsLogger.instance = new SingletonApiPointsLogger();
        }
        return SingletonApiPointsLogger.instance;
    }

    add(points) {
        console.log(this);
        console.log(this.instance);
        console.log(SingletonApiPointsLogger.getInstance());
        console.log(SingletonApiPointsLogger.instance);
        console.log(`Spent ${points} points`);
        this._points.push(points);
        console.log(this._points);
    }

    display() {
        //https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
        console.log(this);
        console.log(this.instance);
        console.log(SingletonApiPointsLogger.getInstance());
        console.log(SingletonApiPointsLogger.instance);
        console.log(this._points);
        return Math.round(this._points.reduce((a, b) => a + b, 0) * 100) / 100;
    }

}

export default SingletonApiPointsLogger;