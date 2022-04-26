import Sortable from "/node_modules/sortablejs/modular/sortable.esm.js";

import { $, $$ } from "/js/libs/query.js";
import jsh from "/js/libs/jsh.js";

import { get, sync } from "/js/libs/storage.js";

import { defaultBlocks } from "./config.js";

import ListItem from "./components/ListItem.js";

const syncBlocks = (newBlocks) => {
    newBlocks = newBlocks || $$(".link-list__item").map((el) => el.textContent);
    sync("blocks", newBlocks);
    syncRules(blocks, newBlocks);
};

const syncRules = (prevBlocks, newBlocks) => {
    const addRules = newBlocks.map((block, id) => ({
        id: id + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
            urlFilter: block.startsWith("http") ? block : `https://${block}`,
            resourceTypes: ["main_frame"],
        },
    }));

    if (chrome.declarativeNetRequest) {
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules,
            removeRuleIds: prevBlocks.map((_, id) => id + 1),
        });
    }
};

let blocks = await get("blocks", []);
let enabled = await get("enabled", true);
let initSync = false;

if (blocks.length == 0) {
    blocks = defaultBlocks;
    initSync = true;

    syncBlocks(blocks);
}

if (enabled && !initSync) {
    initSync = true;
    syncBlocks(blocks);
}

// create app ui
$("#app").append(
    jsh.h1({ style: "margin: 2rem 0 0 0" }, "💪 Power Work"),
    jsh.p(
        { style: "margin: 0.75rem 0 0 0" },
        "Stay focused with the power of not watching hentai!"
    ),
    jsh.button(
        { style: "margin: 1rem 0 0 0", type: "submit" },
        enabled ? "Disable" : "Enable"
    ),
    jsh.input({
        placeholder: "add a new site",
        type: "text",
        style: "margin: 2rem 0 0 0",
    }),
    jsh.ul(
        {
            class: "link-list",
        },
        blocks.map((title) =>
            ListItem({
                title,
                onTrash: (e) => {
                    e.target.parentNode.remove();
                    syncBlocks();
                },
            })
        )
    ),
    jsh.footer({}, "Nathan Pham")
);

// add event listeners
new Sortable($(".link-list"), {
    handle: ".link-list__item__handle",
    animation: 150,
    onEnd: () => {
        syncBlocks();
    },
});

$("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const title = e.target.value;

        if (title) {
            e.target.value = "";
            $(".link-list").prepend(ListItem({ title }));
            syncBlocks();
        }
    }
});

$("button").addEventListener("click", (e) => {
    enabled = !enabled;
    e.target.textContent = enabled ? "Disable" : "Enable";
    syncRules(blocks, enabled ? blocks : []);
    sync("enabled", enabled);
});
