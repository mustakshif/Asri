import { root, checkVersion, addURLParam, loadScript } from './src/util/rsc.js';

export async function main() {
    let version = await checkVersion();
    loadScript(addURLParam(root + 'util/module/fastdom.min.js', { v: version }), '', 'asriFastdom');
    loadScript(addURLParam(root + 'script/theme.js', { v: version }), 'module', 'asriMainjs');
}