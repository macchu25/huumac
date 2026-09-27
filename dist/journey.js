import { makePaperRenderer } from '/paper3d.js';

const captions = [
  'Ngày đầu bước vào giảng đường',
  'Những người bạn mới',
  'Kỷ niệm khó phai',
  'Một góc sân trường VKU',
  'Cùng nhau làm đồ án',
  'Những đêm thức trắng',
  'Deadline qua đi, nụ cười ở lại',
  'Nụ cười thanh xuân',
  'Từng bước trưởng thành',
  'Những tiết học rộn rã',
  'Khoảnh khắc bên thầy cô',
  'Thanh xuân rực rỡ',
  'Những ngày ôn thi',
  'Một thời sinh viên',
  'Chuyến đi cùng nhóm bạn',
  'Nụ cười vô tư',
  'Những buổi thuyết trình',
  'Cùng nhau vượt khó',
  'Ly cà phê sáng trước giờ học',
  'Những ngày mưa Đà Nẵng',
  'Hội trại và nhiệt huyết',
  'Tuổi trẻ hết mình',
  'Những người đồng đội',
  'Lưu giữ nụ cười',
  'Một chặng đường đáng nhớ',
  'Bên nhau những ngày vui',
  'Chia sẻ ngọt bùi',
  'Hành lang quen thuộc',
  'Những buổi chiều tan lớp',
  'Một thoáng bình yên',
  'Năng lượng tuổi trẻ',
  'Những kỷ niệm đong đầy',
  'Dưới mái trường Việt - Hàn',
  'Gắn kết tình bạn',
  'Những khoảnh khắc chân thực',
  'Vượt qua từng thử thách',
  'Thành quả của nỗ lực',
  'Chặng đường học tập',
  'Cột mốc đáng tự hào',
  'Những người bạn tri kỷ',
  'Học hết sức, chơi hết mình',
  'Mỗi ngày thêm gắn bó',
  'Nụ cười rạng rỡ',
  'Những chuyến phiêu lưu',
  'Thanh xuân không hối tiếc',
  'Bên nhau những lúc khó khăn',
  'Từng trang ký ức',
  'Những ánh mắt thân thương',
  'Hành trang vào đời',
  'Tình bạn giảng đường',
  'Những lời chúc tốt đẹp',
  'Gặp gỡ là duyên',
  'Thời khắc đáng nhớ',
  'Bước tiến mới',
  'Niềm tin vào tương lai',
  'Gia đình thứ hai',
  'Mỗi bức ảnh, một câu chuyện',
  'Những kỷ niệm ngưng đọng',
  'Tự hào chặng đường đã qua',
  'Sẵn sàng vươn xa',
  'Khoác lên mình bộ lễ phục',
  'Nụ cười chuẩn bị tốt nghiệp',
  'Cảm ơn những người đồng hành',
  'Một thời tuổi trẻ ngát hương',
  'Những khoảnh khắc rực sáng',
  'Tốt nghiệp VKU',
  'Chạm tay vào ước mơ',
  'Tương lai rộng mở phía trước',
  'Và lời mời trân trọng nhất'
];

export function createJourney(card, { guest, config, onClose }) {
  const placeholder = document.createComment('invitation-home');
  card.before(placeholder);
  const overlay = document.createElement('section');
  overlay.className = 'journey';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Hành trình kỷ niệm và thư mời tốt nghiệp');
  overlay.innerHTML = `
    <div class="journey-toolbar">
      <span class="journey-label">DỌC THEO MIỀN KỶ NIỆM</span>
      <div class="journey-tools">
        <button type="button" class="journey-skip">Xem thiệp ngay ⏭</button>
        <button type="button" class="journey-close" aria-label="Đóng hành trình">Đóng ×</button>
      </div>
    </div>
    <h2 class="journey-title">Một lá thư, <em>một trời kỷ niệm.</em></h2>
    <div class="memory-viewport">
      <div class="memory-world"></div>
    </div>
    <div class="journey-caption">
      <span class="journey-counter" aria-live="polite">Lá thư đang cất cánh cùng kỷ niệm…</span>
      <div class="journey-progress"><span></span></div>
    </div>
  `;
  const world = overlay.querySelector('.memory-world');
  const viewport = overlay.querySelector('.memory-viewport');

  captions.forEach((caption, i) => {
    const figure = document.createElement('figure');
    figure.className = 'memory-photo';
    const tilt = i % 3 === 0 ? 3 : (i % 3 === 1 ? -2.5 : 1.5);
    figure.style.setProperty('--tilt', `${tilt}deg`);
    figure.style.setProperty('--delay', `${-(i % 8) * 0.4}s`);
    const img = document.createElement('img');
    img.src = `/photos/${String(i + 1).padStart(2, '0')}.jpg`;
    img.alt = `Ảnh kỷ niệm ${i + 1}: ${caption}`;
    img.loading = i < 8 ? 'eager' : 'lazy';
    img.decoding = 'async';
    const label = document.createElement('figcaption');
    label.textContent = caption;
    figure.append(img, label);
    world.append(figure);
  });

  const dock = document.createElement('div');
  dock.className = 'invitation-dock';
  world.append(dock);

  const flyer = document.createElement('div');
  flyer.className = 'flying-letter';
  flyer.setAttribute('aria-hidden', 'true');
  world.append(flyer);

  document.body.append(overlay);
  document.body.classList.add('journey-active');

  const face = card.cloneNode(true);
  face.className = 'flight-face';
  face.removeAttribute('id');
  face.removeAttribute('inert');
  face.removeAttribute('aria-hidden');
  face.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  flyer.append(face);

  const paperHeight = face.offsetHeight || 580;
  flyer.style.height = paperHeight + 'px';

  const background = [...document.body.children].filter(el => el !== overlay && el.tagName !== 'SCRIPT');
  const inertBefore = background.map(el => el.hasAttribute('inert'));
  background.forEach(el => el.setAttribute('inert', ''));

  const skip = overlay.querySelector('.journey-skip');
  const close = overlay.querySelector('.journey-close');
  const counter = overlay.querySelector('.journey-counter');
  const progress = overlay.querySelector('.journey-progress span');

  let previousTime = null;
  let frame, landed = false, cancelled = false, lastPhoto = -1, elapsed = 0;
  const riseDuration = 1800;
  const travelDuration = 22000;
  const landingDuration = 1500;
  const totalDuration = riseDuration + travelDuration + landingDuration;
  const ease = t => t * t * (3 - 2 * t);

  function geometry() {
    const end = dock.offsetLeft + dock.offsetWidth / 2;
    const firstPhoto = world.querySelector('.memory-photo');
    const begin = (firstPhoto ? firstPhoto.offsetLeft : 0) + 60;
    return { begin, end, camera: Math.max(0, end - innerWidth * (innerWidth > 900 ? 0.68 : 0.5)) };
  }

  function showInvitation() {
    if (landed || cancelled) return;
    landed = true;
    cancelAnimationFrame(frame);
    dock.append(card);
    card.removeAttribute('inert');
    card.setAttribute('aria-hidden', 'false');
    const g = geometry();
    world.style.transform = `translate3d(${-g.camera}px,0,0)`;
    card.getBoundingClientRect();
    overlay.classList.add('landed');
    overlay.querySelector('.memory-viewport').scrollTop = 0;
    skip.hidden = false;
    skip.textContent = 'Xem lại hành trình ↺';
    counter.textContent = config?.journeyArrival || 'Thân mời tất cả mọi người cùng chung vui!';
    card.querySelector('h2')?.focus({ preventScroll: true });
  }

  function tick(now) {
    if (cancelled || landed) return;
    if (previousTime !== null) {
      const delta = now - previousTime;
      elapsed += delta > 100 ? 16.7 : delta;
    }
    previousTime = now;

    const g = geometry();
    let x, y, pitch, yaw, roll, depth, camera = 0;
    const baseScale = innerWidth < 600 ? 0.22 : 0.28;
    const halfHeight = paperHeight / 2;
    let scale = baseScale;

    if (elapsed < riseDuration) {
      // GIAI ĐOẠN 1: Cất cánh từ phong bì, lượn vút thẳng lên trời cao
      const t = ease(elapsed / riseDuration);
      x = g.begin;
      y = (halfHeight + 60) - (halfHeight + 60 + 130) * t; // Từ phong bì vút lên độ cao -130px trên trời
      pitch = 8 * t;
      yaw = 14 * t;
      roll = Math.sin(t * Math.PI * 2) * 5;
      depth = 15 * t;
      camera = 0;
      counter.textContent = 'Lá thư đang cất cánh cùng kỷ niệm…';
    } else if (elapsed < riseDuration + travelDuration) {
      // GIAI ĐOẠN 2: "Bay ngang bay dọc" Ở TRÊN TRỜI, HOÀN TOÀN TRÊN DẢI ẢNH
      const t = (elapsed - riseDuration) / travelDuration;
      x = g.begin + (g.end - g.begin) * t;

      // Quỹ đạo nhấp nhô lượn sóng trên trời cao (-150px đến -110px)
      // Đáy thư luôn ở trên mức -45px, tuyệt đối không chạm hay đâm xuyên qua ảnh!
      const swoop = Math.sin(t * Math.PI * 6);
      const flutter = Math.sin(elapsed / 260) * 4;
      y = -130 - swoop * 20 + flutter;

      // Góc chúc mũi / ngóc đầu nhẹ tự nhiên (chỉ 2° đến 14°, nhìn rõ mặt thư)
      const slope = Math.cos(t * Math.PI * 6);
      pitch = 8 - slope * 6;

      // Nghiêng cánh khi lượn (-8° đến +8°)
      roll = -slope * 8 + Math.sin(elapsed / 450) * 3;

      // Hướng mũi sang phải theo phương bay (10° đến 18°)
      yaw = 14 + Math.sin(t * Math.PI * 4) * 4;

      // Chiều sâu 3D
      depth = Math.sin(t * Math.PI * 5) * 15;

      // Camera di chuyển mượt mà
      camera = Math.min(g.camera, Math.max(0, x - innerWidth * 0.42));

      const index = Math.min(captions.length - 1, Math.floor(t * captions.length));
      if (index !== lastPhoto) {
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${captions.length} · ${captions[index]}`;
        lastPhoto = index;
      }
    } else {
      // GIAI ĐOẠN 3: Lượn từ trên cao hạ cánh xuống điểm kẹp thư và đứng thẳng
      const t = Math.min(1, (elapsed - riseDuration - travelDuration) / landingDuration);
      const et = ease(t);
      x = g.end;
      y = -130 + (130 + halfHeight + 24) * et;
      pitch = 8 * (1 - et);
      roll = Math.sin(et * Math.PI) * 4 * (1 - et);
      yaw = 14 * (1 - et);
      depth = 10 * (1 - et);
      scale = baseScale + (1 - baseScale) * et; // Phóng to mượt mà khi đáp vào dây
      camera = g.camera;
      counter.textContent = config?.journeyArrival ? ('Và lời mời: ' + config.recipient) : 'Và lời mời trân trọng nhất gửi tới mọi người…';
      if (t === 1) {
        showInvitation();
        return;
      }
    }

    flyer.style.transform = `perspective(1000px) translate3d(${x - 200}px,${y - halfHeight}px,${depth}px) scale(${scale}) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)`;

    // Hiệu ứng sóng giấy nhẹ khi không có WebGL
    if (!renderer) {
      bands.forEach((band, i) => {
        const wave = Math.sin(elapsed / 400 - i * 0.45);
        band.style.transform = `translateZ(${wave * 5}px) rotateX(${Math.cos(elapsed / 400 - i * 0.45) * 2}deg)`;
      });
    }

    world.style.transform = `translate3d(${-camera}px,0,0)`;
    progress.style.transform = `scaleX(${Math.min(1, elapsed / totalDuration)})`;
    frame = requestAnimationFrame(tick);
  }

  // Hỗ trợ cuộn chuột ngang khi xem các ảnh đã hạ cánh
  function handleWheel(e) {
    if (landed && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      viewport.scrollLeft += e.deltaY;
    }
  }
  viewport.addEventListener('wheel', handleWheel, { passive: true });

  function stop() {
    if (cancelled) return;
    cancelled = true;
    cancelAnimationFrame(frame);
    renderer?.dispose();
    viewport.removeEventListener('wheel', handleWheel);
    placeholder.replaceWith(card);
    overlay.remove();
    document.body.classList.remove('journey-active');
    background.forEach((el, i) => {
      if (!inertBefore[i]) el.removeAttribute('inert');
    });
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', visibility);
    onClose();
  }

  function resize() {
    if (landed) world.style.transform = `translate3d(${-geometry().camera}px,0,0)`;
  }

  function visibility() {
    if (landed || cancelled) return;
    if (document.hidden) cancelAnimationFrame(frame);
    else {
      previousTime = null;
      frame = requestAnimationFrame(tick);
    }
  }

  skip.addEventListener('click', () => {
    if (!landed) {
      showInvitation();
    } else {
      stop();
      document.querySelector('#openButton').click();
    }
  });

  close.addEventListener('click', stop);
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') stop();
    if (event.key === 'Tab') {
      const active = document.activeElement;
      if (event.shiftKey && (active === skip || active === card.querySelector('h2'))) {
        event.preventDefault();
        close.focus();
      } else if (!event.shiftKey && active === close) {
        event.preventDefault();
        (landed ? skip : close).focus();
      }
    }
  });

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', visibility);
  close.focus({ preventScroll: true });
  frame = requestAnimationFrame(tick);
  return { close: stop };
}
