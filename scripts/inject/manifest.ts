import { sendMessage } from "webext-bridge/content-script";
import { logDebug, toDataURL } from "../helper/helper";
import { ID_PANEL, KEY_MANIFEST_DATA } from "../models/consts";


export function getManifest() {


    const links = document.getElementsByTagName('link');

    let path = undefined;
    for (let idx = 0; idx < links.length; idx++) {
        const link = links.item(idx);

        if (link.rel === 'manifest') {
            path = link.href;
            break;
        }
    }

    if (path) {
        fetch(path)
            .then((response) => response.json())
            .then(async (manifest) => {

                // We have to deal with icons ... to transform them into base64 strings
                const icons = manifest.icons;
                if (icons) {
                    const iconsBase64 = icons.map((icon) => toDataURL(icon.src));
                    const resolveBase64 = await Promise.all(iconsBase64);
                    manifest.icons = icons.map((icon, index) => {
                        if (icon.src) {
                            const base64 = resolveBase64[index];
                            logDebug(`Converted icon ${icon.src} to base64`);
                            return {
                                ...icon,
                                base64,
                            };
                        }
                        return icon;
                    });
                }
                logDebug(`Manifest data`, manifest);

                sendMessage(ID_PANEL,
                    {
                        type: KEY_MANIFEST_DATA,
                        mainfestData: {
                            path,
                            hasManifest: true,
                            manifest: (manifest as any),
                        }
                    }, 'devtools');
            });
    } else {
        sendMessage(ID_PANEL,
            {
                type: KEY_MANIFEST_DATA,
                hasManifest: false,
                manifest: {},
            }, 'devtools');
    }




}
