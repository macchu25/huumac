const stage = document.querySelector('#stage');
const card = document.querySelector('#invitation');
const seal = document.querySelector('#seal');
const openButton = document.querySelector('#openButton');
const reset = document.querySelector('#reset');
const status = document.querySelector('#status');
const confetti = document.querySelector('#confetti');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let state = 'closed';
let timer;
function openLetter() {
  if (state !== 'closed') return;
  state = 'opening';
  stage.classList.add('open');
  seal.disabled = true;
  openButton.disabled = true;
  seal.setAttribute('aria-expanded', 'true');
  openButton.setAttribute('aria-expanded', 'true');
  openButton.textContent = 'Đang mở lời mời…';
  timer = window.setTimeout(() => {
    state = 'open';
    card.inert = false;
    card.setAttribute('aria-hidden', 'false');
    openButton.hidden = true;
    reset.hidden = false;
    status.textContent = 'Thư đã mở. Trân trọng mời bạn tới lễ tốt nghiệp đại học.';
    document.querySelector('#cardTitle').focus({ preventScroll: true });
    if (window.innerWidth < 901) card.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
    if (!reducedMotion.matches) {
      for (let i = 0; i < 26; i++) {
        const piece = document.createElement('i');
        piece.style.setProperty('--x', `${(Math.random() - .5) * 430}px`);
        piece.style.setProperty('--y', `${(Math.random() - .65) * 440}px`);
        piece.style.setProperty('--rotation', `${Math.random() * 720}deg`);
        piece.style.setProperty('--delay', `${Math.random() * .25}s`);
        confetti.append(piece);
      }
      timer = window.setTimeout(() => confetti.replaceChildren(), 2300);
    }
  }, reducedMotion.matches ? 0 : 2150);
}
function closeLetter() {
  window.clearTimeout(timer);
  confetti.replaceChildren();
  stage.classList.remove('open');
  card.inert = true;
  card.setAttribute('aria-hidden', 'true');
  seal.disabled = false;
  openButton.disabled = false;
  seal.setAttribute('aria-expanded', 'false');
  openButton.setAttribute('aria-expanded', 'false');
  openButton.innerHTML = 'Mở thư mời <span aria-hidden="true">↗</span>';
  openButton.hidden = false;
  reset.hidden = true;
  state = 'closed';
  status.textContent = 'Đã gấp lại thư. Bạn có thể mở lại.';
  openButton.focus({ preventScroll: true });
}
seal.addEventListener('click', openLetter);
openButton.addEventListener('click', openLetter);
reset.addEventListener('click', closeLetter);
