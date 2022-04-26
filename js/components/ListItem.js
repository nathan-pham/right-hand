import jsh from "jsh";

import HandleIcon from "./icons/HandleIcon.js";
import TrashIcon from "./icons/TrashIcon.js";

const ListItem = ({ title, ...props } = {}) => {
    return jsh.li(
        {
            ...props,
            class: "link-list__item",
        },
        HandleIcon(),
        jsh.span({}, title),
        TrashIcon()
    );
};

export default ListItem;
