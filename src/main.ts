import { debounce, modeTransition } from "./util/misc";
import { unloadAsriJSModules, loadAsriJSModules } from "./modules";
import fastdom from "fastdom";

setTimeout(async () => {
    loadAsriJSModules();
    
    // function test () {
    //     fastdom.mutate(() => {
    //         console.log('mutate')
    //     })
    // }

    // let detest = debounce(test, 200);

    // for(let i = 0; i < 100; i++) {
    //     detest();
    // }

    // let sendRpcMsg = (msg:string) => console.log(new Date().toLocaleTimeString() + ' ==> ' + msg);

    // let deSendRpcMsg = debounce(sendRpcMsg, 200);

    // deSendRpcMsg(1);
    // deSendRpcMsg(2);
    // // setTimeout(() => {
    // //     deSendRpcMsg(500)
    // // }, 500)
    // // setTimeout(() => {
    // //     deSendRpcMsg(1000)
    // // }, 1000)
    // // setTimeout(() => {
    // //     deSendRpcMsg(1500)
    // // }, 1500)

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);