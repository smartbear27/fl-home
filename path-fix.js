/**
 * GitHub Pages路径修复工具
 */
(function() {
  // 检测当前环境
  const hostname = window.location.hostname;
  
  // 修复所有图像的src属性
  function fixImagePaths() {
    const images = document.querySelectorAll("img[src^=\"/\"]");
    images.forEach(img => {
      const src = img.getAttribute("src");
      if (src.startsWith("/")) {
        img.setAttribute("src", src.substring(1));
      }
    });
  }
  
  // 修复所有链接的href属性
  function fixLinkPaths() {
    const links = document.querySelectorAll("a[href^=\"/\"]");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href.startsWith("/") && !href.startsWith("http")) {
        link.setAttribute("href", href.substring(1));
      }
    });
  }
  
  // 页面加载完成后执行修复
  function init() {
    fixImagePaths();
    fixLinkPaths();
    console.log("路径修复已应用");
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(); 