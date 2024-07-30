if (typeof window != "undefined") {
    window.browserObject = window.browser !== undefined ? browser : chrome;
} else {
    browserObject = chrome;
}

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
    "Test Panel",
    "/assets/Logo-Sw-Debugger.png",
    "/panel/panel.html"
)
/*.then((newPanel) => {
    newPanel.onShown.addListener(handleShown);
    newPanel.onHidden.addListener(handleHidden);
}); */