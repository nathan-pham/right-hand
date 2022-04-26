// get storage methods
export const get = (key, defaultValue) => {
    return new Promise((resolve, _) => {
        if (chrome.storage) {
            chrome.storage.sync.get([key], (data) => {
                resolve(data[key]);
            });
        } else {
            console.log("not in extension, using default");
            resolve(defaultValue);
        }
    });
};

// sync methods
export const sync = (key, value) => {
    if (chrome.storage) {
        chrome.storage.sync.set({
            [key]: value,
        });
    }
};
