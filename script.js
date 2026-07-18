// Živé demo v hero sekci - stejná logika jako appka, ale bez uložení dat.
const demoPlus = document.getElementById('demoPlus');
const demoValue = document.getElementById('demoValue');
const demoCount = document.getElementById('demoCount');

let count = 0;
let revenue = 0;
const PRICE = 55;

demoPlus?.addEventListener('click', () => {
  count += 1;
  revenue += PRICE;
  demoCount.textContent = `${count}×`;
  animateNumber(demoValue, revenue);
  demoPlus.style.transform = 'scale(0.9)';
  setTimeout(() => (demoPlus.style.transform = ''), 120);
});

function animateNumber(el, target) {
  const from = parseInt(el.textContent, 10) || 0;
  const duration = 350;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (target - from) * eased);
    el.textContent = `${value} Kč`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Scroll reveal - sekce se objeví, jakmile najedou do viewportu.
const revealTargets = document.querySelectorAll('.feature-card, .how-step, .price-card, .stat');
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));
