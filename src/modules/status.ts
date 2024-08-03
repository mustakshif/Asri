import { hasDockb, isDockHidden, isDockLytExpanded, isDockLytPinned, isStatusHidden } from "../util/state";
import { asriDoms as doms, environment as env } from "../util/rsc";
import { debounce, querySelectorPromise } from "../util/misc";

export const debouncedStatusPosition = debounce(statusPosition);

/**
 * Calculate the position of status bar when there is a change of the display of docks and their layouts.
 */
async function statusPosition() {
    if (env.isMobile || env.isMiniWindow) return;
    
    if (!doms.status) await querySelectorPromise('#status');
    console.log(3, !await hasDockb())
    if (!await hasDockb()) {
        function setStatusTransform(x: number, y: number) {
            doms.status!.style.transform = `translate(${x}px, ${y}px)`;
        }

        let layoutCenter = (doms.layouts || await querySelectorPromise('#layouts'))!.querySelector('.layout__center');

        if (layoutCenter && doms.layoutDockR && !doms.status!.classList.contains('.fn__none')) {
            let layoutDockrWidth = doms.layoutDockR.clientWidth;
            let layoutCenterWidth = layoutCenter.clientWidth;
            let y = 0;

            doms.layoutDockB || await querySelectorPromise('.layout__dockb');

            if (doms.layoutDockB && !doms.layoutDockB.classList.contains('.fn__none') && isDockLytPinned('B')) {
                y = doms.layoutDockB.clientHeight * -1;
            } else { y = 0; }

            doms.status!.style.maxWidth = layoutCenterWidth - 12 + 'px';

            let isDockRightHidden = isDockHidden('R'),
                isLayoutDockRightHidden = !isDockLytPinned('R') && isDockLytExpanded('R');

            if (isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(0, y);
            else if (!isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(-40, y);
            else if (!isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform((layoutDockrWidth + 40) * -1, y);
            else if (isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform(layoutDockrWidth * -1, y);

            // doms.status = document.getElementById('status');
        }
    } else {
        doms.status?.style.removeProperty('max-width');
        doms.status?.style.removeProperty('transform');
    }

    // if (!hasDockb() && !isLayoutDockHidden('b')) {
    //     let layoutDockbHeight = asriDoms.layoutDockb?.clientHeight;
    //     asriDoms.status.style.transform = `translateY(-${layoutDockbHeight + 42}px)`;
    // }
}

export function setStatusHeightVar() {
    const statusHeight = isStatusHidden() ? 0 : 32;
    // fastdom.mutate(() => {
    document.body.style.setProperty('--status-height', `${statusHeight}px`)
    // })
}

export function removeStatusHeightVar() {
    document.body.style.removeProperty('--status-height');
}

// export function avoidOverlappingWithStatus() {
//     if (!isStatusHidden()) {

//         let layoutTabContainers = doms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
//         let statusRect = doms.status?.getBoundingClientRect();

//         layoutTabContainers?.forEach(layoutTabContainer => {
//             let fileTree = layoutTabContainer.querySelector('.file-tree');
//             if (fileTree && !fileTree.classList.contains('fn__none')) {
//                 let containerRect = layoutTabContainer.getBoundingClientRect();
//                 if (isOverlapping(containerRect, statusRect)) {
//                     layoutTabContainer.style.paddingBottom = '35px'
//                 } else {
//                     layoutTabContainer.style.removeProperty('padding-bottom');
//                 }
//             } else {
//                 layoutTabContainer.style.removeProperty('padding-bottom');
//             }
//         })

//         let searchList = document.getElementById('searchList');
//         let searchPreview = document.getElementById('searchPreview');
//         if (searchList || searchPreview) {
//             let searchListRect = searchList.getBoundingClientRect();
//             let searchPreviewRect = searchPreview.getBoundingClientRect();

//             if (isOverlapping(searchListRect, statusRect)) {
//                 searchList.style.paddingBottom = '35px'
//             } else {
//                 searchList.style.removeProperty('padding-bottom')
//             }

//             if (isOverlapping(searchPreviewRect, statusRect)) {
//                 searchPreview.style.paddingBottom = '35px'
//             } else {
//                 searchPreview.style.removeProperty('padding-bottom')
//             }
//         }

//         // pdfviewer
//         let viewerContainer = document.getElementById('viewerContainer');

//         if (viewerContainer) {
//             let viewerContainerRect = viewerContainer.getBoundingClientRect();

//             if (isOverlapping(viewerContainerRect, statusRect)) {
//                 viewerContainer.style.paddingBottom = '35px';
//             } else {
//                 viewerContainer.style.removeProperty('padding-bottom')
//             }
//         }

//         // flashcard in tabbar
//         asriDoms.layouts?.querySelectorAll('.card__main').forEach(card => {
//             if (card) {
//                 let cardRect = card.getBoundingClientRect();

//                 if (isOverlapping(cardRect, statusRect)) {
//                     card.style.paddingBottom = '35px';
//                 } else {
//                     card.style.removeProperty('padding-bottom')
//                 }
//             }
//         });
//     }
// }