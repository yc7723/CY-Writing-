const clock = document.querySelector('#clock');

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
