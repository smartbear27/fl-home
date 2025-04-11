/**
 * GitHub Pages路径修复工具
 * 用于解决在GitHub Pages上部署时图像和链接路径问题
 */

(function() {
  // 仓库名称 - 请根据您的实际仓库名称修改
  const repoName = "homepage";
  
  // 检测当前环境
  const hostname = window.location.hostname;
  const isUserPage = hostname.endsWith('github.io') && hostname.split('.')[0] === repoName.split('/')[0];
  const isProjectPage = !isUserPage && hostname.endsWith('github.io');
  const hasCustomDomain = !hostname.endsWith('github.io');
  
  // 需要修复的基础路径
  let basePath = '';
  if (isProjectPage && !hasCustomDomain) {
    basePath = '/' + repoName;
  }
  
  // 修复所有图像的src属性
  function fixImagePaths() {
    const images = document.querySelectorAll('img[src^="/"]');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src.startsWith('/images/')) {
        // 对于以/images/开头的路径，正确设置路径
        img.setAttribute('src', basePath + src);
      } else if (src.startsWith('/favicon.ico')) {
        // 修复favicon路径
        img.setAttribute('src', basePath + src);
      } else if (src.startsWith('/')) {
        // 其他绝对路径
        img.setAttribute('src', basePath + src);
      }
    });
  }
  
  // 修复所有链接的href属性
  function fixLinkPaths() {
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      // 跳过外部链接
      if (href.startsWith('http')) return;
      
      // 修复内部链接
      if (href.startsWith('/')) {
        link.setAttribute('href', basePath + href);
      }
    });
  }
  
  // 修复所有背景图像
  function fixBackgroundImages() {
    const elementsWithBgImage = document.querySelectorAll('[style*="background-image: url(\'/"]');
    elementsWithBgImage.forEach(el => {
      const style = el.getAttribute('style');
      if (style) {
        // 处理背景图像URL路径
        const newStyle = style.replace(/url\(['"]?\/([^'")]+)['"]?\)/g, 'url(' + basePath + '/$1)');
        el.setAttribute('style', newStyle);
      }
    });
  }
  
  // 页面加载完成后执行修复
  function init() {
    console.log('应用GitHub Pages路径修复，仓库名称：' + repoName);
    console.log('当前域名：' + hostname);
    console.log('是用户页面？' + isUserPage);
    console.log('是项目页面？' + isProjectPage);
    console.log('基础路径：' + basePath);
    
    fixImagePaths();
    fixLinkPaths();
    fixBackgroundImages();
    console.log('GitHub Pages路径修复已应用完成');
  }
  
  // 在DOM加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 