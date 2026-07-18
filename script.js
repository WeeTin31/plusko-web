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

// Text reveal - každý <span> uvnitř .reveal-text se obalí vnitřním
// řádkem, který se vyjede zdola nahoru, jakmile nadpis vjede do viewportu.
document.querySelectorAll('.reveal-text').forEach((el) => {
  el.querySelectorAll(':scope > span').forEach((line, i) => {
    const inner = document.createElement('span');
    inner.className = 'reveal-line';
    inner.style.transitionDelay = `${i * 90}ms`;
    inner.textContent = line.textContent;
    line.textContent = '';
    line.appendChild(inner);
  });
});

const revealTextObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealTextObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll('.reveal-text').forEach((el) => revealTextObserver.observe(el));

// Scroll reveal se stupňovaným zpožděním podle pořadí v sekci.
const revealGroups = document.querySelectorAll(
  '.feature-grid, .how-steps, .pricing-grid, .stats-inner, .screens-row'
);
revealGroups.forEach((group) => {
  [...group.children].forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 90}ms`;
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Jemný tilt efekt na hero telefonu - reaguje na pohyb myši.
const tiltPhone = document.getElementById('tiltPhone');
if (tiltPhone && window.matchMedia('(hover: hover)').matches) {
  tiltPhone.addEventListener('mousemove', (e) => {
    const rect = tiltPhone.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltPhone.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  tiltPhone.addEventListener('mouseleave', () => {
    tiltPhone.style.transform = '';
  });
}

// Nav dostane jemný stín, jakmile se stránka odscrolluje.
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 12);
});
