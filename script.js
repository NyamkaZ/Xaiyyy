/* ===== ЭНД ӨӨРЧИЛЖ БОЛНО ===== */
const CONFIG = {
  name: "Номиулан",
  gateTop: "✦ Нэг жижигхэн нууц ✦",
  heartLabel: "Эхлэх",
  gateHint: "Зүрхэн дээр дарж эхлээрэй",
  kicker: "✦ ЗӨВХӨН ЧАМД ЗОРИУЛАВ ✦",
  intro: ["Энэ хорвоогийн олон оддын дундаас", "миний харц зөвхөн чамайг олсон."],
  openBtn: "Гэнэтийн бэлгээ нээх ♡",
  // *од* гэж тэмдэглэсэн үг зөөлөн гэрэлтнэ
  title: "🎂 Төрсөн өдрийн мэнд хүргэе, {name} минь! 🌙",
  wish: "Шинэ насанд чинь *аз жаргал*, *инээд хөөр*, хүссэн бүхнийх нь биеллийг хүсье. Өдөр бүр инээмсэглэж, үргэлж *гэрэлтэж* яваарай.",
  special: "Чи миний хувьд энгийн нэгэн хүн биш шүү.",
  love: "Хайртайжүүү ❤️",
  wishBtn: "Хүслээ шивнээрэй ✨",
  wish1: "Нүдээ аниад хамгийн нандин хүслээ бодоорой. ✨",
  wish2: "Орчлон болон хайр нь чиний хүслийг сонсог. ♡",
  wishDone: "Хүслээ хэлээрэй ♡",
  replay: "Дахиад үзэх үү ? миний хайяааа xD",
  musicFile: "[ That Girl ] Lyrics - Olly Murs"
};
/* ================================ */

(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- Текст бөглөх ---------- */
  function glowify(el, text) {
    text.split("*").forEach((part, i) => {
      if (i % 2) { const s = document.createElement("span"); s.className = "glow"; s.textContent = part; el.appendChild(s); }
      else el.appendChild(document.createTextNode(part));
    });
  }
  $("#gateTop").textContent = CONFIG.gateTop;
  $("#heartLabel").textContent = CONFIG.heartLabel;
  $("#gateHint").textContent = CONFIG.gateHint;
  $("#kicker").textContent = CONFIG.kicker;
  CONFIG.intro.forEach((line) => { const s = document.createElement("span"); s.textContent = line; $("#introText").appendChild(s); });
  $("#openBtn").textContent = CONFIG.openBtn;
  $("#wishBtn").textContent = CONFIG.wishBtn;
  $("#wish1").textContent = CONFIG.wish1;
  $("#wish2").textContent = CONFIG.wish2;
  $("#wishDone").textContent = CONFIG.wishDone;
  $("#replayBtn").textContent = CONFIG.replay;

  const bday = $("#bdayText");
  [["l-title", CONFIG.title.replace("{name}", CONFIG.name)], ["l-wish", CONFIG.wish],
   ["l-special", CONFIG.special], ["l-love", CONFIG.love]].forEach(([cls, txt], i) => {
    const p = document.createElement("p");
    p.className = cls + " rise";
    p.style.setProperty("--d", [0.5, 2.0, 3.6, 5.0][i] + "s");
    glowify(p, txt);
    bday.appendChild(p);
  });
  const orn = document.createElement("div");
  orn.className = "orn rise"; orn.style.setProperty("--d", 5.6 + "s");
  orn.innerHTML = "<i></i><span>✦ ♡ ✦</span><i></i>"; bday.appendChild(orn);
  $("#wishBtn").style.setProperty("--d", 5.9 + "s");
  document.title = "Төрсөн өдрийн мэнд, " + CONFIG.name + " ✦";

  /* Үсэг бүр аажмаар гарч ирэх эффект */
  function letters(el) {
    let n = 0;
    (function walk(node) {
      Array.from(node.childNodes).forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
            const w = document.createElement("span"); w.className = "w";
            (tok.match(/\p{Extended_Pictographic}\uFE0F?|[\s\S]/gu) || []).forEach((c) => {
              const s = document.createElement("span"); s.className = "ch";
              s.style.setProperty("--i", n++); s.textContent = c; w.appendChild(s);
            });
            frag.appendChild(w);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1) walk(ch);
      });
    })(el);
    el.classList.add("lt");
  }
  letters($("#kicker"));
  $("#introText").classList.add("lt");
  $("#introText").querySelectorAll("span").forEach((sp, i) => { sp.style.setProperty("--d", (1.0 + i * 1.4) + "s"); letters(sp); });
  document.querySelectorAll("#bdayText p").forEach((p) => { if (p.classList.contains("l-wish")) p.style.setProperty("--s", ".016s"); letters(p); });
  letters($("#wish1")); letters($("#wish2"));

  /* ---------- Чимэглэл: bokeh гэрэл, зүрхэн constellation ---------- */
  const bk = $("#bokeh");
  if (!reduce) for (let i = 0; i < 8; i++) {
    const b = document.createElement("i"), s = rnd(60, 180);
    b.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + rnd(0, 100) + "%;animation-duration:" + rnd(22, 40) + "s;animation-delay:-" + rnd(0, 30) + "s";
    bk.appendChild(b);
  }
  const NS = "http://www.w3.org/2000/svg";
  const hc = document.createElementNS(NS, "svg");
  hc.setAttribute("viewBox", "-20 -20 40 40"); hc.setAttribute("class", "heart-con"); hc.setAttribute("aria-hidden", "true");
  const pts = [];
  for (let k = 0; k < 18; k++) {
    const a = k / 18 * Math.PI * 2;
    pts.push([16 * Math.pow(Math.sin(a), 3), -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) - 2.5]);
  }
  const pa = document.createElementNS(NS, "path");
  pa.setAttribute("d", "M" + pts.map((p) => p[0].toFixed(2) + " " + p[1].toFixed(2)).join("L") + "Z");
  pa.setAttribute("pathLength", "1"); hc.appendChild(pa);
  pts.forEach((p, i) => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); c.setAttribute("r", "0.6");
    c.style.animationDelay = (1 + i * 0.25) + "s"; hc.appendChild(c);
  });
  $("#intro").insertBefore(hc, $("#intro").firstChild);

  /* ---------- Canvas: од, харвасан од, хэсгүүд, зүрх ---------- */
  const cv = $("#sky"), ctx = cv.getContext("2d");
  let W = 0, H = 0, stars = [], shoots = [], parts = [], hearts = [];
  let confs = [], lants = [], confettiOn = false, lanternOn = false, ox = 0, oy = 0, tox = 0, toy = 0;
  let warp = 0, bright = 1, brightTarget = 1, con = 0.12, conTarget = 0.12, nextShoot = 2;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(320, Math.max(110, W * H / 4300)));
    stars = Array.from({ length: n }, () => ({
      x: rnd(0, W), y: rnd(0, H), r: rnd(0.3, 1.5), p: rnd(0, 6.28), s: rnd(0.6, 2),
      v: rnd(0.02, 0.1)
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  function heartPath(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.35);
    ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.3, y - s * 1.1, x, y - s * 0.4);
    ctx.bezierCurveTo(x + s * 0.3, y - s * 1.1, x + s, y - s * 0.4, x, y + s * 0.35);
    ctx.fill();
  }

  function burst(x, y, n, speed) {
    if (reduce) n = Math.round(n / 3);
    const cols = ["#FFFFFF", "#E8DFFF", "#F5C7E8", "#B9A4FF", "#8FB4FF"];
    for (let i = 0; i < n && parts.length < 320; i++) {
      const a = rnd(0, 6.283), sp = rnd(0.3, 1) * speed;
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, d: rnd(0.35, 0.8),
        r: rnd(1, 3), c: cols[(Math.random() * cols.length) | 0] });
    }
  }

  function diamond(s) {
    ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.3, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.3, 0); ctx.closePath(); ctx.fill();
  }
  function addHearts(x, y, n) {
    for (let i = 0; i < n && hearts.length < 30; i++) hearts.push({ x: x + rnd(-14, 14), y: y, s: rnd(6, 10), v: rnd(40, 80), sw: rnd(0, 6.28), a: 0.85 });
  }

  let last = performance.now(), t = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    ctx.clearRect(0, 0, W, H);
    warp += (0 - warp) * Math.min(1, dt * 1.6);
    bright += (brightTarget - bright) * Math.min(1, dt * 1.5);
    con += (conTarget - con) * Math.min(1, dt * 1.2);
    ox += (tox - ox) * Math.min(1, dt * 3); oy += (toy - oy) * Math.min(1, dt * 3);

    // Одод
    ctx.fillStyle = "#E8DFFF";
    for (const s of stars) {
      if (!reduce) {
        s.y += (s.v + warp * s.v * 60) * 60 * dt * 0.35;
        s.x += s.v * 12 * dt;
        if (s.y > H) { s.y = -2; s.x = rnd(0, W); }
        if (s.x > W) s.x = 0;
      }
      const a = Math.min(1, (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.s + s.p))) * bright);
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(s.x + ox * s.r * 6, s.y + oy * s.r * 6, s.r * (bright > 1.2 ? 1.25 : 1), 0, 6.283); ctx.fill();
      if (s.r > 1.1) { ctx.globalAlpha = a * 0.18; ctx.beginPath(); ctx.arc(s.x + ox * s.r * 6, s.y + oy * s.r * 6, s.r * 3.2, 0, 6.283); ctx.fill(); }
    }

    // Одод холбогдож constellation үүсгэнэ
    if (con > 0.02) {
      const m = Math.min(70, stars.length), maxD = Math.min(130, W * 0.3);
      ctx.lineWidth = 0.8; ctx.strokeStyle = "#F5C7E8";
      for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
        const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y, d = Math.hypot(dx, dy);
        if (d < maxD) {
          ctx.globalAlpha = (1 - d / maxD) * con;
          ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y); ctx.stroke();
        }
      }
    }

    // Харвасан од
    if (!reduce) {
      nextShoot -= dt;
      if (nextShoot <= 0 && shoots.length < 3) {
        shoots.push({ x: rnd(W * 0.3, W * 1.1), y: rnd(-20, H * 0.35), vx: -rnd(380, 560), vy: rnd(160, 260), life: 1 });
        nextShoot = rnd(2.5, 6);
      }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]; s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 0.9;
        if (s.life <= 0) { shoots.splice(i, 1); continue; }
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.22, s.y - s.vy * 0.22);
        g.addColorStop(0, "rgba(255,255,255," + s.life + ")"); g.addColorStop(1, "rgba(180,150,255,0)");
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 0.22, s.y - s.vy * 0.22); ctx.stroke();
      }
    }

    // Хөвөх зүрхнүүд
    if (!reduce && hearts.length < 14 && Math.random() < dt * 1.6)
      hearts.push({ x: rnd(0, W), y: H + 20, s: rnd(5, 11), v: rnd(25, 55), sw: rnd(0, 6.28), a: rnd(0.25, 0.6) });
    ctx.fillStyle = "#F5C7E8";
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i]; h.y -= h.v * dt;
      if (h.y < -20) { hearts.splice(i, 1); continue; }
      ctx.globalAlpha = h.a * Math.min(1, h.y / (H * 0.25));
      heartPath(h.x + Math.sin(t + h.sw) * 14, h.y, h.s);
    }

    // Унаж буй гялалзсан одод (confetti)
    if (confettiOn && !reduce && confs.length < 36 && Math.random() < dt * 7)
      confs.push({ x: rnd(0, W), y: -12, v: rnd(40, 90), r: rnd(0, 6.28), vr: rnd(-2, 2), s: rnd(3, 6.5), sw: rnd(0, 6.28),
        c: ["#F5C7E8", "#E8DFFF", "#FFFFFF", "#B9A4FF"][(Math.random() * 4) | 0] });
    for (let i = confs.length - 1; i >= 0; i--) {
      const c = confs[i]; c.y += c.v * dt; c.r += c.vr * dt;
      if (c.y > H + 14) { confs.splice(i, 1); continue; }
      ctx.save(); ctx.translate(c.x + Math.sin(t * 1.3 + c.sw) * 18, c.y); ctx.rotate(c.r);
      ctx.globalAlpha = 0.8; ctx.fillStyle = c.c; diamond(c.s); ctx.rotate(1.5708); diamond(c.s); ctx.restore();
    }

    // Дээш хөвөх хүслийн дэнлүүд
    if (lanternOn && !reduce && lants.length < 11 && Math.random() < dt * 1.3)
      lants.push({ x: rnd(W * 0.08, W * 0.92), y: H + 30, v: rnd(22, 42), sw: rnd(0, 6.28), s: rnd(5, 9) });
    for (let i = lants.length - 1; i >= 0; i--) {
      const l = lants[i]; l.y -= l.v * dt;
      if (l.y < -40) { lants.splice(i, 1); continue; }
      const x = l.x + Math.sin(t * 0.7 + l.sw) * 20, a = Math.min(1, (H - l.y) / (H * 0.2));
      ctx.fillStyle = "#F5C7E8"; ctx.globalAlpha = 0.14 * a; ctx.beginPath(); ctx.arc(x, l.y, l.s * 4, 0, 6.283); ctx.fill();
      ctx.fillStyle = "#FFF3D6"; ctx.globalAlpha = 0.9 * a; ctx.beginPath(); ctx.arc(x, l.y, l.s * 0.55, 0, 6.283); ctx.fill();
    }

    // Гялалзсан хэсгүүд
    ctx.globalCompositeOperation = "lighter";
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life -= dt * p.d;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.985; p.vy = p.vy * 0.985 + 18 * dt;
      ctx.globalAlpha = p.life; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life + 0.4, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- Дэлгэц солих ---------- */
  const flashEl = $("#flash");
  function flash() { flashEl.classList.remove("go"); void flashEl.offsetWidth; flashEl.classList.add("go"); }
  function go(fromId, toId, delay) {
    $(fromId).classList.remove("active");
    setTimeout(() => $(toId).classList.add("active"), delay || 900);
  }
  const center = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  /* 0 → 1: Зүрхэн товч */
  let started = false;
  $("#heartBtn").addEventListener("click", function () {
    if (started) return; started = true; startMusic();
    const [x, y] = center(this);
    this.classList.add("pressed"); this.parentElement.classList.add("gone");
    burst(x, y, 90, 260); warp = 1.2; conTarget = 0.9;
    flash();
    go("#gate", "#intro", 1000);
    setTimeout(() => { conTarget = 0.22; }, 5000);
  });

  /* 1 → 2: Гэнэтийн бэлэг */
  let opened = false;
  $("#openBtn").addEventListener("click", function () {
    if (opened) return; opened = true; startMusic(); confettiOn = true;
    const [x, y] = center(this);
    burst(x, y, 70, 240); warp = 0.9; conTarget = 0.8;
    flash();
    go("#intro", "#birthday", 1000);
    setTimeout(() => { burst(W / 2, H * 0.4, 110, 300); }, 1300);
    document.querySelectorAll("#bdayText p").forEach((p, i) =>
      setTimeout(() => { const c = center(p); burst(c[0], c[1], 26, 150); }, 1000 + [0.5, 2.0, 3.6, 5.0][i] * 1000 + 500));
    setTimeout(() => { conTarget = 0.25; }, 5000);
  });

  /* 2 → 3: Хүсэл */
  let wished = false;
  $("#wishBtn").addEventListener("click", function () {
    if (wished) return; wished = true; startMusic(); confettiOn = false; lanternOn = true;
    const [x, y] = center(this);
    burst(x, y, 80, 260);
    brightTarget = 1.7; conTarget = 0.4; warp = 0.5;
    flash();
    go("#birthday", "#wish", 1100);
    setTimeout(() => burst(W / 2, H / 2, 120, 340), 1800);
    setInterval(() => burst(rnd(W * 0.1, W * 0.9), rnd(H * 0.1, H * 0.55), 9, 80), 1500);
  });

  /* Хүсэл хийсний дараах алхам */
  let wishDone = false;
  $("#wishDone").addEventListener("click", function () {
    if (wishDone) return; wishDone = true;
    const btn = this, c = center(btn);
    burst(c[0], c[1], 60, 220); flash();
    $("#wish1").classList.add("fade"); btn.classList.add("fade");
    setTimeout(() => {
      $("#wish1").style.display = "none"; btn.style.display = "none";
      const e = $("#wishEnd"); e.classList.add("show"); void e.offsetWidth; e.classList.add("go");
      burst(W / 2, H / 2, 100, 320);
    }, 900);
  });
  $("#replayBtn").addEventListener("click", () => window.location.reload());

  /* ---------- Хүрэх, хөдөлгөх үед гялбаа + parallax ---------- */
  let lastTrail = 0;
  window.addEventListener("pointermove", (e) => {
    tox = (e.clientX / W - 0.5) * 2; toy = (e.clientY / H - 0.5) * 2;
    document.body.style.setProperty("--px", tox.toFixed(3)); document.body.style.setProperty("--py", toy.toFixed(3));
    const n = performance.now();
    if (!reduce && n - lastTrail > 60) { lastTrail = n; burst(e.clientX, e.clientY, 2, 45); }
  }, { passive: true });
  window.addEventListener("pointerdown", (e) => {
    if (e.target.closest && e.target.closest("button")) return;
    burst(e.clientX, e.clientY, 14, 130);
    if (!reduce) addHearts(e.clientX, e.clientY, 3);
  }, { passive: true });
  setInterval(() => {
    if (started || reduce) return;
    const c = center($("#heartBtn")), a = rnd(0, 6.283), r = rnd(60, 110);
    burst(c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, 4, 35);
  }, 900);

  /* ---------- Хөгжим: эхний товшилтоор автоматаар эхэлнэ ---------- */
  let audio = null, musicOk = false;
  function startMusic() {
    if (musicOk) return;
    try {
      if (!audio) { audio = new Audio(CONFIG.musicFile); audio.loop = true; audio.volume = 0; audio.preload = "auto"; }
      const ok = () => {
        musicOk = true; let v = 0;
        const f = setInterval(() => { v = Math.min(0.6, v + 0.03); audio.volume = v; if (v >= 0.6) clearInterval(f); }, 150);
      };
      const pr = audio.play();
      if (pr && pr.then) pr.then(ok).catch(() => {}); else ok();
    } catch (e) { /* хөгжимгүйгээр үргэлжилнэ */ }
  }
})();
