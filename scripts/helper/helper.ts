const DEBUG = true;



export function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
};

export function toDataURL(url: string): Promise<string | ArrayBuffer | null> {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
}