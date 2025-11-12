// --- 滚动渐现动画逻辑 (Intersection Observer) ---
const animateElements = document.querySelectorAll(".animate-on-scroll");

const observerOptions = {
  root: null, // 相对视口
  rootMargin: "0px",
  threshold: 0.2, // 当元素有20%进入视口时触发
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // 获取并应用数据延迟 (data-delay)
      const delay = target.dataset.delay || 0;
      target.style.transitionDelay = `${delay}ms`;

      // 添加激活类，触发 CSS 动画
      target.classList.add("is-visible");

      // 动画完成后停止观察，提升性能
      observer.unobserve(target);
    }
  });
}, observerOptions);

// 挂载观察器到所有目标元素
animateElements.forEach((el) => {
  observer.observe(el);
});

// --- 菜单切换功能 ---
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    // 点击按钮时，切换 nav-open 类
    navLinks.classList.toggle("nav-open");
  });

  // 点击菜单链接后自动关闭菜单 (仅在移动端)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("nav-open");
      }
    });
  });
}

// --- 平滑滚动 JS ---
document.querySelectorAll('#nav-links a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
