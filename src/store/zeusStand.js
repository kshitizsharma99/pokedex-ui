

const Zeusstand = (() => {
    let subscribers = [];
    let state = null;

    const subscribe = (callback) => {
        subscribers.push(callback);

        return () => {
            subscribers = subscribers.filter((cb) => cb !== callback);
        };
    };

    const send = (item) => {
        state = item;
        subscribers.forEach((cb) => cb(state));
    };

    const getState = () => state;

    return { subscribe, send, getState };
})();

export default Zeusstand;
