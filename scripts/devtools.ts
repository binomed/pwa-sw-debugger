import { getBrowserObject } from "./helper/helper";

let browserObject = getBrowserObject();

/**
This script is run whenever the devtools are open.
In here, we can create our panel.
*/

function handleShown() {
    console.log("panel is being shown");
}

function handleHidden() {
    console.log("panel is being hidden");
}

/**
Create a panel, and add listeners for panel show/hide events.
*/
browserObject.devtools.panels.create(
    "SW Debug",
    "/assets/Logo-Sw-Debugger.png",
    "/panel/panel.html"
)
