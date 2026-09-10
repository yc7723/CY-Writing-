const clock = document.querySelector('#clock');
const readingProgress = document.querySelector('#reading-progress');

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
