/* ============================================================
   Football Live — app logic (pure vanilla JS)
   ============================================================ */

/* ---- 1. Demo data (replace with a real API later) ---- */
const TEAM = (code) => `https://placehold.co/64x64/1a2230/12c46a?text=${code}`;

const MATCHES = [
  {
    id: "m1", league: "Premier League", status: "LIVE",
    home: { name: "Arsenal", code: "ARS", score: 2 },
    away: { name: "Chelsea", code: "CHE", score: 1 },
    time: "65'", date: "Today", kickoff: "20:00",
    venue: "Emirates Stadium", live: true
  },
  {
    id: "m2", league: "La Liga", status: "UPCOMING",
    home: { name: "Barcelona", code: "BAR", score: null },
    away: { name: "Sevilla", code: "SEV", score: null },
    time: "21:00", date: "Today", kickoff: "21:00",
    venue: "Camp Nou", live: false
  },
  {
    id: "m3", league: "Serie A", status: "UPCOMING",
    home: { name: "Juventus", code: "JUV", score: null },
    away: { name: "Inter", code: "INT", score: null },
    time: "22:45", date: "Today", kickoff: "22:45",
    venue: "Allianz Stadium", live: false
  },
  {
    id: "m4", league: "Bundesliga", status: "FT",
    home: { name: "Bayern", code: "BAY", score: 3 },
    away: { name: "Dortmund", code: "BVB", score: 2 },
    time: "FT", date: "Today", kickoff: "18:30",
    venue: "Allianz Arena", live: false
  }
];

/* ---- 2. State ---- */
let favorites = JSON.parse(localStorage.getItem("fl_favs") || "[]");

/* ---- 3. Helpers ---- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function matchCard(m) {
  const fav = favorites.includes(m.id) ? "on" : "";
  const mid = m.live
    ? `<span class="match-card__score">${m.home.score} - ${m.away.score}</span>
       <span class="live-tag">● ${m.time}</span>`
    : m.status === "FT"
      ? `<span class="match-card__score">${m.home.score} - ${m.away.score}</span>
         <span class="match-card__league">FT</span>`
      : `<span class="match-card__time">${m.time}</span>
         <span class="match-card__league">${m.league}</span>`;

  return `
  <div class="match-card" data-id="${m.id}">
    <button class="fav-star ${fav}" data-fav="${m.id}" aria-label="Favorite">★</button>
    <div class="match-card__side">
      <img src="${TEAM(m.home.code)}" alt="${m.home.name}">
      <span>${m.home.name}</span>
    </div>
    <div class="match-card__mid">${mid}</div>
    <div class="match-card__side">
      <img src="${TEAM(m.away.code)}" alt="${m.away.name}">
      <span>${m.away.name}</span>
    </div>
  </div>`;
}

/* ---- 4. Render lists ---- */
function renderMatches() {
  $("#matchList").innerHTML = MATCHES.map(matchCard).join("");
  $("#liveList").innerHTML  =
    MATCHES.filter(m => m.live).map(matchCard).join("") ||
    `<p class="muted" style="padding:24px 4px;">No live matches right now.</p>`;
  renderFavs();
  bindCards();
}

function renderFavs() {
  const favMatches = MATCHES.filter(m => favorites.includes(m.id));
  $("#favList").innerHTML = favMatches.map(matchCard).join("");
}

/* ---- 5. Card interactions ---- */
function bindCards() {
  $$(".match-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("[data-fav]")) return;       // ignore star clicks
      openMatch(card.dataset.id);
    });
  });
  $$("[data-fav]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFav(btn.dataset.fav);
    });
  });
}

function toggleFav(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(f => f !== id)
    : [...favorites, id];
  localStorage.setItem("fl_favs", JSON.stringify(favorites));
  renderMatches();
}

/* ---- 6. Match details ---- */
function openMatch(id) {
  const m = MATCHES.find(x => x.id === id);
  if (!m) return;

  $("#md-league").textContent     = m.league;
  $("#md-home-name").textContent  = m.home.name;
  $("#md-away-name").textContent  = m.away.name;
  $("#md-home-logo").src          = TEAM(m.home.code);
  $("#md-away-logo").src          = TEAM(m.away.code);
  $("#md-home-score").textContent = m.home.score ?? 0;
  $("#md-away-score").textContent = m.away.score ?? 0;
  $("#md-time").textContent       = m.live ? m.time : m.kickoff;
  $("#md-venue").textContent      = m.venue;
  $("#md-date").textContent       = m.date;
  $("#md-kickoff").textContent    = m.kickoff;
  $("#md-comp").textContent       = m.league;

  const status = $("#md-status");
  status.textContent = m.status;
  status.style.display = m.status === "UPCOMING" ? "none" : "inline-block";

  $("#md-live").style.display = m.live ? "flex" : "none";

  switchView("match");
}

/* ---- 7. View / Navigation ---- */
function switchView(name) {
  $$(".view").forEach(v => v.classList.remove("view--active"));
  const target = $("#view-" + name);
  if (target) target.classList.add("view--active");

  $$(".nav-item").forEach(n =>
    n.classList.toggle("nav-item--active", n.dataset.view === name));

  window.scrollTo({ top: 0 });
}

$$(".nav-item").forEach(btn =>
  btn.addEventListener("click", () => switchView(btn.dataset.view)));
$("#backBtn").addEventListener("click", () => switchView("home"));

/* ---- 8. Tabs ---- */
$$(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.remove("tab--active"));
    tab.classList.add("tab--active");
    $$(".tab-panel").forEach(p => p.hidden = true);
    $("#tab-" + tab.dataset.tab).hidden = false;
  });
});

/* ---- 9. Countdown timer ---- */
function nextKickoff() {
  // Demo: set featured kickoff to today 21:00, or +1 day if already passed.
  const d = new Date();
  d.setHours(21, 0, 0, 0);
  if (d < new Date()) d.setDate(d.getDate() + 1);
  return d;
}
const kickoff = nextKickoff();

function tickCountdown() {
  const diff = kickoff - new Date();
  if (diff <= 0) {
    $("#countdown").innerHTML = '<span class="hero__score-live" style="grid-column:1/-1;text-align:center;color:var(--danger)">● KICK OFF</span>';
    return;
  }
  const s = Math.floor(diff / 1000);
  const pad = n => String(n).padStart(2, "0");
  $("#cd-d").textContent = pad(Math.floor(s / 86400));
  $("#cd-h").textContent = pad(Math.floor((s % 86400) / 3600));
  $("#cd-m").textContent = pad(Math.floor((s % 3600) / 60));
  $("#cd-s").textContent = pad(s % 60);
}

/* ---- 10. Live score simulation (placeholder) ---- */
function simulateLive() {
  const live = MATCHES.filter(m => m.live);
  if (!live.length) return;
  // randomly bump a score occasionally — replace with real API polling
  if (Math.random() < 0.15) {
    const m = live[Math.floor(Math.random() * live.length)];
    Math.random() < 0.5 ? m.home.score++ : m.away.score++;
    renderMatches();
  }
}

/* ---- 11. Theme toggle ---- */
const savedTheme = localStorage.getItem("fl_theme");
if (savedTheme === "light") document.body.classList.add("light");
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("fl_theme",
    document.body.classList.contains("light") ? "light" : "dark");
});

/* ---- 12. Date label ---- */
$("#todayDate").textContent = new Date().toLocaleDateString(undefined,
  { weekday: "short", day: "numeric", month: "short" });

/* ---- 13. Init ---- */
renderMatches();
tickCountdown();
setInterval(tickCountdown, 1000);
setInterval(simulateLive, 5000);

/* ---- 14. PWA service worker (inline, no extra file needed) ---- */
if ("serviceWorker" in navigator) {
  const swCode = `
    const C="fl-v1";
    const A=["./","./index.html","./style.css","./script.js","./manifest.json"];
    self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
    self.addEventListener("activate",e=>e.waitUntil(
      caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
    self.addEventListener("fetch",e=>e.respondWith(
      caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("./index.html")))));
  `;
  const blob = URL.createObjectURL(new Blob([swCode], { type: "text/javascript" }));
  navigator.serviceWorker.register(blob).catch(() => {});
}
const searchInput = document.getElementById("searchInput");

if(searchInput){
  searchInput.addEventListener("input", e => {

    const q = e.target.value.toLowerCase();

    const filtered = MATCHES.filter(m =>
      m.home.name.toLowerCase().includes(q) ||
      m.away.name.toLowerCase().includes(q)
    );

    document.getElementById("matchList").innerHTML =
      filtered.map(matchCard).join("");

    bindCards();
  });
}
