const DEBUG = true;



export function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
};
