// utils/Zeusstand.js

const Zeusstand = (() => {
    let subscribers = []; // components listening for changes
    let state = null;     // current value

    // subscribe: component registers a callback
    const subscribe = (callback) => {
        subscribers.push(callback);
        // return unsubscribe function
        return () => {
            subscribers = subscribers.filter((cb) => cb !== callback);
        };
    };

    // send: any component can send an item
    const send = (item) => {
        state = item;
        subscribers.forEach((cb) => cb(state)); // notify all subscribers
    };

    // getState: get current value
    const getState = () => state;

    return { subscribe, send, getState };
})();

export default Zeusstand;
