function setRemUnit() {
  const baseSize = 100; // 基础尺寸，可以根据需要调整
  const baseWidth = 1920; // 设计稿的基准宽度

  // 当前窗口宽度
  const clientWidth = document.documentElement.clientWidth;

  // 根据当前窗口宽度计算HTML的font-size
  const fontSize = (clientWidth / baseWidth) * baseSize;

  // 设置HTML的font-size
  document.documentElement.style.fontSize = `${fontSize}px`;
}

// 初始调用
setRemUnit();

// 窗口大小变化时重新设置
window.addEventListener('resize', setRemUnit);