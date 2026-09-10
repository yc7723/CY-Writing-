const clock = document.querySelector('#clock');
const readingProgress = document.querySelector('#reading-progress');
const featureSlides = [...document.querySelectorAll('[data-feature-slide]')];
const featureDots = [...document.querySelectorAll('[data-feature-dot]')];
const featureCurrent = document.querySelector('#feature-current');
const featurePrev = document.querySelector('#feature-prev');
const featureNext = document.querySelector('#feature-next');
let activeFeature = 0;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

updateClock();
setInterval(updateClock, 30000);

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

updateReadingProgress();
window.addEventListener('scroll', updateReadingProgress, { passive: true });

function showFeature(index) {
  activeFeature = (index + featureSlides.length) % featureSlides.length;

  featureSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeFeature;
    slide.hidden = !isActive;
    slide.classList.toggle('is-active', isActive);
  });

  featureDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeFeature;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-pressed', String(isActive));
  });

  featureCurrent.textContent = String(activeFeature + 1).padStart(2, '0');
}

if (featureSlides.length) {
  featurePrev.addEventListener('click', () => showFeature(activeFeature - 1));
  featureNext.addEventListener('click', () => showFeature(activeFeature + 1));
  featureDots.forEach((dot) => {
    dot.addEventListener('click', () => showFeature(Number(dot.dataset.featureDot)));
  });
  showFeature(0);
}
