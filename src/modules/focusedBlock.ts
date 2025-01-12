
export function selectionChangeCallback(e: Event) {

    // fix https://github.com/mustakshif/Asri/issues/133
    // 创建一个 Promise，等待 mouseup 事件
    const mouseUpPromise = new Promise<void>(resolve => {
        const mouseUpHandlerForSelectedBlock = () => {
            document.removeEventListener('mouseup', mouseUpHandlerForSelectedBlock, true);
            resolve();
        };
        document.addEventListener('mouseup', mouseUpHandlerForSelectedBlock, true);
    });

    // 创建一个 Promise，等待 0.3 秒
    const timeoutPromise = new Promise<void>(resolve => {
        setTimeout(resolve, 300);
    });

    // 创建一个 Promise，等待 keyup 事件
    const keyUpPromise = new Promise<void>(resolve => {
        const keyUpHandlerForSelectedBlock = () => {
            document.removeEventListener('keyup', keyUpHandlerForSelectedBlock, true);
            resolve();
        };
        document.addEventListener('keyup', keyUpHandlerForSelectedBlock, true);
    });

    // 使用 Promise.race 等待 mouseup 事件、keyup 事件或 0.3 秒
    Promise.race([mouseUpPromise, keyUpPromise, timeoutPromise]).then(() => {
        const selection = window.getSelection();
        const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        if (!range) return;

        const curNode = range.commonAncestorContainer;
        const curParent = curNode.parentElement;
        const curBlock = curParent ? curParent.closest('[data-node-id]') : null;
        if (!curBlock) return;

        const curBlockType = curBlock.getAttribute('data-type');

        removeFocusedBlockClass();
        if (!curBlockType
            || ['NodeAttributeView','NodeCodeBlock','NodeList'].includes(curBlockType)
        ) return;

        curBlock.classList.add('asri-selected-block');
        // console.log(selection, range, curNode, curBlock, curBlockType);
    });
}

export function removeFocusedBlockClass() {
    document.querySelectorAll('.asri-selected-block').forEach(block => block.classList.remove('asri-selected-block'));
}



// export function handleFocusedBlockChange() {
//     const selection = window.getSelection();
//     const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
//     if (!range) return;

//     const curNode = range.commonAncestorContainer;
//     const curParent = curNode.parentElement;
//     const curBlock = curParent ? curNode.parentElement.closest('[data-node-id]') : null;
//     if (!curBlock) return;

//     curParent && curParent.dir && curParent.dir === 'auto';
//     const curBlockType = curBlock.getAttribute('data-type');

//     document.querySelectorAll('.asri-selected-block').forEach(block => block.classList.remove('asri-selected-block'));
//     if (curBlockType === 'NodeAttributeView' || !curBlockType || curBlockType === 'NodeCodeBlock') return;

//     curBlock.classList.add('asri-selected-block');
// }
