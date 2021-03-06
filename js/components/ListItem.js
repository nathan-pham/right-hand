import jsh from "/js/libs/jsh.js";

import HandleIcon from "./icons/HandleIcon.js";
import TrashIcon from "./icons/TrashIcon.js";

const ListItem = ({ title, onTrash, ...props } = {}) => {
    return jsh.li(
        {
            ...props,
            class: "link-list__item",
            style: "margin: 0.75rem 0 0 0",
        },
        jsh.div(
            {},
            HandleIcon({
                class: "link-list__item__handle",
            }),
            jsh.span({ class: "link-list__item__text" }, title)
        ),
        jsh.div(
            {
                onClick: onTrash,
                class: "link-list__item__trash",
            },
            TrashIcon({
                style: "pointer-events: none",
            })
        )
    );
};

export default ListItem;
