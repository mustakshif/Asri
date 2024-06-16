!function(){const u={layouts:document.getElementById("layouts"),status:document.getElementById("status"),dockl:document.getElementById("dockLeft"),dockr:document.getElementById("dockRight"),dockb:document.getElementById("dockBottom"),layoutDockl:document.querySelector(".layout__dockl"),layoutDockr:document.querySelector(".layout__dockr"),layoutDockb:document.querySelector(".layout__dockb"),toolbar:document.getElementById("toolbar"),barSync:document.getElementById("barSync"),barForward:document.getElementById("barForward"),toolbarVIP:document.getElementById("toolbarVIP"),drag:document.getElementById("drag"),barPlugins:document.getElementById("barPlugins"),barSearch:document.getElementById("barSearch"),barMode:document.getElementById("barMode")},t=navigator.userAgent,s=-1<navigator.platform.indexOf("Mac"),c=-1<navigator.platform.indexOf("Linux");var e=/Android/.test(t),n=e&&!/(?:Mobile)/.test(t);const r=!!document.getElementById("sidebar")&&!n,d=!t.startsWith("SiYuan")||-1<t.indexOf("iPad")||n,a=document.body.classList.contains("body--window"),o=(/iOS/i.test(t)||/iPad/i.test(t))&&/AppleWebKit/i.test(t)&&t.startsWith("SiYuan/"),l=window.siyuan.config.lang,i=CSS.supports("color","oklch(from red calc(l * 0.5) 0 h)"),m=[],b=[],p=[],f=(s&&(document.body.classList.add("body-asri--mac"),m.push(".body-asri--mac")),c&&(document.body.classList.add("body-asri--linux"),m.push(".body-asri--linux")),r&&(document.body.classList.add("body-asri--mobile"),m.push(".body-asri--mobile")),d&&(document.body.classList.add("body-asri--browser"),m.push(".body-asri--browser")),e&&(document.body.classList.add("body-asri--android"),m.push(".body-asri--android")),o&&(document.body.classList.add("body-asri--iosApp"),m.push(".body-asri--iosApp")),!r&&u.toolbar&&(T("AsriPluginsIconsDivider",void 0,u.drag),s&&!d?T("AsriTopbarLeftSpacing",void 0,u.barSync):T("AsriTopbarLeftSpacing",void 0,u.barForward),s||d?T("AsriTopbarRightSpacing"):T("AsriTopbarRightSpacing",u.barSearch)),document.getElementById("AsriPluginsIconsDivider")),O=document.getElementById("AsriTopbarLeftSpacing"),N=document.getElementById("AsriTopbarRightSpacing"),h=u.toolbar;function _(t,o){t.includes(o)||t.push(o)}const g={followSysAccentColor:"1",chroma:"1",userCustomColor:""},y={zh_CN:{followSysAccent:"跟随系统强调色",pickColor:"自定义主题色",asriChroma:"色度："},zh_CHT:{followSysAccent:"跟隨系統強調色",pickColor:"自定義主題色",asriChroma:"色度："},en_US:{followSysAccent:"Follow system accent color",pickColor:"Customize theme color",asriChroma:"Chroma: "}},$=("zh_CN"===l||"zh_CHT"===l?y[l]:y.en_US).asriChroma;let H,w,Y,j;{async function v(){await async function(t,o,e=!1,n=Date.now()){o=new Blob([o]),o=new File([o],t.split("/").pop());let i=new FormData;i.append("path",t),i.append("file",o),i.append("isDir",e),i.append("modTime",n);const a=await fetch("/api/file/putFile",{body:i,method:"POST",headers:{Authorization:"Token ''"}});return 200===a.status?a.json():null}("/data/snippets/Asri.config.json",JSON.stringify(g,void 0,4))}function q(){let n,i,a;setTimeout(()=>{if(!document.querySelector(".asri-config")){const o=document.querySelector('#commonMenu[data-name="barmode"] .b3-menu__items');if(o){var t=`<button class="b3-menu__separator asri-config"></button><button class="b3-menu__item asri-config" id="pickColor"><svg class="b3-menu__icon"></svg><label for="asriColorPicker" class="be-menu__label">${("zh_CN"===l||"zh_CHT"===l?y[l]:y.en_US).pickColor}</label><input id="asriColorPicker" type="color" value="${g.userCustomColor}"></button><button class="b3-menu__item asri-config" id="followSysAccent"><svg class="b3-menu__icon"></svg><label for="" class="be-menu__label">${("zh_CN"===l||"zh_CHT"===l?y[l]:y.en_US).followSysAccent}</label></button><button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" /></svg><div aria-label="${$+a?.value||"1"}"class="b3-tooltips b3-tooltips__n"><input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0"max="5" step="0.1" value="1"></div></button>`,t=document.createRange().createContextualFragment(t);o.appendChild(t),_(m,".asri-config"),n=document.getElementById("followSysAccent"),i=document.getElementById("pickColor"),a=document.getElementById("asriChromaSlider"),colorPicker=i.lastElementChild,n.classList.toggle("b3-menu__item--selected",w),i.classList.toggle("b3-menu__item--selected",!w),a.value=g.chroma||"1",a.parentElement.ariaLabel=$+g.chroma,d||r||c?n.classList.add("fn__none"):n.addEventListener("click",()=>{w?(w=!1,n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),document.documentElement.style.setProperty("--asri-user-custom-accent",g.userCustomColor||H||"#3478f6"),k(g.chroma),g.followSysAccentColor="0"):(w=!0,n.classList.add("b3-menu__item--selected"),i.classList.remove("b3-menu__item--selected"),document.documentElement.style.removeProperty("--asri-user-custom-accent"),g.followSysAccentColor="1",B()),v()}),i.addEventListener("click",()=>{w&&(w=!1,n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),document.documentElement.style.setProperty("--asri-user-custom-accent",g.userCustomColor),k(g.chroma),g.userCustomColor=g.userCustomColor,g.followSysAccentColor="0",v())}),colorPicker.addEventListener("input",()=>{document.documentElement.style.setProperty("--asri-user-custom-accent",colorPicker.value)}),colorPicker.addEventListener("change",()=>{n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),g.userCustomColor=colorPicker.value,w=!1,g.followSysAccentColor="0",v()});const e=function(o,e){let n=null;return(...t)=>{n&&clearTimeout(n),n=setTimeout(()=>{o(...t)},e)}}(()=>v(),200);a.addEventListener("input",function(){var t=this.value;document.documentElement.style.setProperty("--asri-c-factor",t),this.parentElement.ariaLabel=$+t,g.chroma=t,Y="0"===t,k(t),e()})}}},0)}function B(){if(!(d||r||c)){const e=require("@electron/remote").systemPreferences.getAccentColor();var t="#"+e.slice(0,6),o=function(o){if(o){var e=parseInt(o.substring(1,3),16)/255,n=parseInt(o.substring(3,5),16)/255,i=parseInt(o.substring(5,7),16)/255,o=Math.max(e,n,i),a=Math.min(e,n,i),c=(o+a)/2;if(o===a)return{h:0,s:0,l:c};let t;var r=o-a,a=.5<c?r/(2-o-a):r/(o+a);switch(o){case e:t=(n-i)/r+(n<i?6:0);break;case n:t=(i-e)/r+2;break;case i:t=(e-n)/r+4}return{h:t/=6,s:a,l:c}}}(t);H!==t&&(document.documentElement.style.setProperty("--asri-sys-accent",t),.28<o.s?document.documentElement.style.setProperty("--asri-sys-accent-accessible",t):document.documentElement.style.removeProperty("--asri-sys-accent-accessible"),j=0===o.s,document.body.classList.add("asri-mode-transition"),setTimeout(()=>{document.body.classList.remove("asri-mode-transition")},350),H=t),w&&k(o.s)}}o||(async function(){await async function(t){try{var o=await fetch("/api/file/getFile",{method:"POST",headers:{Authorization:"Token ''"},body:JSON.stringify({path:t})});return 200===o.status?o:null}catch(t){return console.error("An error occurred while fetching the file:",t),null}}("/data/snippets/Asri.config.json").then(t=>t&&200===t.status?t.json():null).then(t=>{w=Number(t?.followSysAccentColor||g.followSysAccentColor),g.followSysAccentColor=t?.followSysAccentColor||"1",g.chroma=t?.chroma||"1",g.userCustomColor=t?.userCustomColor||"#3478f6"})}().then(()=>{i&&(!(d||r||c)&&w?document.documentElement.style.removeProperty("--asri-user-custom-accent"):document.documentElement.style.setProperty("--asri-user-custom-accent",g.userCustomColor),document.documentElement.style.setProperty("--asri-c-factor",g.chroma),Y="0"===g.chroma,k(g.chroma),B(),q())}),i&&u.barMode?.addEventListener("click",q))}function k(t){"0"===(chromaValue=String(t))||w&&j||Y?document.documentElement.style.setProperty("--asri-c-0","0"):document.documentElement.style.removeProperty("--asri-c-0")}function x(t,o=t){require("@electron/remote").getCurrentWindow().setWindowButtonPosition({x:t,y:o})}if(s&&!d&&x(16),s&&a&&x(14),s||r)for(let t=0;t<document.styleSheets.length;t++){let e=document.styleSheets[t];try{for(let o=0;o<e.cssRules.length;o++){let t=e.cssRules[o];t.selectorText&&t.selectorText.includes("::-webkit-scrollbar")&&(t.style.width||t.style.height||t.style.backgroundColor)&&(b.push({styleSheet:e,rule:t.cssText}),e.deleteRule(o),o--)}}catch(t){console.log(t)}}function T(o,e=void 0,n=void 0){if(!document.getElementById(o)){let t=document.createElement("div");t.id=o,e?u.toolbar.insertBefore(t,e):n?u.toolbar.insertBefore(t,n.nextSibling):u.toolbar.appendChild(t)}}let V=!1,J,U,X,S=u.drag?.getBoundingClientRect().left,C=u.drag?.getBoundingClientRect().right,K=u.toolbar?.getBoundingClientRect();function W(){V=!0,clearTimeout(J),J=setTimeout(function(){if(a)P(),setTimeout(()=>{z()},200);else{if(V=!1,s){let t=document.querySelector("#AsriTopbarLeftSpacing");X=!d&&require("@electron/remote").getCurrentWindow().isFullScreen()?(document.body.classList.add("body--fullscreen"),S-=X?0:88,!0):(document.body.classList.remove("body--fullscreen"),t?.style.setProperty("width","0px"),S=u.drag?.getBoundingClientRect().left,t.style.removeProperty("width"),!1)}A(),P(),G(),setTimeout(()=>{z()},200)}},200)}function A(r){if(!a){let t,o,e,n,i=(t=u.layouts.querySelector(".layout__center")?.getBoundingClientRect(),o=N.getBoundingClientRect(),e=u.barSync.getBoundingClientRect(),barForwardRect=u.barForward.getBoundingClientRect(),window.innerWidth),a=t.left,c=t.right;V?C+=r:(a>S+8?(h.style.setProperty("--topbar-left-spacing",0),S=X?S:u.drag.getBoundingClientRect().left,O.classList.remove("asri-expanded")):(s&&!d?h.style.setProperty("--topbar-left-spacing",a-e.right+4+"px"):h.style.setProperty("--topbar-left-spacing",a-barForwardRect.right+4+"px"),O.classList.add("asri-expanded")),c<C-8?(h.style.setProperty("--topbar-right-spacing",0),C=u.drag.getBoundingClientRect().right,u.dockr?.style.removeProperty("--avoid-topbar"),u.layoutDockr?.style.removeProperty("--avoid-topbar")):s||d?(h.style.setProperty("--topbar-right-spacing",o.right-c+5+"px"),u.dockr?.style.setProperty("--avoid-topbar","4px"),u.layoutDockr?.style.setProperty("--avoid-topbar","4px")):(h.style.setProperty("--topbar-right-spacing",o.right-c+7+"px"),u.dockr?.style.setProperty("--avoid-topbar","calc(var(--toolbar-height) - 6px)"),u.layoutDockr?.style.setProperty("--avoid-topbar","calc(var(--toolbar-height) - 6px)"))),c<C-8?(f.style.setProperty("--container-bg","var(--b3-list-hover)"),f.style.left=c+"px",f.style.right="0",f.style.removeProperty("height"),f.style.removeProperty("top")):(n=u.drag.getBoundingClientRect(),f.style.setProperty("--container-bg","var(--b3-border-color-trans)"),f.style.left=n.right-10+"px",f.style.right=i-n.right+8+"px",f.style.height="21px",f.style.top="13.5px")}}let E=[];function P(){E=u.layouts.querySelectorAll('[data-type="wnd"]')}function G(){a||E.forEach(t=>{let o=t.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');var e,n,t=o.getBoundingClientRect(),i=u.drag.getBoundingClientRect();L(t,i)||L(t,K)?(e=t.left<i.left?i.left-t.left-4:0,n=t.right>i.right?t.right-i.right+8:0,o.style.paddingLeft=e+"px",o.style.paddingRight=n+"px",t.right-n-240<i.left&&t.left<i.left||t.left+e+240>i.right&&t.right>i.right?(o.style.paddingTop="42px",o.style.paddingLeft=0,o.style.paddingRight=0):o.style.removeProperty("padding-top")):(o.style.removeProperty("padding-left"),o.style.removeProperty("padding-right"))})}function z(){E.forEach(t=>{let o=t.querySelector(".file-tree")?[]:t.querySelectorAll(".protyle-wysiwyg");0<o.length&&setTimeout(()=>{o.forEach(t=>{var o=t.style.paddingLeft;o!==t.dataset.prevpadding&&(t.style.setProperty("--protyle-spacing",o),t.dataset.prevpadding=o)})},300)})}if(!r){if(setTimeout(A,200),!a){let e=u.layouts.querySelector(".layout__center");const R=new ResizeObserver(t=>{for(var o of t){var e,n=o.contentBoxSize[0]["inlineSize"];o.target.dataset.prevWidth?(e=n-parseFloat(o.target.dataset.prevWidth),o.target.dataset.prevWidth=n,P(),clearTimeout(U),U=setTimeout(()=>{at(),z()},200),A(e),G(),D()):o.target.dataset.prevWidth=n}});if(e)R.observe(e),p.push(R);else{let t=0,o;function Q(){u.layouts=document.getElementById("layouts"),e=u.layouts.querySelector(".layout__center"),10!==++t&&!e||(clearInterval(o),R.observe(e),p.push(R))}setTimeout(()=>{o=setInterval(Q,1e3)},0)}}window.addEventListener("resize",W)}function Z(t="l"){return u["dock"+t]&&u["dock"+t].classList.contains("fn__none")}function tt(){return u.dockb&&!u.dockb.classList.contains("fn__none")}function ot(){var t=tt(),o=function(){if(!r){const t=u.layouts,o=t.querySelector(".layout__dockb");return t&&o?.classList.contains("layout--float")&&"0px"!==o?.style.height}}();u.toolbar?.nextElementSibling.classList.toggle("has-dockb",t),u.toolbar?.nextElementSibling.classList.toggle("has-layout-dockb-float",o),u.dockb?.classList.toggle("has-layout-dockb-float",o),_(m,".has-dockb"),_(m,".has-layout-dockb-float")}function et(){return u.status&&u.status.classList.contains("fn__none")}function nt(t){return t&&!t.classList.contains("layout--float")}function it(t){return"0px"!==t?.style.width}function D(){if(u.dockl&&!r&&!a)for(var e of["l","r"]){let t=u["layoutDock"+e],o=u["dock"+e];if(nt(t)&&it(t)?(o.classList.add("dock-layout-expanded"),_(m,".dock-layout-expanded")):o.classList.remove("dock-layout-expanded"),!Z()&&(nt(n=t)||!n?.style.cssText.includes("transform: translate"))&&it(t))switch(e){case"l":case"r":o.style.setProperty("--border-clr","transparent")}else o.style.removeProperty("--border-clr")}var n}function at(){function t(t,o){u.status.style.transform=`translate(${t}px, ${o}px)`}var o,e,n,i;r||a||(tt()?(u.status?.style.removeProperty("max-width"),u.status?.style.removeProperty("transform")):(n=u.layouts.querySelector(".layout__center"))&&u.layoutDockr&&!u.status.classList.contains(".fn__none")&&(o=u.layoutDockr.clientWidth,n=n.clientWidth,u.layoutDockb=u.layouts.querySelector(".layout__dockb"),e=u.layoutDockb&&!u.layoutDockb.classList.contains(".fn__none")&&nt(u.layoutDockb)?-1*u.layoutDockb.clientHeight:0,u.status.style.maxWidth=n-12+"px",n=Z("r"),i=function(t){let o=u["layoutDock"+t];return o&&(o.classList.contains("layout--float")||o.style.cssText.includes("width: 0px"))}("r"),n&&i?t(0,e):!n&&i?t(-40,e):n||i?n&&!i&&t(-1*o,e):t(-1*(o+40),e),u.status=document.getElementById("status")))}function ct(){et()?document.body.style.setProperty("--status-height","0px"):document.body.style.setProperty("--status-height","32px")}function I(){if(!et()){let t=u.layouts?.querySelectorAll(".layout__center .layout-tab-container"),e=u.status.getBoundingClientRect(),o=(t?.forEach(t=>{let o=t.querySelector(".file-tree");o&&!o.classList.contains("fn__none")&&L(t.getBoundingClientRect(),e)?t.style.paddingBottom="35px":t.style.removeProperty("padding-bottom")}),document.getElementById("searchList")),n=document.getElementById("searchPreview");var a,c;(o||n)&&(a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),L(a,e)?o.style.paddingBottom="35px":o.style.removeProperty("padding-bottom"),L(c,e)?n.style.paddingBottom="35px":n.style.removeProperty("padding-bottom"));let i=document.getElementById("viewerContainer");i&&(L(i.getBoundingClientRect(),e)?i.style.paddingBottom="35px":i.style.removeProperty("padding-bottom")),u.layouts?.querySelectorAll(".card__main").forEach(t=>{t&&(L(t.getBoundingClientRect(),e)?t.style.paddingBottom="35px":t.style.removeProperty("padding-bottom"))})}}function L(t,o){return t&&o&&(t.right>o.left&&t.bottom>o.top&&t.left<o.left+o.width&&t.top<o.top+o.height)}function rt(){if(!r){let t=document.querySelectorAll(".file-tree .b3-list-item--focus");document.querySelectorAll(".file-tree .has-focus").forEach(t=>t.classList.remove("has-focus")),t.forEach(t=>{t.nextElementSibling&&"UL"===t.nextElementSibling.tagName&&!t.nextElementSibling.classList.contains("fn__none")||(t.parentNode.classList.add("has-focus"),_(m,".has-focus"))})}}function st(e,n){return new MutationObserver(function(t,o){t.forEach(t=>{t.type===e&&n(t,o)})})}function ut(e,n=void 0,i=void 0){return new MutationObserver(function(t,o){t.forEach(t=>{e&&"childList"===t.type?e(t,o):n&&"attributes"===t.type?n(t,o):i&&"characterData"===t.type&&i(t,o)})})}function dt(e,t,o=void 0,n=void 0,i=!1){let a={},c=(t&&(a.childList=!0),o&&(a.attributes=!0),n&&(a.characterData=!0),t&&i&&(a.subtree=!0),u["layoutDock"+e]),r=ut(t,o,n);if(c)r.observe(c,a),p.push(r);else{let t=0,o;function s(){c=u.layouts.querySelector(".layout__dock"+e),10!==++t&&!c||(clearInterval(o),u["layoutDock"+e]=c,D(),r.observe(c,a),p.push(r))}setTimeout(()=>{o=setInterval(s,1e3)},0)}}ot(),D(),ct(),I(),rt();{var[n,e=void 0,M=!1]=[()=>{document.body.classList.toggle("has-exportimg",document.querySelector('[data-key="dialog-exportimage"]')),_(m,".has-exportimg")}];let t={},o=(n&&(t.childList=!0),e&&(t.attributes=!0),n&&M&&(t.subtree=!0),ut(n,e));o.observe(document.body,t),p.push(o)}if(!r&&!a){dt("l",void 0,()=>{setTimeout(()=>{I()},200),D()}),dt("r",void 0,()=>{setTimeout(()=>{I()},200),D()});{M="attributes";n=ct;e=u.status;let t=st(M,n);e&&(t.observe(e,{[M]:!0}),p.push(t))}}function F(){r||setTimeout(()=>{P();{let t=document.querySelector("#AsriTopbarLeftSpacing"),o=document.querySelector("#AsriTopbarRightSpacing");t?.style.setProperty("width","0px"),o?.style.setProperty("width","0px"),S=u.drag?.getBoundingClientRect().left,C=u.drag?.getBoundingClientRect().right,t?.style.removeProperty("width"),o?.style.removeProperty("width")}A(),G(),z(),rt();{let t=u.layouts?.querySelectorAll(".protyle .protyle-background");t.forEach(t=>{!t.querySelector(".protyle-background__img img")?.classList.contains("fn__none")&&t.querySelector(".protyle-background__icon.fn__none")?(t.classList.add("without-icon"),_(m,".without-icon")):t.classList.remove("without-icon")})}I(),ot(),at(),!o&&w&&i&&B()},200)}function lt(t){"Control"!==t.key&&"Alt"!==t.key&&"Shift"!==t.key&&"Meta"!==t.key||F()}function mt(t){document.body.style.setProperty("--mouseX",t.clientX+"px"),document.body.style.setProperty("--mouseY",t.clientY+"px")}F(),window.addEventListener("mouseup",F),window.addEventListener("dragend",F),window.addEventListener("keyup",lt),window.addEventListener("dblclick",mt),window.destroyTheme=()=>{if(window.removeEventListener("mouseup",F),window.removeEventListener("keyup",lt),window.removeEventListener("dragend",F),window.removeEventListener("dblclick",mt),window.removeEventListener("resize",W),u.barMode?.removeEventListener("click",q),p.forEach(t=>t.disconnect()),s&&!d&&x(8),s&&a&&x(8,13),m.forEach(o=>{document.querySelectorAll(o).forEach(t=>t.classList.remove(o.slice(1)))}),document.querySelector("#AsriTopbarLeftSpacing")?.remove(),document.querySelector("#AsriTopbarRightSpacing")?.remove(),document.querySelector("#AsriPluginsIconsDivider")?.remove(),document.body.style.removeProperty("--mouseX"),document.body.style.removeProperty("--mouseY"),document.body.style.removeProperty("--status-height"),document.documentElement.style.removeProperty("--asri-sys-accent"),document.documentElement.style.removeProperty("--asri-sys-accent-accessible"),document.documentElement.style.removeProperty("--asri-sys-accent-grayscale"),document.documentElement.style.removeProperty("--asri-user-custom-accent"),document.documentElement.style.removeProperty("--asri-c-factor"),document.documentElement.style.removeProperty("--asri-c-0"),document.querySelectorAll(".dock").forEach(t=>{t.style.removeProperty("--border-clr")}),setTimeout(()=>{u.toolbar?.style.removeProperty("--topbar-left-spacing"),u.toolbar?.style.removeProperty("--topbar-right-spacing"),u.dockr?.style.removeProperty("--avoid-topbar"),u.layoutDockr?.style.removeProperty("--avoid-topbar"),u.status?.style.removeProperty("max-width"),u.status?.style.removeProperty("transform");const t=document.body.querySelectorAll('[data-type="wnd"]'),o=(t.forEach(t=>{const o=t.firstElementChild,e=t.querySelectorAll(".protyle-wysiwyg");o?.style.removeProperty("padding-left"),o?.style.removeProperty("padding-right"),o?.style.removeProperty("padding-top"),e.forEach(t=>{t.style.removeProperty("--protyle-spacing"),t.dataset.prevpadding=void 0})}),u.layouts?.querySelectorAll(".layout__center .layout-tab-container"));o.forEach(t=>{t.style.removeProperty("padding-bottom")})},200),document.getElementById("searchList")?.style.removeProperty("padding-bottom"),document.getElementById("searchPreview")?.style.removeProperty("padding-bottom"),document.getElementById("viewerContainer")?.style.removeProperty("padding-bottom"),u.layouts.querySelectorAll(".card__main").forEach(t=>{t.style.removeProperty("padding-bottom")}),b)for(let o=0;o<b.length;o++){let t=b[o];t.styleSheet.insertRule(t.rule,t.styleSheet.cssRules.length)}document.body.classList.add("asri-mode-transition"),setTimeout(()=>{document.body.classList.remove("asri-mode-transition")},350)}}();