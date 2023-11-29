(() => {
    import('./style/customizable/customModules.js')
        .then((customModules) => {
            customModules.handleToolbarHover();
            customModules.ModifyMacTrafficLights();
        })
        .catch((e) => {
            console.error(e);
        });
})();

// let protyleBg = document.querySelector('.protyle-background--enable')
// let protyleBgIcon = protyleBg.querySelectorAll('.protyle-background__icon')

// if (protyleBgIcon.classList.contains('fn__none')) {
//     protyleBg.style.marginBottom='-94px';
// }

// // 创建一个新的 <script> 元素
// var script1 = document.createElement("script");

// // 设置 <script> 元素的 src 属性
// script1.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.28/bundled/lenis.min.js";

// // 获取 <head> 元素
// var head = document.getElementsByTagName("head")[0];

// // 将 <script> 元素添加到 <head> 元素中
// head.appendChild(script1);

// // 确保第一个脚本加载完成后再加载第二个脚本
// script1.onload = function() {
//     // 创建第二个 <script> 元素
//     var script2 = document.createElement("script");

//     // 设置脚本内容
//     script2.text = `
//         const lenis = new Lenis();
//         lenis.on('scroll', (e) => {
//             console.log(e)
//           })
//         function raf(time) {
//             lenis.raf(time * 1.5);
//             requestAnimationFrame(raf);
//         }

//         requestAnimationFrame(raf);
//     `;

//     // 将第二个 <script> 元素添加到 <head> 元素中
//     head.appendChild(script2);
// };