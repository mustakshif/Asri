import { asriDoms as doms, environment as env } from "../util/rsc";

let pluginsDivider: AsriDomsExtended, leftSpacing: AsriDomsExtended, rightSpacing: AsriDomsExtended;

function createTopbarElements() {
    if (!env.isMobile) {
        pluginsDivider = createTopbarElementById('AsriPluginsIconsDivider', undefined, doms.drag);

        leftSpacing = (env.isMacOS && !env.isInBrowser)
            ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, doms.barSync)
            : createTopbarElementById('AsriTopbarLeftSpacing', undefined, doms.barForward);

        rightSpacing = (env.isMacOS || env.isInBrowser)
            ? createTopbarElementById('AsriTopbarRightSpacing')
            : createTopbarElementById('AsriTopbarRightSpacing', doms.barSearch);
    }
}

function createTopbarElementById(newId: string, before: AsriDomsExtended = undefined, after: AsriDomsExtended = undefined) {
    if (document.getElementById(newId)) return;
    if (!doms.toolbar) return;

    let newDiv = document.createElement('div');
    newDiv.id = newId;
    if (before) {
        doms.toolbar.insertBefore(newDiv, before);
    } else if (after) {
        doms.toolbar.insertBefore(newDiv, after.nextSibling);
    } else {
        doms.toolbar.appendChild(newDiv);
    }

    return newDiv;
}

function removeTopbarElements() {
    if (pluginsDivider) {
        pluginsDivider.remove();
        pluginsDivider = undefined;
    }
    if (leftSpacing) {
        leftSpacing.remove();
        leftSpacing = undefined;
    }
    if (rightSpacing) {
        rightSpacing.remove();
        rightSpacing = undefined;
    }
}