// The animated vertices below are exported from graduation-paper.blend.
const meshReady = fetch('/models/paper-mesh.json').then(r => {
  if (!r.ok) throw new Error('Paper mesh could not be loaded');
  return r.json();
}).catch(() => null);

const grainReady = new Promise(resolve => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => resolve(null);
  image.src = '/models/paper-fiber.png';
});

function invitationTexture(card, grain) {
  const canvas = document.createElement('canvas');
  // Power-of-two (1024x2048) texture for WebGL 1.0 mipmapping
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  ctx.scale(1024 / 800, 2048 / 1340);
  
  // Background parchment tone
  ctx.fillStyle = '#f8f4e8';
  ctx.fillRect(0, 0, 800, 1340);
  
  if (grain) {
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(grain, 0, 0, 800, 1340);
    ctx.restore();
  }
  
  // Elegant gold borders
  ctx.strokeStyle = '#c5ae78';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 728, 1268);
  ctx.strokeStyle = '#e6d8b8';
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, 708, 1248);
  
  // Graduation Cap Icon
  ctx.save();
  ctx.strokeStyle = '#967b42';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(350, 100); ctx.lineTo(400, 82); ctx.lineTo(450, 100); ctx.lineTo(400, 118); ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(372, 110); ctx.lineTo(372, 130); ctx.quadraticCurveTo(400, 144, 428, 130); ctx.lineTo(428, 110);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(450, 100); ctx.lineTo(450, 136);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(450, 138, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = '#967b42';
  ctx.fill();
  ctx.restore();

  let y = 175;
  const textCenter = (value, size, color='#26394a', bold=false) => {
    ctx.fillStyle = color;
    ctx.font = `${bold ? '600' : '400'} ${size}px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(value, 400, y);
    y += size * 1.45;
  };
  const textWrapCenter = (value, size, color='#26394a', bold=false, maxWidth=640) => {
    ctx.fillStyle = color;
    ctx.font = `${bold ? '600' : '400'} ${size}px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = 'center';
    const lines = value.split('\n');
    for (const rawLine of lines) {
      const words = rawLine.trim().split(/\s+/);
      let line = '';
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width > maxWidth && line) {
          ctx.fillText(line, 400, y);
          y += size * 1.45;
          line = word;
        } else {
          line = next;
        }
      }
      if (line) {
        ctx.fillText(line, 400, y);
        y += size * 1.45;
      }
    }
  };

  const recipient = card?.querySelector('.recipient')?.textContent || 'Thân mời mọi người';
  const graduate = card?.querySelector('.graduate')?.textContent || 'Mạc Như Hữu';
  const message = card?.querySelector('.message')?.textContent || 'Cảm ơn mọi người đã là một phần của hành trình.\nMong được cùng mọi người lưu giữ khoảnh khắc này.';

  textCenter('TRÂN TRỌNG KÍNH MỜI', 19, '#8c734b'); y += 6;
  textCenter(recipient, 35, '#26394a', true); y += 18;
  textCenter('LỄ TỐT NGHIỆP', 48, '#1b2d3d', true);
  textCenter('ĐẠI HỌC', 20, '#8c734b'); y += 10;

  // Star divider
  ctx.strokeStyle = '#c5ae78'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(220, y); ctx.lineTo(370, y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(430, y); ctx.lineTo(580, y); ctx.stroke();
  ctx.fillStyle = '#967b42'; ctx.font = '16px serif'; ctx.textAlign = 'center';
  ctx.fillText('✦', 400, y + 5);
  y += 42;

  textCenter(graduate, 36, '#1b2d3d', true); y += 4;
  textWrapCenter('Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn', 21, '#475d6e', false, 620); y += 16;
  textWrapCenter(message, 20, '#556979', false, 600); y += 22;

  // Details
  const details = [
    { label: 'THỜI GIAN', value: '10:00 sáng · Ngày 30 tháng 9' },
    { label: 'ĐỊA ĐIỂM', value: 'Khu K, Trường ĐH CNTT & TT Việt – Hàn', sub: '470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng' },
    { label: 'LIÊN HỆ', value: '0905 304 143' }
  ];
  for (const d of details) {
    textCenter(d.label, 15, '#8c734b');
    textCenter(d.value, 22, '#1b2d3d', true);
    if (d.sub) textCenter(d.sub, 18, '#556979');
    y += 12;
  }

  y = Math.max(y, 1215);
  textCenter('Hẹn gặp mọi người trong ngày đặc biệt này!', 21, '#8c734b');
  return canvas;
}

export async function makePaperRenderer(container, card) {
  const [mesh, grain] = await Promise.all([meshReady, grainReady]);
  if (!mesh || !container.isConnected) return null;
  const canvas = document.createElement('canvas');
  canvas.className = 'paper-webgl';
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(400 * dpr);
  canvas.height = Math.round(670 * dpr);
  canvas.style.width = '400px';
  canvas.style.height = '670px';
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
  if (!gl) return null;

  const shader = (type, source) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };

  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, `
    attribute vec3 position;
    attribute vec2 uv;
    uniform float time;
    varying vec2 tex;
    varying float shade;
    void main() {
      tex = uv;
      float settle = 1.0 - smoothstep(23.5, 25.5, time);
      
      // Smooth, natural aerodynamic curvature (zero jitter/vibration)
      float waveY = sin(position.y * 1.6 - time * 1.5) * 0.025;
      float waveX = cos(position.x * 2.2 + time * 1.2) * 0.018;
      float edgeCurl = position.x * position.x * 0.02;
      
      vec3 p = position;
      p.z += (waveY + waveX + edgeCurl);
      
      // Dynamic lighting shading along paper curves
      shade = 0.95 + p.z * 0.35 + (uv.y - 0.5) * 0.06;
      gl_Position = vec4(p.x / 1.08, p.y / 1.76, p.z * 0.18, 1.0 - p.z * 0.12);
    }
  `));

  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec2 tex;
    varying float shade;
    uniform sampler2D paper;
    void main() {
      vec4 ink = texture2D(paper, tex);
      vec3 back = vec3(0.95, 0.92, 0.86) * (shade - 0.03);
      gl_FragColor = vec4(gl_FrontFacing ? ink.rgb * shade : back, ink.a);
    }
  `));

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);

  const timeLoc = gl.getUniformLocation(program, 'time');

  const position = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

  const uv = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uv);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.uv), gl.STATIC_DRAW);
  const uvLoc = gl.getAttribLocation(program, 'uv');
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

  const indices = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const texCanvas = invitationTexture(card, grain);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
  try {
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  } catch {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  if (ext) {
    const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 4;
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  container.append(canvas);
  container.style.height = '670px';
  container.classList.add('blender-paper');

  // Ultra-fast GPU draw loop (0 CPU loops, 0 buffer re-uploads, 120+ FPS buttery smooth)
  function render(ms) {
    gl.uniform1f(timeLoc, ms / 1000);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  render(0);
  return {
    render,
    dispose() {
      gl.deleteBuffer(position);
      gl.deleteBuffer(uv);
      gl.deleteBuffer(indices);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      canvas.remove();
    }
  };
}


