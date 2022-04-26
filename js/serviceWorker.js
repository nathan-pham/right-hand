// Github Copilot wrote some naughty sites...
const defaultBlocks = [
    "nhentai.net",
    "pornhub.com",
    "xvideos.com",
    "xhamster.com",
    "youporn.com",
    "redtube.com",
    "tube8.com",
    "youjizz.com",
    "xnxx.com",
];

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed service worker");

    chrome.storage.sync.set({
        enabled: true,
        blocks: defaultBlocks,
    });
});
