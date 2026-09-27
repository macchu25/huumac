import { createJourney } from '/journey.js';
import { getRouteConfig } from '/guests.js';

const config = getRouteConfig(location.pathname);

// If on deprecated /macnhuhuu redirect to root
if (location.pathname === '/macnhuhuu' || location.pathname === '/macnhuhuu/') {
  history.replaceState(null, '', '/');
}

// Update document title and elements on page according to route config
document.title = config.title;

const stage = document.querySelector('#stage');
const card = document.querySelector('#invitation');
const seal = document.querySelector('#seal');
const openButton = document.querySelector('#openButton');
const reset = document.querySelector('#reset');
const confetti = document.querySelector('#confetti');
const status = document.querySelector('#status');

// Apply personalized copy to DOM
const recipientEl = document.querySelector('#recipient');
if (recipientEl) recipientEl.textContent = config.recipient;

const envelopeRecipientEl = document.querySelector('#envelopeRecipient');
if (envelopeRecipientEl) envelopeRecipientEl.textContent = config.envelopeRecipient;

const titleEl = document.querySelector('#title');
if (titleEl) titleEl.innerHTML = config.introTitle;

const leadEl = document.querySelector('.lead');
if (leadEl) leadEl.innerHTML = config.introLead;

const graduateEl = card.querySelector('.graduate');
if (graduateEl) graduateEl.textContent = config.graduate;

const messageEl = card.querySelector('.message');
if (messageEl) messageEl.innerHTML = config.message;

const signoffEl = card.querySelector('.signoff');
if (signoffEl) signoffEl.textContent = config.signoff;

let opening = false;

// 1. Mở trực tiếp tại phong bì (Không có hành trình - dành riêng cho /ngocmai)
function openDirectly() {
  if (opening) return;
  opening = true;
  stage.classList.add('open');
  seal.disabled = true;
  openButton.disabled = true;
  seal.setAttribute('aria-expanded', 'true');
  openButton.setAttribute('aria-expanded', 'true');
  openButton.textContent = 'Đang mở thư mời…';

  // Hiệu ứng pháo giấy confetti ăn mừng
  confetti.replaceChildren();
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('i');
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 440}px`);
    piece.style.setProperty('--y', `${(Math.random() - 0.65) * 440}px`);
    piece.style.setProperty('--rotation', `${Math.random() * 720}deg`);
    piece.style.setProperty('--delay', `${Math.random() * 0.25}s`);
    confetti.append(piece);
  }

  setTimeout(() => {
    stage.classList.add('revealed');
    card.removeAttribute('inert');
    card.setAttribute('aria-hidden', 'false');
    openButton.hidden = true;
    reset.hidden = false;
    status.textContent = 'Thư đã mở: ' + config.recipient;
    card.querySelector('h2')?.focus({ preventScroll: true });
  }, 2200);
}

function closeDirectly() {
  opening = false;
  stage.classList.remove('open', 'revealed');
  card.setAttribute('inert', '');
  card.setAttribute('aria-hidden', 'true');
  seal.disabled = false;
  openButton.disabled = false;
  seal.setAttribute('aria-expanded', 'false');
  openButton.setAttribute('aria-expanded', 'false');
  openButton.innerHTML = 'Mở thư mời <span aria-hidden="true">↗</span>';
  openButton.hidden = false;
  reset.hidden = true;
  confetti.replaceChildren();
  status.textContent = 'Đã gấp lại thư. Bạn có thể mở lại bất cứ lúc nào.';
  openButton.focus({ preventScroll: true });
}

// 2. Mở với hành trình kỷ niệm bay 3D
function openWithJourney() {
  if (opening) return;
  opening = true;
  stage.classList.add('unfolding');
  seal.disabled = true;
  openButton.disabled = true;
  seal.setAttribute('aria-expanded', 'true');
  openButton.setAttribute('aria-expanded', 'true');
  openButton.textContent = 'Mở miền kỷ niệm…';

  setTimeout(async () => {
    card.classList.add('taking-flight');
    const departure = card.animate([
      { transform: 'translateY(0) scale(.3) rotateY(0deg)', opacity: 1 },
      { transform: 'translateY(-120px) scale(.42) rotateY(-20deg) rotateZ(-7deg)', offset: .6, opacity: 1 },
      { transform: 'translateY(-200px) scale(.35) rotateY(22deg) rotateZ(6deg)', opacity: 1 }
    ], { duration: 1200, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    await departure.finished;

    createJourney(card, {
      config,
      onClose: () => {
        opening = false;
        stage.classList.remove('unfolding');
        card.setAttribute('inert', '');
        card.setAttribute('aria-hidden', 'true');
        seal.disabled = false;
        openButton.disabled = false;
        seal.setAttribute('aria-expanded', 'false');
        openButton.setAttribute('aria-expanded', 'false');
        openButton.innerHTML = 'Mở thư mời <span aria-hidden="true">↗</span>';
        status.textContent = 'Đã gấp lại thư. Bạn có thể mở lại hành trình.';
        openButton.focus({ preventScroll: true });
      }
    });

    departure.cancel();
    card.classList.remove('taking-flight');
  }, 650);
}

function handleOpen() {
  if (config.hasJourney) {
    openWithJourney();
  } else {
    openDirectly();
  }
}

seal.addEventListener('click', handleOpen);
openButton.addEventListener('click', handleOpen);
document.querySelector('#envelope').addEventListener('click', (e) => {
  if (e.target.closest('#reset') || e.target.closest('#invitation')) return;
  handleOpen();
});
reset.addEventListener('click', closeDirectly);

