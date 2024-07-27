import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "../util/rsc";
import { isOverlapping } from "../util/misc";
import { updateWndEls, wndElements } from "../util/state";

// added toolbar elements
let pluginsDivider: AsriDomsExtended, leftSpacing: AsriDomsExtended, rightSpacing: AsriDomsExtended;

let topbarRect: DOMRect, dragRect: DOMRect, layoutsCenterRect: DOMRect, leftSpacingRect: DOMRect, rightSpacingRect: DOMRect, barForwardRect: DOMRect, barSyncRect: DOMRect;
let dragRectInitialLeft: number, dragRectInitialRight: number;

export function calcTopbarSpacings() {

}

export function calcTabbarSpacings(wndElements: NodeListOf<Element> | undefined) {
    if (env.isMiniWindow || env.isMobile) return;
    fastdom.measure(() => {
        topbarRect = doms.toolbar?.getBoundingClientRect() as DOMRect;
        dragRect = doms.drag?.getBoundingClientRect() as DOMRect;
        layoutsCenterRect = doms.layoutCenter?.getBoundingClientRect() as DOMRect;
    })
    wndElements?.forEach(wnd => {
        let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child') as HTMLElement;
        let tabbarContainerRect: DOMRect;

        fastdom.measure(() => {
            tabbarContainerRect = tabbarContainer?.getBoundingClientRect() as DOMRect;

            let paddingLeftValue = (tabbarContainerRect.left < dragRect.left) ? dragRect.left - tabbarContainerRect.left - 4 : 0;
            let paddingRightValue = (tabbarContainerRect.right > dragRect.right) ? tabbarContainerRect.right - dragRect.right + 8 : 0;

            fastdom.mutate(async () => {
                if (await isOverlapping(tabbarContainer, doms.drag) || await isOverlapping(tabbarContainer, doms.toolbar)) {
                    tabbarContainer.style.paddingLeft = paddingLeftValue + 'px';
                    tabbarContainer.style.paddingRight = paddingRightValue + 'px';

                    // asriDoms.drag = document.getElementById('drag');

                    // add top padding in extremely narrow width
                    if ((tabbarContainerRect.right - paddingRightValue - 240 < dragRect.left && tabbarContainerRect.left < dragRect.left) || (tabbarContainerRect.left + paddingLeftValue + 240 > dragRect.right && tabbarContainerRect.right > dragRect.right)) {
                        tabbarContainer.style.paddingTop = '42px';
                        tabbarContainer.style.paddingLeft = '0';
                        tabbarContainer.style.paddingRight = '0';
                    } else {
                        tabbarContainer.style.removeProperty('padding-top');
                    }
                } else {
                    tabbarContainer.style.removeProperty('padding-left');
                    tabbarContainer.style.removeProperty('padding-right');
                }
            })
        })
    })
}


export async function loadTopbarFusion() {
    createTopbarElements();
}

export function unloadTopbarFusion() {
    removeTopbarElements();
    wndElements?.forEach(wnd => {
        let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child') as HTMLElement;

        tabbarContainer.style.removeProperty('padding-top');
        tabbarContainer.style.removeProperty('padding-left');
        tabbarContainer.style.removeProperty('padding-right');
    })
}

function createTopbarElements() {
    if (env.isMobile) return;

    pluginsDivider = createTopbarElementById('AsriPluginsIconsDivider', undefined, doms.drag);

    leftSpacing = (env.isMacOS && !env.isInBrowser)
        ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, doms.barSync)
        : createTopbarElementById('AsriTopbarLeftSpacing', undefined, doms.barForward);

    rightSpacing = (env.isMacOS || env.isInBrowser)
        ? createTopbarElementById('AsriTopbarRightSpacing')
        : createTopbarElementById('AsriTopbarRightSpacing', doms.barSearch);

    // add svg to toolbar elements to fix barMore menu issue
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    rightSpacing?.appendChild(svg.cloneNode(true));
    pluginsDivider?.appendChild(svg.cloneNode(true));
    leftSpacing?.appendChild(svg.cloneNode(true));
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