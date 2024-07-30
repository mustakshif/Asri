import fastdom from "fastdom";
import { isStatusHidden } from "../util/state";

export function setStatusHeightVar() {
    const statusHeight = isStatusHidden() ? 0 : 32;
    fastdom.mutate(() => {
        document.body.style.setProperty('--status-height', `${statusHeight}px`)
    })
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